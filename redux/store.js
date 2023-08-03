import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/loginSlice";
import productsSlice from "./slices/productsSlice";
import cartSlice from "./slices/cartSlice";
import addressSlice from "./slices/addressSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    address: addressSlice.reducer,
  },
});

export default store;
