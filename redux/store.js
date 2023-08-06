import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/loginSlice";
import productsSlice from "./slices/productsSlice";
import cartSlice from "./slices/cartSlice";
import addressSlice from "./slices/addressSlice";
import orderSlice from "./slices/ordersSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    address: addressSlice.reducer,
    orders: orderSlice.reducer,
  },
});

export default store;
