import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./currencySlice";

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
  },
});

// Define RootState and AppDispatch for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
