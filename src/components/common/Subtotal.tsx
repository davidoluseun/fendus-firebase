import * as React from "react";
import { Flex, Box, Heading, Divider } from "@chakra-ui/react";
import { connect } from "react-redux";
import CurrencyFormat from "react-currency-format";
import { getCartSubtotal } from "../../utils/getCartSubtotal";
import { getDeliveryFee } from "../../utils/getDeliveryFee";
import { selectState } from "../../redux";

type SubtotalProps = {
  storeItems: APP.StoreItemTypes[];
  deliveryState: string;
  selectState: (payload: string) => APP.DeliveryStateActionTypes;
};

const Subtotal = (props: SubtotalProps) => {
  const { storeItems, deliveryState, selectState } = props;

  const cartItems = storeItems.filter(
    (storeItem: APP.StoreItemTypes) => storeItem.numInCart > 0
  );

  React.useEffect(() => {
    if (cartItems.length === 0) selectState("");
  }, [cartItems, selectState]);

  const subTotal = getCartSubtotal(cartItems);
  const deliveryFee = getDeliveryFee(deliveryState);

  return (
    <Box>
      <Heading as="h2" mb="3" fontSize="18px" fontWeight="semibold">
        Total Summary
      </Heading>

      <Flex mb="2" justify="space-between">
        <Box>Subtotal:</Box>
        <CurrencyFormat
          renderText={(value: number) => <Box>{value}</Box>}
          decimalScale={2}
          value={subTotal}
          displayType={"text"}
          thousandSeparator={true}
          prefix="&#8358;"
        />
      </Flex>

      <Flex mb="2" justify="space-between">
        <Box>Delivery:</Box>

        <CurrencyFormat
          renderText={(value: number) => (
            <Box>{deliveryState !== "" ? <>{value}</> : "--"}</Box>
          )}
          decimalScale={2}
          value={deliveryFee}
          displayType={"text"}
          thousandSeparator={true}
          prefix="&#8358;"
        />
      </Flex>

      <Divider mb="2" />

      <Flex mb="2" justify="space-between">
        <Box fontWeight="semibold">Total:</Box>

        <CurrencyFormat
          renderText={(value: number) => <Box>{value}</Box>}
          decimalScale={2}
          value={subTotal + deliveryFee}
          displayType={"text"}
          thousandSeparator={true}
          prefix="&#8358;"
        />
      </Flex>

      <Divider mb="2" />
    </Box>
  );
};

const mapStateToProps = (state: APP.StateTypes) => ({
  storeItems: state.store.storeItems,
  deliveryState: state.deliveryState.deliveryState,
});

const mapDispatchToProps = (dispatch: APP.DeliveryStateDispatchTypes) => ({
  selectState: (payload: string) => dispatch(selectState(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Subtotal);
