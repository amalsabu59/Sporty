import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
export const login = createAsyncThunk("auth/send-otp", async (data) => {
  console.log("data", data);
  const response = await axios.put(`/auth/send-otp`, JSON.stringify(data));
  return response.data;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    status: "",
    currentUser: {},
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.status = "loading";
    },
    [login.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
      state.status = "success";
    },
    [login.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
