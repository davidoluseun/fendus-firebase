import { SELECT_STATE } from "./deliveryStateTypes";

const initialDeliveryState = {
  deliveryState: "",
};

const deliveryStateReducer = (
  state = initialDeliveryState,
  action: APP.DeliveryStateActionTypes
) => {
  switch (action.type) {
    case SELECT_STATE:
      return { ...state, deliveryState: action.payload };
    default:
      return state;
  }
};

export default deliveryStateReducer;
