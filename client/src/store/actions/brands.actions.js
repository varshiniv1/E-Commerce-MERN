import axios from "axios";

export const getAllBrands = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/brands`);
      console.log("API Response:", response.data);  // Log the response here
      dispatch({
        type: "GET_ALL_BRANDS",
        payload: response.data
      });
    } catch (error) {
      console.error("Error fetching brands:", error);
      // Handle error appropriately
    }
  };
};
