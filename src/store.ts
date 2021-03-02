import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import todosSlice from "./slices/todos";

export const store = configureStore({
  reducer: todosSlice,
});

// Type definitions
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
