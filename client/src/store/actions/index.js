import {
    GET_PROD_BY_SOLD,
    GET_PROD_BY_DATE,
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATION,
    AUTH_USER,
    SIGN_OUT,
    UPDATE_USER_PROFILE,
    USER_CHANGE_EMAIL,
    GET_PROD_PAGINATE,
    REMOVE_PRODUCT,
    GET_ALL_BRANDS,
    PRODUCT_ADD,
    CLEAR_PRODUCT_ADD,
    USER_ADD_TO_CART,
    PURCHASE_SUCCESS,
    //GET_SITE_VARS
} from '../types';

// USER ACTIONS
export const userAuthenticate = (user) => ({
    type: AUTH_USER,
    payload: user
});

export const userSignOut = () => ({
    type: SIGN_OUT
});

export const userUpdateProfile = (userdata) => ({
    type:UPDATE_USER_PROFILE,
    payload:userdata
})

export const userChangeEmail = (data) => ({
    type:USER_CHANGE_EMAIL,
    payload:data
})

export const userAddToCart = (data) => ({
    type:USER_ADD_TO_CART,
    payload:data
})

export const usePurchaseSuccess = (data) => ({
    type:PURCHASE_SUCCESS,
    payload:data
})

// PRODUCT ACTIONS
export const productsBySold = (data) => ({
    type: GET_PROD_BY_SOLD,
    payload: data
});

export const productsByDate = (data) => ({
    type: GET_PROD_BY_DATE,
    payload: data
});

export const productsByPaginate = (products) => ({
    type:GET_PROD_PAGINATE,
    payload:products
})

export const productRemove = () => ({
    type:REMOVE_PRODUCT
})

export const productAdd = (product) => ({
    type: PRODUCT_ADD,
    payload:product
})

export const clearProductAdd = () => {
    return {
        type:CLEAR_PRODUCT_ADD
    }
}


//BRANDS

export const getAllBrands = (brands) => ({
    type:GET_ALL_BRANDS,
    payload:brands
})

// NOTIFICATION ACTIONS
export const errorGlobal = (message) => ({
    type: ERROR_GLOBAL,
    payload: message
});

export const successGlobal = (message) => ({
    type: SUCCESS_GLOBAL,
    payload: message
});

export const clearNotification = () => ({
    type: CLEAR_NOTIFICATION
});

//// SITE 

