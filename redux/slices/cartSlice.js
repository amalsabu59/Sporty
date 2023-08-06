import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getCartItems = createAsyncThunk("/cart/get-cart/", async (id) => {
  try {
    const response = await axios.get(`/cart/get-cart/${id}`);
    return response.data;
  } catch (error) {
    // throw error; // Rethrow the error to be caught in the rejected action
  }
});

export const addToCart = createAsyncThunk("/cart/add-cart", async (data) => {
  try {
    const response = await axios.post(`/cart/add-cart`, JSON.stringify(data));
    return response.data;
  } catch (error) {
    // throw error; // Rethrow the error to be caught in the rejected action
  }
});

export const selectedCartId = (id) => {
  return {
    type: "cart/selectedCartId",
    payload: id, // Add the payload to carry the data
  };
};
export const clearCart = () => {
  return {
    type: "cart/clearCart",
  };
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    selectedCartId: "",
    status: "",
    cart: [],
  },
  reducers: {
    selectedCartId: (state, action) => {
      state.selectedCartId = action.payload;
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.status = "loading";
    },
    [getCartItems.fulfilled]: (state, { payload }) => {
      state.cart = payload || []; // Update the currentUser state with the retrieved data
      state.status = "success";
    },
    [getCartItems.rejected]: (state, action) => {
      state.status = "failed";
    },

    [addToCart.pending]: (state) => {
      // state.status = "loading";
    },
    [addToCart.fulfilled]: (state, { payload }) => {
      state.cart = payload; // Update the currentUser state with the retrieved data
      // state.status = "success";
    },
    [addToCart.rejected]: (state, action) => {
      // state.status = "failed";
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
