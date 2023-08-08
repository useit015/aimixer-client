import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './sliceLogin';
import toastReducer from './sliceToast';
import bowlsReducer from './sliceBowls';

export const store = configureStore({ 
    reducer: {
       login: loginReducer,
       toast: toastReducer,
       bowls: bowlsReducer
    }
});

export default store