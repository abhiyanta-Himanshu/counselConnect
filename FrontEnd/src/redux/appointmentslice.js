import { createSlice } from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
    "name" : "apointment",
    initialState : {
        // lawyerID : ''
    },
    reducers : {
        // setLawyerId : (state , action) => {
        //     state.lawyerID = action.payload
        // }
    }
})


export const { setLawyerId } = appointmentSlice.actions;
export default appointmentSlice.reducer;