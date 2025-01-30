import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            if (!action.payload) return state;
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false,
                error: null
            };
        },
        loginFailure: (state, action) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        }
    }
});

export const { loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;