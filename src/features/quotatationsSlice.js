import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../api/apiInstance";
import { userApis } from "../api/userEndpoint";

const initialState = {
    admin_quotations : [],
    users_quotations : [],
    users_quotations_loading : false,
    admin_quotations_loading : false,
    update_loading : false,
}

export const handleUpdateQuote = createAsyncThunk("quotatoinsSlice/handleUpdateQuote",async({body}) => {
    const response = await fetchData({url : userApis.routes.updateQuote , method:"PUT" , body });
    return response;
})


export const quotatoinsSlice = createSlice({
    name:"quotatoinsSlice",
    initialState,
    extraReducers:(builder) => {
        builder
        .addCase(handleUpdateQuote.pending , (state, action) => {
            state.update_loading = true
        })
        .addCase(handleUpdateQuote.fulfilled , (state, action) => {
            state.admin_quotations = action.payload,
            state.update_loading = false
        })
    }
})

export default quotatoinsSlice.reducer