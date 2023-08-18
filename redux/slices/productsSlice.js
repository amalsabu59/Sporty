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
export const updateRating = createAsyncThunk(
  "/products/update-ratings",
  async (data) => {
    try {
      const response = await axios.post(
        `/products/update-ratings/${data.id}`,
        data.data
      );
      console.log("response: " + JSON.stringify(response));
      return response.data;
    } catch (error) {
      // throw error; // Rethrow the error to be caught in the rejected action
    }
  }
);

export const addProducts = createAsyncThunk("/products/add", async (data) => {
  try {
    const response = await axios.post(`/products/add`, JSON.stringify(data));
    return response.data;
  } catch (error) {
    // throw error; // Rethrow the error to be caught in the rejected action
  }
});
export const editProducts = createAsyncThunk(
  "/products/update",
  async (data) => {
    try {
      const response = await axios.put(
        `/products//update/${data.id}`,
        JSON.stringify(data.data)
      );
      return response.data;
    } catch (error) {
      // throw error; // Rethrow the error to be caught in the rejected action
    }
  }
);

export const delProduct = createAsyncThunk("/products/delete", async (id) => {
  try {
    const response = await axios.delete(`/products/delete/${id}`);
    return response.data;
  } catch (error) {
    // throw error; // Rethrow the error to be caught in the rejected action
  }
});
export const createFormData = (data) => {
  return {
    type: "products/createFormData",
    payload: data, // Add the payload to carry the data
  };
};
export const selectedProductId = (id) => {
  return {
    type: "products/selectedProductId",
    payload: id, // Add the payload to carry the data
  };
};
export const clearFormData = () => {
  return {
    type: "products/clearFormData",
  };
};
const productsSlice = createSlice({
  name: "products",
  initialState: {
    selectedCartId: "",
    status: "",
    selectedProductId: "",
    products: [],
    formData: {
      formChanged: true,
      values: {
        title: "",
        desc: "",
        size: [], // Initialize size as an empty array
        categories: [], // Initialize size as an empty array
        images: [], // Initialize
        price: "",
      },
    },
  },
  reducers: {
    createFormData: (state, action) => {
      state.formData.values = { ...state.formData.values, ...action.payload };
    },
    clearFormData: (state) => {
      state.formData.values = {
        title: "",
        desc: "",
        size: [], // Initialize size as an empty array
        categories: [], // Initialize size as an empty array
        images: [], // Initialize
        price: "",
      };
    },
    selectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    selectedProductId: (state, action) => {
      state.selectedProductId = action.payload;
    },
  },
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
    [addProducts.pending]: (state) => {
      state.status = "loading";
    },
    [addProducts.fulfilled]: (state, { payload }) => {
      state.products = payload; // Update the currentUser state with the retrieved data
      state.status = "success";
    },
    [addProducts.rejected]: (state, action) => {
      state.status = "failed";
    },
    [editProducts.pending]: (state) => {
      state.status = "loading";
    },
    [editProducts.fulfilled]: (state, { payload }) => {
      state.products = payload; // Update the currentUser state with the retrieved data
      state.status = "success";
    },
    [editProducts.rejected]: (state, action) => {
      state.status = "failed";
    },
    [delProduct.pending]: (state) => {
      state.status = "loading";
    },
    [delProduct.fulfilled]: (state, { payload }) => {
      state.products = payload; // Update the currentUser state with the retrieved data
      state.status = "success";
    },
    [delProduct.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const userActions = productsSlice.actions;
export default productsSlice;
