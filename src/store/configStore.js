import { configureStore } from '@reduxjs/toolkit';
import assistantReducer from './sliceAssistant';
import basicEditorReducer from './sliceBasicEditor';
import bowlsReducer from './sliceBowls';
import fillReducer from './sliceFill';
import loginReducer from './sliceLogin';
import mixReducer from './sliceMix';
import serversReducer from './sliceServers';
import spinnerReducer from './sliceSpinner';
import toastReducer from './sliceToast';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    toast: toastReducer,
    bowls: bowlsReducer,
    fill: fillReducer,
    spinner: spinnerReducer,
    assistant: assistantReducer,
    mix: mixReducer,
    basicEditor: basicEditorReducer,
    servers: serversReducer
  }
});

export default store;
