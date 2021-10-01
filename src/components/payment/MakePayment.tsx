import { Box, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";
import { connect } from "react-redux";
import Subtotal from "../common/Subtotal";
import { getCartSubtotal } from "../../utils/getCartSubtotal";
import { getDeliveryFee } from "../../utils/getDeliveryFee";
import { emptyCart } from "../../redux";
import { db } from "../../firebase";
import http from "../../services/httpService";

type MakePaymentProps = {
  isSubmitted: boolean;
  storeItems: APP.StoreItemTypes[];
  deliveryState: string;
  userInfo: APP.UserInfoTypes;
  currentUser: APP.CurrentUserTypes;
  emptyCart: () => APP.StoreActionTypes;
};

const MakePayment = (props: MakePaymentProps) => {
  const { storeItems, deliveryState, userInfo, emptyCart } = props;
  const { currentUser, isSubmitted } = props;
  const history = useHistory();

  const cartItems = storeItems.filter(
    (storeItem: APP.StoreItemTypes) => storeItem.numInCart > 0
  );

  const subTotal = getCartSubtotal(cartItems);
  const deliveryFee = getDeliveryFee(deliveryState);
  const total = subTotal + deliveryFee;

  const deliveryAddress = `${userInfo?.address}, ${userInfo?.city}, ${userInfo?.state}.`;

  const order = cartItems.map((cartItem) => ({
    productTitle: cartItem.title,
    numOrdered: cartItem.numInCart,
  }));

  const config = {
    publicKey: `${process.env.REACT_APP_PAYSTACK_PUBLIC_KEY}`,
    reference: new Date().getTime().toString(),
    email: userInfo?.email,
    amount: total * 100,
  };

  const initPayment = usePaystackPayment(config);

  const onSuccess = async (reference: any) => {
    const { reference: orderId } = reference;
    const orderInfo = { userInfo, order, orderId, subTotal, deliveryFee };

    db.collection("users")
      .doc(currentUser?.uid)
      .collection("orders")
      .doc(orderId)
      .set({
        cartItems,
        total,
        deliveryFee,
        deliveryAddress,
        orderId,
        transId: reference.trans,
        deliveryStatus: "Processing",
      });

    http.post("/orders", orderInfo);

    emptyCart();
    history.replace("/orders");
  };

  return (
    <Box minW={{ lg: "300px" }}>
      <Box
        p="4"
        bg="#fff"
        borderRadius="md"
        alignSelf="start"
        boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
      >
        <Subtotal />

        <Button
          w="100%"
          mt="4"
          bg="primary"
          color="#fff"
          _hover={{ bg: "primary" }}
          _active={{ bg: "primary" }}
          disabled={
            currentUser?.emailVerified && isSubmitted && deliveryState !== ""
              ? false
              : true
          }
          onClick={() => initPayment(onSuccess)}
        >
          Make Payment
        </Button>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: APP.StateTypes) => ({
  storeItems: state.store.storeItems,
  deliveryState: state.deliveryState.deliveryState,
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = (dispatch: APP.StoreDispatchTypes) => ({
  emptyCart: () => dispatch(emptyCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MakePayment);
