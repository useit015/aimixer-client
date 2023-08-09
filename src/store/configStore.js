import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './sliceLogin';
import toastReducer from './sliceToast';
import bowlsReducer from './sliceBowls';
import fillReducer from './sliceFill'

export const store = configureStore({ 
    reducer: {
       login: loginReducer,
       toast: toastReducer,
       bowls: bowlsReducer,
       fill: fillReducer
    }
});

export default store