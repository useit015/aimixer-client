
import { createSlice } from '@reduxjs/toolkit';

const outputs = [
    {id: 'out00', name: 'News Article'},
    {id: 'out01', name: 'Blog Post'},
    {id: 'out02', name: 'Landing Page'},
    {id: 'out03', name: 'Sales Email'},
    {id: 'out04', name: 'Product Description'},
]

const lengths = [
    {id: 'len00', name: "Concise"},
    {id: 'len01', name: "Short Form"},
    {id: 'len02', name: 'Long Form'},
    {id: 'len03', name: 'Exhaustive'}
]

const fillSlice = createSlice({
    name: 'fill',
    initialState: {currentBowl: '', outputs, curOutput: 'out00', lengths, curLength: 'len02'},
    reducers: {
        fillSetCurrentBowl: (state, action) => {
            const id = action.payload;
            state.currentBowl = id;
            return state;
        },
        fillChangeCurOutput: (state, action) => {
            state.curOutput = action.payload;
            return state;
        },
        fillChangeCurLength: (state, action) => {
            state.curLength = action.payload;
            return state;
        }
       
    }
});

export const { fillSetCurrentBowl, fillChangeCurOutput  } = fillSlice.actions;

export default fillSlice.reducer;