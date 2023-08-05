import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getOrders = createAsyncThunk("/orders/get-orders/", async (id) => {
  try {
    const response = await axios.get(`/cart/get-cart/${id}`);
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

const cartSlice = createSlice({
  name: "orders",
  initialState: {
    status: "",
    orders: [],
  },
  reducers: {},
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
