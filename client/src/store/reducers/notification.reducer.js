import {
  ERROR_GLOBAL,
  SUCCESS_GLOBAL,
  CLEAR_NOTIFICATION,
  REMOVE_PRODUCT,
} from "../types.js";

const initialState = {
  error: false,
  success: false,
  msg: "",
};

export default function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case ERROR_GLOBAL:
      return {
        ...state,
        error: true,
        success: false, // Reset success on error
        msg: action.payload,
      };
    case SUCCESS_GLOBAL:
      return {
        ...state,
        success: true,
        error: false, // Reset error on success
        msg: action.payload,
      };
    case CLEAR_NOTIFICATION:
      return initialState; // Reset to initial state
    case REMOVE_PRODUCT:
      return { ...state, removeArticle: true };
    default:
      return state;
  }
}
