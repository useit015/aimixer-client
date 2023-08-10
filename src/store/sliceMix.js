import { createSlice } from '@reduxjs/toolkit';

const sliceMix = createSlice({
    name: 'mix',
    initialState: {topics: ''},
    reducers: {
        mixSetTopics: (state, action) => {
            state.topics = action.payload;
            return state;
        },
        

    }
});

export const { mixSetTopics } = sliceMix.actions;

export default sliceMix.reducer;