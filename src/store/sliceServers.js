import { createSlice } from '@reduxjs/toolkit';

const sliceServers = createSlice({
  name: 'servers',
  initialState: {
    mode: import.meta.env.MODE === 'development' ? 'dev' : 'prod',
    api: {
      dev: 'https://localhost:5300',
      prod: 'https://api.aimixer.io:5000'
    },
    assets: {
      dev: 'https://assets.aimixer.io:5002',
      prod: 'https://assets.aimixer.io:5002'
    }
  },
  reducers: {
    spinnerSetStatus: (state, action) => {
      state.status = action.payload;
      return state;
    }
  }
});

export const {} = sliceServers.actions;

export default sliceServers.reducer;
