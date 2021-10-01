import { SET_RENDER_ORDERS } from "./renderOrdersTypes";

export const setRenderOrders = (payload: APP.RenderOrdersTypes) => ({
  type: SET_RENDER_ORDERS,
  payload,
});
