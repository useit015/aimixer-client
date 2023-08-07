import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {mode: 'login', isLoggedIn: false, email: '', username: '', password: '', token: '', accountId: ''},
    reducers: {
        loginSetIsLoggedIn: (state, action) => {
            const newState = !state.isLoggedIn;
            state.isLoggedIn = newState;
            return state
        },
        loginSetMode: (state, action) => {
            console.log('action', action)
            state.mode = action.payload;
            return state;
        }
    }
});

export const { loginSetIsLoggedIn, loginSetMode } = loginSlice.actions;

export default loginSlice.reducer;