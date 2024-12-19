import { createSlice } from "@reduxjs/toolkit";

const initialTheme = {
    darkTheme: false
}

const themeReducerSlice = createSlice({
    name: 'themereducer',
    initialState: initialTheme,
    reducers:{
        toggleTheme(state){
              state.darkTheme = !state.darkTheme
        },
        setDark(state,action){
            state.darkTheme = action.payload
        }
    }
})

export const themeReducerAction = themeReducerSlice.actions;
export default themeReducerSlice.reducer;