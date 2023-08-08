import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './sliceLogin';
import toastReducer from './sliceToast';

export const store = configureStore({ 
    reducer: {
       login: loginReducer,
       toast: toastReducer
    }
});

export default store