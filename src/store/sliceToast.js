import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
    name: 'toast',
    initialState: {isOpen: false, message:''},
    reducers: {
        toastSetIsOpen: (state, action) => {
            state.isOpen = action.payload;
            return state;
        },
        toastSetMessage:(state, action) => {
            state.message = action.payload;
            return state;
        }

    }
});

export const { toastSetIsOpen, toastSetMessage  } = toastSlice.actions;

export default toastSlice.reducer;