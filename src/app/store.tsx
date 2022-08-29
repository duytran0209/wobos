import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import allJobsSlice from "../slices/allJobsSlice";
import jobSlice from "../slices/jobSlice";
import uiSlice from "../slices/uiSlice";
import userSlice from "../slices/userSlice";
export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    user: userSlice.reducer,
    job: jobSlice.reducer,
    allJobs: allJobsSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
