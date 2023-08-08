import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
    name: 'toast',
    initialState: {isOpen: false, message:'hello', color: 'primary', duration: 3500, position: 'middle'},
    reducers: {
        toastSetIsOpen: (state, action) => {
            state.isOpen = action.payload;
            return state;
        },
        toastSetMessage:(state, action) => {
            state.message = action.payload;
            state.isOpen = true;
            return state;
        },
        toastSet: (state, action) => {
            const currentState = { ...state }
            state = { ...currentState, ...action.payload}
            state.isOpen = true;
            return state;
        }

    }
});

export const { toastSetIsOpen, toastSetMessage, toastSet  } = toastSlice.actions;

export default toastSlice.reducer;