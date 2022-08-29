import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { customFetch } from "../utils/axios";

interface InitialFiltersState {
  search: string;
  searchStatus: string;
  searchType: string;
  sort: string;
  sortOptions: string[];
}

interface InitialState extends InitialFiltersState {
  isLoading: boolean;
  jobs: [];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: {};
  monthlyApplications: [];
}

export const getAllJobs = createAsyncThunk(
  "allJobs/getJobs",
  async (_, thunkAPI: any) => {
    const url = `jobs`;
    try {
      const response = await customFetch.get(url);
      return response.data;
    } catch (error: any) {
      toast.error("Error fetching jobs");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const showStats = createAsyncThunk(
  "allJobs/showStats",
  async (_, thunkAPI: any) => {
    const url = `jobs/stats`;
    try {
      const response = await customFetch.get(url);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const initialFiltersState: InitialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState: InitialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: {
    [getAllJobs.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAllJobs.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.jobs = payload.jobs;
    },
    [getAllJobs.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [showStats.pending.type]: (state) => {
      state.isLoading = true;
    },
    [showStats.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.stats = payload.stats;
      state.monthlyApplications = payload.monthlyApplications;
    },
    [showStats.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});
export const { showLoading, hideLoading } = allJobsSlice.actions;
export default allJobsSlice;
