import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from '../api/apiInstance';
import { userApis } from "../api/userEndpoint";

const initialState = {
    getUserLoading: false,
    users: [],
    users_quotations: [],
    users_quotations_loading: false,
    usersError: null,
    specific_user: null,
    specific_user_loading: false
};

export const handleFetchAllUsers = createAsyncThunk("usersSlice/handleFetchAllUsers", async () => {
    const response = await fetchData({ url: userApis.routes.getAllUsers });
    return response;
})

export const handleFetchSpecificUser = createAsyncThunk("usersSlice/handleFetchSpecificUser", async ({ user_id }) => {
    const response = await fetchData({ url: userApis.routes.getAllUsers + `?user_id=${user_id}` });
    return response;
})

export const handleFetchUsersQuotations = createAsyncThunk("usersSlice/handleFetchUsersQuotations", async () => {
    const response = await fetchData({ url: userApis.routes.admin_quotations });
    return response;
})

export const usersSlice = createSlice({
    name: "usersSlice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(handleFetchAllUsers.pending, (state, action) => {
                state.getUserLoading = true,
                    state.usersError = null
            })
            .addCase(handleFetchAllUsers.fulfilled, (state, action) => {
                state.users = action.payload,
                    state.getUserLoading = false
            })
            .addCase(handleFetchAllUsers.rejected, (state, action) => {
                state.getUserLoading = false,
                    state.usersError = action.payload
            })
            .addCase(handleFetchUsersQuotations.pending, (state, action) => {
                state.users_quotations_loading = true
            })
            .addCase(handleFetchUsersQuotations.fulfilled, (state, action) => {
                state.users_quotations = action.payload,
                    state.users_quotations_loading = false
            })
            .addCase(handleFetchUsersQuotations.rejected, (state, action) => {
                state.users_quotations_loading = false
            })
            .addCase(handleFetchSpecificUser.pending, (state, action) => {
                state.specific_user_loading = true
            })
            .addCase(handleFetchSpecificUser.fulfilled, (state, action) => {
                state.specific_user = action.payload,
                    state.specific_user_loading = false
            })
            .addCase(handleFetchSpecificUser.rejected, (state, action) => {
                state.specific_user_loading = false
            })
    }
})

export default usersSlice.reducer;