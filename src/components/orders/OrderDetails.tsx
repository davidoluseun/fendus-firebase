import { Box, Grid, Heading, Text, Flex, Image, Icon } from "@chakra-ui/react";
import CurrencyFormat from "react-currency-format";
import AccountNav from "../common/AccountNav";
import { BsBagFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import OrderSummary from "./OrderSummary";

type ParamTypes = {
  id: string;
};

type OrderDetailsTypes = {
  renderOrders: APP.RenderOrdersTypes;
};

const OrderDetails = ({ renderOrders }: OrderDetailsTypes) => {
  const { id } = useParams<ParamTypes>();
  const order = renderOrders.find((renderOrder) => renderOrder.orderId === id);

  return (
    <Box as="section" px={{ base: "4", md: "6" }} marginX="auto" maxW="1200px">
      <Grid templateColumns={{ lg: "230px 1fr" }} gridColumnGap="6">
        <AccountNav />

        <Box>
          <Flex align="center" fontSize={{ base: "16px", sm: "24px" }}>
            <Icon as={BsBagFill} color="primary" />
            <Heading as="h1" ml={{ base: "1", sm: "3" }} fontSize="inherit">
              Order Details
            </Heading>
          </Flex>

          <Box
            my="6"
            borderRadius="md"
            boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
          >
            <Flex
              p="4"
              fontSize="16px"
              bg="secondary"
              color="#fff"
              justify="space-between"
              borderTopRadius="md"
              direction={{ base: "column", sm: "row" }}
            >
              <Box>
                <Box as="span" mr="2" fontWeight="semibold">
                  Order ID:
                </Box>
                <Box as="span">{order?.orderId}</Box>
              </Box>
              <Box>
                <Box as="span" mr="2" fontWeight="semibold">
                  Placed on:
                </Box>
                <Box as="span">
                  {moment(Number(order?.orderId)).format("DD/MM/YYYY")}
                </Box>
              </Box>
            </Flex>

            <Grid
              p="4"
              bg="#fff"
              gridGap="3"
              borderBottomRadius="md"
              templateColumns={{ sm: "repeat(2, 1fr)" }}
            >
              {order?.cartItems.map((cartItem: APP.StoreItemTypes) => (
                <Flex align="center" key={cartItem._id + cartItem.title}>
                  <Image
                    w="125px"
                    borderRadius="md"
                    src={cartItem.image}
                    alt=""
                  />
                  <Box ml="4" alignSelf="flex-end">
                    <Heading as="h3" mb="1" fontSize="14px">
                      {cartItem.title}
                    </Heading>

                    <CurrencyFormat
                      renderText={(value: number) => (
                        <Flex fontSize="14px">
                          <Box mr="1">{value}</Box>
                          <Box>x {cartItem.numInCart}</Box>
                        </Flex>
                      )}
                      decimalScale={2}
                      value={cartItem.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix="&#8358;"
                    />
                  </Box>
                </Flex>
              ))}
            </Grid>
          </Box>

          <Grid
            templateColumns={{ md: "1fr .8fr" }}
            gridGap="6"
            alignItems="start"
          >
            <Box
              bg="#fff"
              p="4"
              as="section"
              borderRadius="md"
              boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
            >
              <Heading as="h2" fontSize="18px" fontWeight="semibold" mb="3">
                Delivery Address
              </Heading>
              <Text>{order?.deliveryAddress}</Text>
            </Box>

            <OrderSummary
              total={order?.total}
              deliveryFee={order?.deliveryFee}
            />
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state: APP.StateTypes) => ({
  renderOrders: state.renderOrders.renderOrders,
});

export default connect(mapStateToProps)(OrderDetails);
