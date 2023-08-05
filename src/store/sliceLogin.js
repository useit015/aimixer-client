import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {isLoggedIn: false, username: '', password: '', token: ''},
    reducers: {
        loginSetIsLoggedIn: (state, action) => {
            const newState = !state.isLoggedIn;
            state.isLoggedIn = newState;
            return state
        }
    }
});

export const { loginSetIsLoggedIn } = loginSlice.actions;

export default loginSlice.reducer;