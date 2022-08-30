import { clearAllJobsState } from "../slices/allJobsSlice";
import { clearValues } from "../slices/jobSlice";
import { logoutUser } from "../slices/userSlice";
import { customFetch, checkForUnauthorizedResponse } from "../utils/axios";
export const registerUserThunk = async (
  url: string,
  user: any,
  thunkAPI: any
) => {
  try {
    const response = await customFetch.post(url, user);
    return response.data;
  } catch (error: any) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const loginUserThunk = async (
  url: string,
  user: any,
  thunkAPI: { rejectWithValue: (arg: any) => any }
) => {
  try {
    const response = await customFetch.post(url, user);
    return response.data;
  } catch (error: any) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateUserThunk = async (
  url: string,
  user: any,
  thunkAPI: any
) => {
  try {
    const response = await customFetch.patch(url, user);
    return response.data;
  } catch (error: any) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const clearStoreThunk = async (message: string, thunkAPI: any) => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    thunkAPI.dispatch(clearAllJobsState());
    thunkAPI.dispatch(clearValues());
    return Promise.resolve();
  } catch (error: any) {
    return Promise.reject(error);
  }
};
