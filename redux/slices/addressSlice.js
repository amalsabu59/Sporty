import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getAddresses = createAsyncThunk("address", async (id) => {
  try {
    const response = await axios.get(`/address/${id}`);
    return response.data;
  } catch (error) {
    // throw error; // Rethrow the error to be caught in the rejected action
  }
});

export const addAddress = createAsyncThunk("address/add", async (data) => {
  try {
    const response = await axios.post(
      `/address/${data.userId}`,
      JSON.stringify(data.formData)
    );
    return response.data;
  } catch (error) {
    console.log(error);
    // throw error; // Rethrow the error to be caught in the rejected action
  }
});
export const updateAddress = createAsyncThunk(
  "address/update",
  async (data) => {
    try {
      const response = await axios.put(
        `/address/${data.userId}`,
        JSON.stringify(data.formData)
      );
      return response.data;
    } catch (error) {
      console.log(error);
      // throw error; // Rethrow the error to be caught in the rejected action
    }
  }
);

export const createFormData = (data) => {
  return {
    type: "address/createFormData",
    payload: data, // Add the payload to carry the data
  };
};
export const clearFormData = () => {
  return {
    type: "address/clearFormData",
  };
};
export const selectedAddress = (id) => {
  return {
    type: "address/selectedAddress",
    payload: id, // Add the payload to carry the data
  };
};
const addressSlice = createSlice({
  name: "address",
  initialState: {
    status: "",
    selectedAddress: "",
    addresses: [],
    formData: {
      formChanged: true,
      values: {},
    },
  },
  reducers: {
    createFormData: (state, action) => {
      state.formData.values = { ...state.formData.values, ...action.payload };
    },
    clearFormData: (state) => {
      state.formData.values = {};
    },
    selectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },
  extraReducers: {
    [getAddresses.pending]: (state) => {
      state.status = "loading";
    },
    [getAddresses.fulfilled]: (state, { payload }) => {
      state.addresses = payload; // Update the currentUser state with the retrieved data
      state.status = "success";
    },
    [getAddresses.rejected]: (state, action) => {
      state.status = "failed";
    },
    [addAddress.pending]: (state) => {
      state.status = "loading";
    },
    [addAddress.fulfilled]: (state, { payload }) => {
      state.addresses = payload || []; // Update the currentUser state with the retrieved data
      state.status = "success";
    },
    [addAddress.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updateAddress.pending]: (state) => {
      state.status = "loading";
    },
    [updateAddress.fulfilled]: (state, { payload }) => {
      state.addresses = payload; // Update the currentUser state with the retrieved data
      state.status = "success";
    },
    [updateAddress.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const addressActions = addressSlice.actions;
export default addressSlice;
