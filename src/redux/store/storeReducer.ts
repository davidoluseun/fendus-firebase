import {
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  EMPTY_CART,
  ADD_ITEM_TO_WISHLIST,
  MOVE_ITEM_FROM_CART_TO_WISHLIST,
  MOVE_ITEM_FROM_WISHLIST_TO_CART,
  ADD_ALL_WISHLIST_ITEMS_TO_CART,
} from "./storeTypes";

import { getStoreItems } from "../../services/storeItems";

const initialStoreState = {
  storeItems: getStoreItems(),
};

const storeReducer = (
  state = initialStoreState,
  action: APP.StoreActionTypes
) => {
  let storeItems = [...state.storeItems];

  switch (action.type) {
    case INCREMENT_ITEM:
      if (action.payload) {
        let index = storeItems.indexOf(action.payload);
        storeItems[index] = { ...action.payload };
        storeItems[index].numInCart++;
      }

      return { ...state, storeItems };

    case DECREMENT_ITEM:
      if (action.payload) {
        let index = storeItems.indexOf(action.payload);
        index = storeItems.indexOf(action.payload);
        storeItems[index] = { ...action.payload };
        storeItems[index].numInCart--;
      }

      return { ...state, storeItems };

    case ADD_ITEM_TO_CART:
      if (action.payload) {
        let index = storeItems.indexOf(action.payload);
        storeItems[index] = { ...action.payload };
        storeItems[index].numInCart = 1;
      }
      return { ...state, storeItems };

    case REMOVE_ITEM_FROM_CART:
      if (action.payload) {
        let index = storeItems.indexOf(action.payload);
        index = storeItems.indexOf(action.payload);
        storeItems[index] = { ...action.payload };
        storeItems[index].numInCart = 0;
      }

      return { ...state, storeItems };

    case EMPTY_CART:
      storeItems.map((storeItem) => {
        storeItem.numInCart = 0;
        return storeItem;
      });

      return { ...state, storeItems };

    case ADD_ITEM_TO_WISHLIST:
      if (action.payload) {
        let index = storeItems.indexOf(action.payload);
        index = storeItems.indexOf(action.payload);
        storeItems[index] = { ...action.payload };
        storeItems[index].saved = true;
      }

      return { ...state, storeItems };

    case MOVE_ITEM_FROM_CART_TO_WISHLIST:
      if (action.payload) {
        let index = storeItems.indexOf(action.payload);
        index = storeItems.indexOf(action.payload);
        storeItems[index] = { ...action.payload };
        storeItems[index].numInCart = 0;
        storeItems[index].saved = true;
      }

      return { ...state, storeItems };

    case MOVE_ITEM_FROM_WISHLIST_TO_CART:
      if (action.payload) {
        let index = storeItems.indexOf(action.payload);
        index = storeItems.indexOf(action.payload);
        storeItems[index] = { ...action.payload };
        storeItems[index].saved = false;
        storeItems[index].numInCart = 1;
      }

      return { ...state, storeItems };

    case ADD_ALL_WISHLIST_ITEMS_TO_CART:
      storeItems.forEach((storeItem) => {
        if (storeItem.saved === true) {
          storeItem.numInCart = 1;
          storeItem.saved = false;
        }
        return storeItem;
      });

      return { ...state, storeItems };

    default:
      return state;
  }
};

export default storeReducer;
