import { configureStore } from "@reduxjs/toolkit";
import slideReducer from "../store/reducers/slideSlice";

const store = configureStore({
  reducer: {
    slide: slideReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
