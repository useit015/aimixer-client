import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './sliceLogin';
import toastReducer from './sliceToast';
import bowlsReducer from './sliceBowls';
import fillReducer from './sliceFill';
import spinnerReducer from './sliceSpinner';
import mixReducer from './sliceMix';
import basicEditorReducer from './sliceBasicEditor';
import serversReducer from './sliceServers';

export const store = configureStore({ 
    reducer: {
       login: loginReducer,
       toast: toastReducer,
       bowls: bowlsReducer,
       fill: fillReducer,
       spinner: spinnerReducer,
       mix: mixReducer,
       basicEditor: basicEditorReducer,
       servers: serversReducer
       
    }
});

export default store