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

export const incrementItem = (payload: APP.StoreItemTypes) => ({
  type: INCREMENT_ITEM,
  payload,
});

export const decrementItem = (payload: APP.StoreItemTypes) => ({
  type: DECREMENT_ITEM,
  payload,
});

export const addItemToCart = (payload: APP.StoreItemTypes) => ({
  type: ADD_ITEM_TO_CART,
  payload,
});

export const removeItemFromCart = (payload: APP.StoreItemTypes) => ({
  type: REMOVE_ITEM_FROM_CART,
  payload,
});

export const emptyCart = () => ({
  type: EMPTY_CART,
});

export const addItemToWishlist = (payload: APP.StoreItemTypes) => ({
  type: ADD_ITEM_TO_WISHLIST,
  payload,
});

export const removeItemFromCartToWishlist = (payload: APP.StoreItemTypes) => ({
  type: MOVE_ITEM_FROM_CART_TO_WISHLIST,
  payload,
});

export const removeItemFromWishlistToCart = (payload: APP.StoreItemTypes) => ({
  type: MOVE_ITEM_FROM_WISHLIST_TO_CART,
  payload,
});

export const addAllWishlistItemsToCart = () => ({
  type: ADD_ALL_WISHLIST_ITEMS_TO_CART,
});
