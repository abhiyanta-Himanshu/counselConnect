import { createSlice } from "@reduxjs/toolkit";

const lawyerSlice = createSlice({
    'name' : 'lawyer',
    initialState : {
        allLawyer : [],
        filterQuery : ''
    },
    reducers : {
        setAllLawyer : (state , action) => {
            state.allLawyer = action.payload;
        },
        setFilterQuery : (state , action) => {
            state.queryLawyer = action.payload;
        }

    }
})


export const { setFilterQuery } = lawyerSlice.actions;
export const { setAllLawyer } = lawyerSlice.actions;
export default lawyerSlice.reducer;