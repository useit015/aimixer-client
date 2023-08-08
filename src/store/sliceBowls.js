import { createSlice } from '@reduxjs/toolkit';

const bowlsSlice = createSlice({
    name: 'bowls',
    initialState: [],
    reducers: {
        bowlsAddBowl: (state, action) => {
            state.push(action.payload)
            return state;
        },
        bowlsSetBowls: (state, action) => {
            state = action.payload;
            return state;
        }
    }
});

export const { bowlsAddBowl, bowlsSetBowls  } = bowlsSlice.actions;

export default bowlsSlice.reducer;