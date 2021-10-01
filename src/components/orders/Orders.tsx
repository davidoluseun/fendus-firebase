import * as React from "react";
import { Grid, Box, Flex, Heading, Icon } from "@chakra-ui/react";
import { BsBagFill } from "react-icons/bs";
import { connect } from "react-redux";
import OrdersTable from "./OrdersTable";
import Pagination from "../common/Pagination";
import AccountNav from "../common/AccountNav";
import OrdersContentLoader from "./OrdersContentLoader";
import EmptyCategory from "../common/EmptyCategory";
import Error from "../common/Error";
import { paginate } from "../../utils/paginate";
import { auth, db } from "../../firebase";
import { setRenderOrders } from "../../redux";

type OrderTypes = {
  renderOrders: APP.RenderOrdersTypes;
  setRenderOrders: (
    payload: APP.RenderOrdersTypes
  ) => APP.RenderOrdersActionTypes;
};

const Orders = ({ renderOrders, setRenderOrders }: OrderTypes) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubscribed, setIsSubscribed] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const getOrders = async () => {
      const userDocRef = db.collection("users").doc(auth.currentUser?.uid);
      const querySnapshot = await userDocRef
        .collection("orders")
        .orderBy("orderId", "desc")
        .get();

      if (querySnapshot.empty && querySnapshot.metadata.fromCache) {
        setHasError(true);
      } else {
        const allOrders = querySnapshot.docs.map((doc) => doc.data());
        setRenderOrders(allOrders.slice(0, 20));
      }

      setIsLoading(false);
      setIsSubscribed(false);
    };

    if (isSubscribed) getOrders();

    return () => {
      setIsSubscribed(false);
    };
  }, [isSubscribed, setRenderOrders]);

  const pageSize = 4;
  const itemsCount = renderOrders.length;
  const orders = paginate(renderOrders, currentPage, pageSize);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleTryAgain = () => {
    setIsLoading(true);
    setIsSubscribed(true);
    setHasError(false);
  };

  return (
    <Box as="section" px={{ base: "4", md: "6" }} marginX="auto" maxW="1200px">
      <Grid templateColumns={{ lg: "230px 1fr" }} gridColumnGap="6">
        <AccountNav />

        {isLoading ? (
          <OrdersContentLoader />
        ) : (
          <>
            {hasError ? (
              <Error text="orders" onTryAgain={handleTryAgain} />
            ) : (
              <Box overflow="auto">
                <Flex align="center" fontSize={{ base: "18px", sm: "24px" }}>
                  <Icon as={BsBagFill} color="primary" />
                  <Heading
                    as="h1"
                    ml={{ base: "1", sm: "2" }}
                    fontSize="inherit"
                  >
                    Orders
                  </Heading>
                </Flex>

                {orders.length === 0 ? (
                  <Box mt="6">
                    <EmptyCategory category="orders" />
                  </Box>
                ) : (
                  <Box overflow="auto">
                    <Box overflow="auto">
                      <OrdersTable orders={orders} />
                    </Box>
                    <Pagination
                      itemsCount={itemsCount}
                      pageSize={pageSize}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </Box>
                )}
              </Box>
            )}
          </>
        )}
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state: APP.StateTypes) => ({
  renderOrders: state.renderOrders.renderOrders,
});

const mapDispatchToProps = (dispatch: APP.RenderOrdersDispatchTypes) => ({
  setRenderOrders: (payload: APP.RenderOrdersTypes) =>
    dispatch(setRenderOrders(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
