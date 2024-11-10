import { combineReducers } from 'redux';
import usersReducer from './users.reducer';
import products from './products.reducer';
import notifications from './notification.reducer'
import brandsReducer from './brands.reducer'
// Combine the individual reducers into a root reducer
const appReducers = combineReducers({
    users: usersReducer,
    products,
    notifications,
    brands:brandsReducer
});

export default appReducers;
