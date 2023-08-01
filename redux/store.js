import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/loginSlice";
import productsSlice from "./slices/productsSlice";
import cartSlice from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    products: productsSlice.reducer,
    cart: cartSlice.reducer
  },
});

export default store;
