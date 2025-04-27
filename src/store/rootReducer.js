import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from '../features/usersSlice';
import authReducer from '../features/authSlice';
import quotationReducer from '../features/quotatationsSlice';
import adminReducer from '../features/adminSlice';

export const rootReducers = combineReducers({
    users: usersReducer,
    auth: authReducer,
    quotations : quotationReducer,
    admins : adminReducer
})