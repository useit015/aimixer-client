import { createSlice } from '@reduxjs/toolkit';

const sliceServers = createSlice({
    name: 'servers',
    initialState: {mode: 'prod', api: {dev: 'https://api.aimixer.io:5300', prod: 'https://api.aimixer.io:5000'}},
    reducers: {
        spinnerSetStatus: (state, action) => {
            state.status = action.payload;
            return state;
        },

    }
});

export const { } = sliceServers.actions;

export default sliceServers.reducer;