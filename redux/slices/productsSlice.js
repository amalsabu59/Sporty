import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getProducts = createAsyncThunk("products", async (data) => {
  try {
    const response = await axios.get(`/products`, JSON.stringify(data));
    return response.data;
  } catch (error) {
    // throw error; // Rethrow the error to be caught in the rejected action
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    selectedCartId: "",
    status: "",
    products: [],
  },
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.status = "loading";
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      state.products = payload; // Update the currentUser state with the retrieved data
      state.status = "success";
    },
    [getProducts.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const userActions = productsSlice.actions;
export default productsSlice;
