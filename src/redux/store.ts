import { createStore, combineReducers } from "redux";
import storeReducer from "./store/storeReducer";
import deliveryStateReducer from "./deliveryState/deliveryStateReducer";
import authReducer from "./auth/authReducer";
import renderOrdersReducer from "./renderOrders/renderOrdersReducer";

const rootReducer = combineReducers({
  store: storeReducer,
  deliveryState: deliveryStateReducer,
  auth: authReducer,
  renderOrders: renderOrdersReducer,
});

const store = createStore(rootReducer);

export default store;
