import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./currencySlice";

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; 
    //Represents the entire state of the Redux store.
    //Useful for TypeScript to ensure correct state selection in components.
export type AppDispatch = typeof store.dispatch;
