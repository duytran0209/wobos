import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../utils/localStorage";
import {
  createJobThunk,
  deleteJobThunk,
  editJobThunk,
} from "../thunk/jobThunk";
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

export const createJob = createAsyncThunk("job/createJob", createJobThunk);

export const deleteJob = createAsyncThunk("job/deleteJob", deleteJobThunk);

export const editJob = createAsyncThunk("job/editJob", editJobThunk);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: {
    [createJob.pending.type]: (state: any) => {
      state.isLoading = true;
    },
    [createJob.fulfilled.type]: (state: any) => {
      state.isLoading = false;
      toast.success("Job created successfully");
    },
    [createJob.rejected.type]: (state: any, action: PayloadAction<any>) => {
      state.isLoading = false;
      toast.error(action.payload);
    },

    [deleteJob.rejected.type]: (state: any, action: PayloadAction<any>) => {
      toast.error(action.payload);
    },
    [deleteJob.fulfilled.type]: (state: any, action: PayloadAction<any>) => {
      toast.success(action.payload);
    },

    [deleteJob.rejected.type]: (state: any, action: PayloadAction<any>) => {
      toast.success(action.payload);
    },

    [editJob.pending.type]: (state: any) => {
      state.isLoading = true;
    },
    [editJob.fulfilled.type]: (state: any) => {
      state.isLoading = false;
      toast.success("Job modified...");
    },
    [editJob.rejected.type]: (state: any, action: PayloadAction<any>) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice;
