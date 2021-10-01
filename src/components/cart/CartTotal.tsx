import { Box } from "@chakra-ui/react";
import Subtotal from "../common/Subtotal";
import DeliveryEstimate from "./DeliveryEstimate";

type CartTotalProps = {
  cartItems: APP.StoreItemTypes[];
};

const CartTotal = ({ cartItems }: CartTotalProps) => {
  return (
    <Box
      p="4"
      bg="#fff"
      borderRadius="md"
      alignSelf="start"
      boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
    >
      <Subtotal />
      {cartItems.length !== 0 && <DeliveryEstimate />}
    </Box>
  );
};

export default CartTotal;
