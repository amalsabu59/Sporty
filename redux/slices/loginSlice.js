import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const sendotp = createAsyncThunk("auth/send-otp", async (data) => {
  try {
    const response = await axios.post(`/auth/send-otp`, JSON.stringify(data));
    return response.data;
  } catch (error) {
    // throw error; // Rethrow the error to be caught in the rejected action
  }
});

export const login = createAsyncThunk("auth/login", async (data) => {
  const response = await axios.post(`/auth/login`, JSON.stringify(data));
  return response.data;
});
export const getCurrentUser = createAsyncThunk(
  "auth/get-current-user",
  async () => {
    try {
      const currentUser = await AsyncStorage.getItem("@currentUser");
      const parsedUser = JSON.parse(currentUser);
      return parsedUser.user ? parsedUser.user : { phone: "" };
    } catch (error) {
      // Handle any errors during AsyncStorage retrieval
      throw new Error("Error retrieving current user: " + error.message);
    }
  }
);

export const updateUserName = createAsyncThunk(
  "auth/update-name",
  async (data) => {
    try {
      const response = await axios.post(
        `/auth/update-name`,
        JSON.stringify(data)
      );
      return response.data;
    } catch (error) {
      throw error; // Rethrow the error to be caught in the rejected action
    }
  }
);
export const openLoginModal = () => {
  return {
    type: "user/openLoginModal",
  };
};

export const closeLoginModal = () => {
  return {
    type: "user/closeLoginModal",
  };
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "",
    otpForVerification: "",
    currentUser: {
      phone: "",
    },
    loginModal: false,
  },
  reducers: {
    openLoginModal: (state) => {
      state.loginModal = true;
    },
    closeLoginModal: (state) => {
      state.loginModal = false;
    },
  },
  extraReducers: {
    [getCurrentUser.pending]: (state) => {
      state.status = "loading";
    },
    [getCurrentUser.fulfilled]: (state, { payload }) => {
      state.currentUser = payload; // Update the currentUser state with the retrieved data
      state.status = "success";
    },
    [getCurrentUser.rejected]: (state, action) => {
      state.status = "failed";
    },
    [sendotp.pending]: (state, action) => {
      state.status = "loading";
    },
    [sendotp.fulfilled]: (state, { payload }) => {
      state.otpForVerification = payload.otp;
      state.currentUser["phone"] = payload.phone;
      state.status = "success";
    },
    [sendotp.rejected]: (state, action) => {
      state.status = "failed";
    },
    [login.pending]: (state, action) => {
      state.status = "loading";
    },
    [login.fulfilled]: (state, { payload }) => {
      AsyncStorage.setItem("@currentUser", JSON.stringify(payload));
      state.currentUser = payload.user;
      state.status = "success";
    },
    [login.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updateUserName.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateUserName.fulfilled]: (state, { payload }) => {
      AsyncStorage.setItem("@currentUser", JSON.stringify(payload));
      state.currentUser = payload.user;
      state.status = "success";
    },
    [updateUserName.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
