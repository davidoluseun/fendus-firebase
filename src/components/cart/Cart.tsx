import { Box, Grid, Button, Flex } from "@chakra-ui/react";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import SubHelperLinks from "../common/SubHelperLinks";
import CartTotal from "./CartTotal";
import EmptyCategory from "../common/EmptyCategory";
import { incrementItem, decrementItem, emptyCart } from "../../redux";
import { removeItemFromCart } from "../../redux";

type CartProps = {
  storeItems: APP.StoreItemTypes[];
  incrementItem: (item: APP.StoreItemTypes) => APP.StoreActionTypes;
  decrementItem: (item: APP.StoreItemTypes) => APP.StoreActionTypes;
  removeItemFromCart: (item: APP.StoreItemTypes) => APP.StoreActionTypes;
  emptyCart: () => APP.StoreActionTypes;
};

const Cart = (props: CartProps) => {
  const { storeItems, incrementItem, decrementItem } = props;
  const { removeItemFromCart, emptyCart } = props;

  const cartItems = storeItems.filter(
    (storeItem: APP.StoreItemTypes) => storeItem.numInCart > 0
  );

  return (
    <Box px={{ base: "4", md: "6" }} marginX="auto" maxW="1200px">
      <Grid templateColumns={{ lg: "1fr .5fr" }} gridGap="6" alignItems="start">
        <Box>
          <Flex align="center" justify="space-between" mb={{ lg: "5" }}>
            <SubHelperLinks isCart={true} />

            {cartItems.length !== 0 ? (
              <Button
                bg="primary"
                color="#fff"
                _hover={{ bg: "primary", color: "#fff" }}
                _active={{ bg: "primary", color: "#fff" }}
                display={{ base: "none", lg: "flex" }}
                onClick={emptyCart}
              >
                Empty Cart
              </Button>
            ) : null}
          </Flex>

          {cartItems.length === 0 ? (
            <EmptyCategory category="cart" />
          ) : (
            <CartItem
              cartItems={cartItems}
              incrementItem={incrementItem}
              decrementItem={decrementItem}
              removeItemFromCart={removeItemFromCart}
            />
          )}
        </Box>
        <Box mt={{ lg: "60px" }}>
          <CartTotal cartItems={cartItems} />
        </Box>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state: APP.StateTypes) => ({
  storeItems: state.store.storeItems,
});

const mapDispatchToProps = (dispatch: APP.StoreDispatchTypes) => ({
  incrementItem: (payload: APP.StoreItemTypes) =>
    dispatch(incrementItem(payload)),

  decrementItem: (payload: APP.StoreItemTypes) =>
    dispatch(decrementItem(payload)),

  removeItemFromCart: (payload: APP.StoreItemTypes) =>
    dispatch(removeItemFromCart(payload)),

  emptyCart: () => dispatch(emptyCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
