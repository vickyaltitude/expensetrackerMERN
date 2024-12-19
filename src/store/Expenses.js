import { createSlice } from "@reduxjs/toolkit";

const expenseInitialState = {
    expenses : [],
}

const expenseSlice =  createSlice({
    name: 'expenseslice',
    initialState: expenseInitialState,
    reducers:{
        addExpense(state,action){
            state.expenses = action.payload
        }
    }
})

export const expenseSliceAction = expenseSlice.actions;

export default expenseSlice.reducer;