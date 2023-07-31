import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/loginSlice";
import productsSlice from "./slices/productsSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    products: productsSlice.reducer,
  },
});

export default store;
