import { createSlice } from '@reduxjs/toolkit';

const sliceSpinner = createSlice({
    name: 'spinner',
    initialState: {status: false, type: 'ScaleLoader'},
    reducers: {
        spinnerSetStatus: (state, action) => {
            state.status = action.payload;
            return state;
        },
        spinnerSetType: (state, action) => {
            state.type = action.payload;
            return state;
        }

    }
});

export const { spinnerSetStatus, spinnerSetType } = sliceSpinner.actions;

export default sliceSpinner.reducer;