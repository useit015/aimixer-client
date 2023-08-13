import { createSlice } from '@reduxjs/toolkit';

const sliceBasicEditor = createSlice({
    name: 'basicEditor',
    initialState: {bowlId: '', contentId: '', contentLink: '', content: '', searchTerm: '', replaceTerm: '', status: false},
    reducers: {
        basicEditorSet: (state, action) => {
            const { bowlId, contentId, contentLink } = action.payload;
            state.bowlId = bowlId;
            state.contentId = contentId;
            state.contentLink = contentLink;
            state.status = true;
            return state;
        },
        basicEditorSetContent: (state, action) => {
            state.content = action.payload;
            state.status = false;
            return state;
        },
        basicEditorSetSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
            return state;
        },
        basicEditorSetReplaceTerm: (state, action) => {
            state.replaceTerm = action.payload;
            return state;
        },
    }
});

export const { basicEditorSet, basicEditorSetContent, basicEditorSetSearchTerm, basicEditorSetReplaceTerm } = sliceBasicEditor.actions;

export default sliceBasicEditor.reducer;