import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../utils/axios";

type InitialState = {
  isLoading: boolean;
  user: null;
};
const initialState: InitialState = {
  isLoading: false,
  user: null,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post("/auth/testingRegister", user);
      console.log(response);
    } catch (error: any) {
      toast.error(error.response.data.msg);
      console.log(error.response);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    console.log(` Login user: ${JSON.stringify(user)},`);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const userActions = userSlice.actions;
export default userSlice;
