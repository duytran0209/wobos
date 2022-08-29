import { logoutUser } from "../slices/userSlice";
import { customFetch } from "../utils/axios";
export const registerUserThunk = async (
  url: string,
  user: any,
  thunkAPI: { rejectWithValue: (arg: any) => any }
) => {
  try {
    const response = await customFetch.post(url, user);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
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
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateUserThunk = async (
  url: string,
  user: any,
  thunkAPI: {
    [x: string]: any;
    dispatch(arg: { payload: undefined; type: string }): unknown;
    rejectWithValue: (arg: any) => any;
  }
) => {
  try {
    const response = await customFetch.patch(url, user);
    return response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser("Logging out"));
      return thunkAPI.rejectWithValue("Unauthorized");
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
