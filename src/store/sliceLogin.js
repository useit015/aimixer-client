import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {mode: 'login', isLoggedIn: false, isCorporateAccount: false, email: '', username: '', password: '', confirmPassword: '', token: '', accountId: ''},
    reducers: {
        loginSetIsLoggedIn: (state, action) => {
            const newState = !state.isLoggedIn;
            state.isLoggedIn = newState;
            return state
        },
        loginSetMode: (state, action) => {
            state.mode = action.payload;
            return state;
        },
        loginSetUsername: (state, action) => {
            state.username = action.payload;
            return state;
        },
        loginSetEmail: (state, action) => {
            state.email = action.payload;
            return state;
        },
        loginSetPassword: (state, action) => {
            state.password = action.payload;
            return state;
        },
        loginSetConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload;
            return state;
        },
        loginSetAccountId: (state, action) => {
            state.accountId = action.payload;
            return state;
        },
        loginSetIsCorporateAccount: (state, action) => {
            state.isCorporateAccount = action.payload;
            return state;
        }
    }
});

export const { loginSetIsLoggedIn, loginSetMode, loginSetUsername, loginSetPassword, loginSetEmail, loginSetConfirmPassword, loginSetAccountId, loginSetIsCorporateAccount } = loginSlice.actions;

export default loginSlice.reducer;