import { SET_RENDER_ORDERS } from "./renderOrdersTypes";

const initialOrdersState = {
  renderOrders: [],
};

const renderOrdersReducer = (
  state = initialOrdersState,
  action: APP.RenderOrdersActionTypes
) => {
  switch (action.type) {
    case SET_RENDER_ORDERS:
      return { ...state, renderOrders: action.payload };

    default:
      return state;
  }
};

export default renderOrdersReducer;
