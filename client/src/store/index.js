import { configureStore } from '@reduxjs/toolkit';
import appReducers from './reducers'; // Your combined reducers

const ReduxStore = () => {
    // configureStore automatically applies thunk and integrates with Redux DevTools
    const store = configureStore({
        reducer: appReducers,
        // You can also pass other options like middleware if needed
    });
    
    return store;
}

export default ReduxStore;
