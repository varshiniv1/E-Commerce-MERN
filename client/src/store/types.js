// Action types for product retrieval
export const GET_PROD_BY_SOLD = 'GET_PROD_BY_SOLD'; // Retrieves products sorted by the number sold
export const GET_PROD_BY_DATE = 'GET_PROD_BY_DATE'; // Retrieves products sorted by date
export const GET_PROD_PAGINATE = 'get_prod_paginate';
export const REMOVE_PRODUCT = 'remove_product';
export const PRODUCT_ADD = 'product_add';
export const CLEAR_PRODUCT_ADD = 'clear_product_add'
// notifications
export const ERROR_GLOBAL = 'error_global';
export const SUCCESS_GLOBAL = 'success_global';
export const CLEAR_NOTIFICATION = 'clear_notification';

// user
export const AUTH_USER = 'auth_user';
export const SIGN_OUT = 'sign_out';
export const UPDATE_USER_PROFILE = 'update_user_profile'
export const USER_CHANGE_EMAIL = 'user_change_email';
export const USER_ADD_TO_CART = 'user_add_to_cart'
export const PURCHASE_SUCCESS = 'purchase_success';
//brands
export const GET_ALL_BRANDS = 'get_all_brands'