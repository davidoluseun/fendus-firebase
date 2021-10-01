import { SET_CURRENT_USER, SET_DISPLAY_NAME, SET_PHOTO_URL } from "./authTypes";

export const setCurrentUser = (payload: APP.CurrentUserTypes) => ({
  type: SET_CURRENT_USER,
  payload,
});

export const setDisplayName = (payload: APP.CurrentUserTypes) => ({
  type: SET_DISPLAY_NAME,
  payload,
});

export const setPhotoURL = (payload: APP.CurrentUserTypes) => ({
  type: SET_PHOTO_URL,
  payload,
});
