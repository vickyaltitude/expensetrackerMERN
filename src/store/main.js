import { configureStore } from "@reduxjs/toolkit";

import userAuthReducer from './UserAuth';
import expensesReducer from './Expenses';
import themeReducer from './Theme'
const store = configureStore({
    reducer:{expenses: expensesReducer , userAuth: userAuthReducer,theme: themeReducer}
})

export default store