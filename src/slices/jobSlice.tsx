import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../utils/axios";
import { getUserFromLocalStorage } from "../utils/localStorage";
import { logoutUser } from "./userSlice";

type InitialState = {
  isLoading: boolean;
  position: string;
  company: string;
  jobLocation: string;
  jobTypeOptions: string[];
  jobType: string;
  statusOptions: string[];
  status: string;
  isEditting: boolean;
  editJobId: string;
};
const initialState: InitialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "interview",
  isEditting: false,
  editJobId: "",
};

export const createJob = createAsyncThunk(
  "job/createJob",
  async (job: any, thunkAPI: any) => {
    try {
      const response = await customFetch.post("job/createJob", job, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(clearValues());
      return response.data;
    } catch (error: any) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser(""));
        return thunkAPI.rejectWithValue("Unauthorized");
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (
      state: any,
      action: PayloadAction<{ name: string; value: any }>
    ) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    clearValues: (state: any) => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },
  },
  extraReducers: {
    // @ts-ignore
    [createJob.pending]: (state: any) => {
      state.isLoading = true;
    },
    // @ts-ignore
    [createJob.fulfilled]: (state: any) => {
      state.isLoading = false;
      toast.success("Job created successfully");
    },
    // @ts-ignore
    [createJob.rejected]: (state: any, action: PayloadAction<any>) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
  },
});

export const { handleChange, clearValues } = jobSlice.actions;
export default jobSlice;
