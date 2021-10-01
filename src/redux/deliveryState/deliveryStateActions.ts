import { SELECT_STATE } from "./deliveryStateTypes";

export const selectState = (payload: string) => ({
  type: SELECT_STATE,
  payload,
});
