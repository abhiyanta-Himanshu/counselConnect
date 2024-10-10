import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    'name' : 'auth',
    initialState : {
        loading: false,
        user : null,
        type: null
    },
    reducers : {
        setLoading : (state, action) => {
            state.loading = action.payload;
        },
        setUser : (state , action) => {
            state.user = action.payload;
        },
        setType : (state , action) => {
            state.type = action.payload;
        }
    }
})

export const {setLoading } = authSlice.actions;
export const {setUser } = authSlice.actions;
export const {setType} = authSlice.actions;
export default authSlice.reducer;