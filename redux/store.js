import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/loginSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
