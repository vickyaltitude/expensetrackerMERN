import { createSlice } from "@reduxjs/toolkit";


const userAuthInitial =  {
     currentUser: '',
     isLoggedIn: false

}

const userAuthSlice = createSlice({
    name: 'userauth',
    initialState: userAuthInitial,
    reducers:{
        setCurrentUser(state,action){
             state.currentUser = action.payload
        },
        setIsLoggedIn(state,action){
            state.isLoggedIn = action.payload
        }
    }
})

export const  userAuthSliceAction = userAuthSlice.actions;

export default  userAuthSlice.reducer ;

