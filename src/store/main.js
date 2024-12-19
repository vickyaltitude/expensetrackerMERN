import { configureStore } from "@reduxjs/toolkit";

import userAuthReducer from './UserAuth';
import expensesReducer from './Expenses';

const store = configureStore({
    reducer:{expenses: expensesReducer , userAuth: userAuthReducer}
})

export default store