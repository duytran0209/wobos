import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
} from "../thunk/userThunk";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../utils/localStorage";

type InitialState = {
  isLoading: boolean;
  user: any;
  isSidebarOpen: boolean;
};
const initialState: InitialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

export const registerUser: AsyncThunk<any, void, {}> = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk("/auth/register", user, thunkAPI);
  }
);

export const loginUser: AsyncThunk<any, void, {}> = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("/auth/login", user, thunkAPI);
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    return updateUserThunk("/auth/updateUser", user, thunkAPI);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, action: PayloadAction<any>) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      if (action.payload) {
        toast.success(action.payload);
      }
    },
  },
  extraReducers: {
    // @ts-ignore

    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    // @ts-ignore

    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success("Register Successfully");
    },
    // @ts-ignore

    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    // @ts-ignore
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    // @ts-ignore
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success("login Successfully");
    },
    // @ts-ignore

    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    // @ts-ignore
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    // @ts-ignore
    [updateUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success("User updated!");
    },
    // @ts-ignore

    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice;
