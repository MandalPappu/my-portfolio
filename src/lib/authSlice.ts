import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    userId:string | null
}

// Define the initial state using that type
const initialState: AuthState = {
    userId:null
}
export const authSlice = createSlice({
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        login: (state, action) => {
            state.userId = action.payload
        },
        logout: (state) => {
            state.userId = null
        },
    },
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;