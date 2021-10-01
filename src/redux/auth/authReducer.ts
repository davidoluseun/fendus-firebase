import { SET_CURRENT_USER, SET_DISPLAY_NAME, SET_PHOTO_URL } from "./authTypes";

const initialAuthState = {
  currentUser: null,
};

const authReducer = (state = initialAuthState, action: APP.AuthActionTypes) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };

    case SET_DISPLAY_NAME:
      return {
        ...state,
        currentUser: {
          ...action.payload,
          displayName: action.payload?.displayName,
        },
      };

    case SET_PHOTO_URL:
      return {
        ...state,
        currentUser: {
          ...action.payload,
          photoURL: action.payload?.photoURL,
        },
      };

    default:
      return state;
  }
};

export default authReducer;
