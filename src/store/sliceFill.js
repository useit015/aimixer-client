
import { createSlice } from '@reduxjs/toolkit';

const outputs = [
    {id: 'newsArticle', name: 'News Article'},
    {id: 'blogPost', name: 'Blog Post'},
    {id: 'interactiveOutline', name: 'Interactive Outline'},
    {id: 'custom', name: 'Custom'},
]

const lengths = [
    {id: 'concise', name: "Concise"},
    {id: 'shortForm', name: "Short Form"},
    {id: 'longForm', name: 'Long Form'},
    {id: 'exhaustive', name: 'Exhaustive'}
]

const sources = [
    {id: 'googleSearch', name: "Google Search"},
    {id: 'link', name: 'Link'},
    {id: 'file', name: 'File'},
    {id: 'text', name: 'Text'},
    // {id: 'seed', name: 'Seed'},
    // {id: 'asset', name: 'AI Mixer Asset'},
    
]

const fillSlice = createSlice({
    name: 'fill',
    initialState: {currentBowl: '', outputs, lengths, sources},
    reducers: {
        fillSetCurrentBowl: (state, action) => {
            const id = action.payload;
            state.currentBowl = id;
            return state;
        },
        fillChangeCurLength: (state, action) => {
            state.curLength = action.payload;
            return state;
        },
        fillChangeCurSource: (state, action) => {
            state.curSource = action.payload;
            return state;
        }
       
    }
});

export const { fillSetCurrentBowl, fillChangeCurOutput, fillChangeCurLength, fillChangeCurSource  } = fillSlice.actions;

export default fillSlice.reducer;