/*import {
    GET_ALL_BRANDS
} from '../types';


export default function brandsReducer(state={},action){
    switch(action.type){
        case GET_ALL_BRANDS:
            console.log("Brands data in reducer:", action.payload);  // Log the data received
            return {...state, all: action.payload}
        default:
            return state
    }
}
    */
import { GET_ALL_BRANDS } from "../types";
export default function brandsReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_BRANDS:
      console.log("Brands data in reducer:", action.payload); // Log the data received
      return {
        ...state, // Retain other state properties
        all: action.payload, // Update `all` with the fetched brands data
      };
    default:
      return state; // Default return when no action matches
  }
}
