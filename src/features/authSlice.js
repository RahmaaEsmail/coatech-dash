import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../api/apiInstance";
import { configs } from "../configs";
import { userApis } from "../api/userEndpoint";

const initialState = {
    data : [],
    loginLoading:false,
    error:null
}

export const handleLogin = createAsyncThunk("authSlice/handleLogin",async({body}) => {
    const response = await fetchData({url : userApis.routes.login , body , method :"POST"});
    return response;
})

export const authSlice = createSlice({
    name:"authSlice",
    initialState,
    extraReducers:(builder) => {
      builder
      .addCase(handleLogin.pending, (state) => {
        state.loginLoading = true;
        state.error = null;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loginLoading = false;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.loginLoading = false;
        state.error = action.error?.message || "Login failed";
      });      
    }
})

export default authSlice.reducer;