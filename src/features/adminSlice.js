import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../api/apiInstance";
import { userApis } from "../api/userEndpoint";

const initialState = {
    admins: [],
    admin_loading: false,
    add_loading: false,
    edit_loading: false
}

export const handleGetAllAdmins = createAsyncThunk("adminSlice/handleGetAllAdmins", async () => {
    const response = await fetchData({ url: userApis.routes.fetchAdmin });
    return response;
})

export const handleCreateAdmin = createAsyncThunk("adminSlice/handleCreateAdmin", async ({ body }) => {
    const response = await fetchData({ url: userApis.routes.createAdmin, method: "POST", body });
    return response;
})

export const handleEditAdmin = createAsyncThunk("adminSlice/handleEditAdmin", async ({ body }) => {
    const response = await fetchData({ url: userApis.routes.editAdmin, method: "PUT", body });
    return response;
})



export const adminSlice = createSlice({
    name: "adminSlice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(handleGetAllAdmins.pending, (state, action) => {
                state.admin_loading = true
            })
            .addCase(handleGetAllAdmins.fulfilled, (state, action) => {
                state.admins = action.payload,
                    state.admin_loading = false
            })
            .addCase(handleCreateAdmin.pending, (state, action) => {
                state.add_loading = true
            })
            .addCase(handleCreateAdmin.fulfilled, (state, action) => {
                state.add_loading = false
            })
            .addCase(handleEditAdmin.pending, (state, action) => {
                state.edit_loading = true
            })
            .addCase(handleEditAdmin.fulfilled, (state, action) => {
                state.edit_loading = false
            })
    }
})

export default adminSlice.reducer;