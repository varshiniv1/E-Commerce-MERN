import {
  AUTH_USER,
  SIGN_OUT,
  UPDATE_USER_PROFILE,
  USER_CHANGE_EMAIL,
  USER_ADD_TO_CART,
  PURCHASE_SUCCESS,
} from "../types";

// Define the default state for the user
let DEFAULT_USER_STATE = {
  data: {
    _id: null,
    email: null,
    firstname: null,
    lastname: null,
    history: [],
    verified: null,
  },
  auth: null, // Start with auth as false (not authenticated)
  cart: [],
};

// User reducer function
export default function usersReducer(state = DEFAULT_USER_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      // Handle user authentication
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload.data, // Merge user data from action
        },
        auth: action.payload.auth, // Update auth status
      };

    case SIGN_OUT:
      // Handle user sign out
      return {
        ...state,
        data: { ...DEFAULT_USER_STATE.data }, // Reset user data
        auth: false, // Set auth to false
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        data: { ...state.data, ...action.payload }, // Ensure previous data isn't overwritten
      };
    case USER_CHANGE_EMAIL:
      return {
        ...state,
        data: { ...state.data, email: action.payload },
      };
    case USER_ADD_TO_CART:
      return { ...state, cart: action.payload };
    case PURCHASE_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          history: action.payload.history,
        },
        cart: [],
      };
    default:
      return state; // Return the current state for unrecognized actions
  }
}
