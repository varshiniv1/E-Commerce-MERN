import * as actions from "./index.js";
import axios from "axios";

import {
  getAuthHeader,
  removeTokenCookie,
  getTokenCookie,
} from "../../utils/tools";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const productsBySort = ({ limit, sortBy, order, where }) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/all`, {
        params: {
          limit,
          sortBy,
          order,
        },
      });

      console.log("API Response:", data); // Log the response to check the data structure

      switch (where) {
        case "bySold":
          dispatch(actions.productsBySold(data));
          break;
        case "byDate":
          dispatch(actions.productsByDate(data));
          break;
        default:
          return false;
      }
    } catch (error) {
      console.error("API Error:", error); // Improved error logging
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while fetching products.";
      dispatch(actions.errorGlobal(errorMessage));
    }
  };
};

export const productsByPaginate = (args) => {
  return async (dispatch) => {
    try {
      const products = await axios.post(`/api/products/paginate/all`, args);
      dispatch(actions.productsByPaginate(products.data));
    } catch (error) {
      dispatch(
        actions.errorGlobal(
          error.response?.data?.message || "An error occurred"
        )
      );
    }
  };
};

export const productRemove = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/products/product/${id}`, getAuthHeader());
      dispatch(actions.productRemove());
      dispatch(actions.successGlobal());
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const productAdd = (data) => {
    return async(dispatch)=>{
        try{
            const product= await axios.post(`/api/products/`,data,getAuthHeader())

            dispatch(actions.productAdd(product.data))
            dispatch(actions.successGlobal());
        } catch(error){
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const productsById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch({
        type: 'PRODUCTS_BY_ID',
        payload: data,  // Make sure to adjust according to the API response structure
      });
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      dispatch(actions.errorGlobal(error.response?.data?.message || "Failed to fetch product"));
    }
  };
};

