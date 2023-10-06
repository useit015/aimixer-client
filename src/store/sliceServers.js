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
      dev: 'https://localhost:5302',
      prod: 'https://assets.aimixer.io:5002'
    },
    account: {
      dev: 'https://localhost:5001',
      prod: 'https://account.aimixer.io:5001'
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
