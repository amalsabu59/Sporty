import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getOrders = createAsyncThunk("/order/", async (id) => {
  try {
    const response = await axios.get(`/order/${id}`);
    return response.data;
  } catch (error) {
    // throw error; // Rethrow the error to be caught in the rejected action
  }
});

export const addOrders = createAsyncThunk("/order/checkout", async (data) => {
  try {
    const response = await axios.post(`/order/checkout`, JSON.stringify(data));
    return response.data;
  } catch (error) {
    // throw error; // Rethrow the error to be caught in the rejected action
  }
});

export const setSelectedProductId = (id) => {
  return {
    type: "orders/setSelectedProductId",
    payload: id, // Add the payload to carry the data
  };
};
const cartSlice = createSlice({
  name: "orders",
  initialState: {
    status: "",
    orders: [],
    selectedProductId: "",
  },
  reducers: {
    setSelectedProductId: (state, action) => {
      state.selectedProductId = action.payload;
    },
  },
  extraReducers: {
    [getOrders.pending]: (state) => {
      state.status = "loading";
    },
    [getOrders.fulfilled]: (state, { payload }) => {
      state.orders = payload; // Update the currentUser state with the retrieved data
      state.status = "success";
    },
    [getOrders.rejected]: (state, action) => {
      state.status = "failed";
    },

    [addOrders.pending]: (state) => {
      state.status = "loading";
    },
    [addOrders.fulfilled]: (state, { payload }) => {
      state.orders = payload; // Update the currentUser state with the retrieved data
      state.status = "success";
    },
    [addOrders.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
