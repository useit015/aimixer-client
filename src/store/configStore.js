import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './sliceLogin'

const store = configureStore({ 
    reducer: {
       login: loginReducer
    }
});

export default store;