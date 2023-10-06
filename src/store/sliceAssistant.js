import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  prompt: ''
};

const sliceAssistant = createSlice({
  name: 'assistant',

  initialState,

  reducers: {
    assistantOpen: state => {
      state.isOpen = true;
    },

    assistantClose: state => {
      state.isOpen = false;

      state.prompt = '';
    },

    assistantSetPrompt: (state, { payload }) => {
      state.prompt = payload;
    }
  }
});

export const { assistantOpen, assistantClose, assistantSetPrompt } =
  sliceAssistant.actions;

export default sliceAssistant.reducer;
