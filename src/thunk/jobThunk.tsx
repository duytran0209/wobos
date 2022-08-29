import { getAllJobs, hideLoading, showLoading } from "../slices/allJobsSlice";
import { clearValues } from "../slices/jobSlice";
import { logoutUser } from "../slices/userSlice";
import { customFetch } from "../utils/axios";

export const createJobThunk = async (job: any, thunkAPI: any) => {
  try {
    const response = await customFetch.post("/jobs", job);
    thunkAPI.dispatch(clearValues());
    return response.data.msg;
  } catch (error: any) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser(""));
      return thunkAPI.rejectWithValue("Unauthorized");
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const deleteJobThunk = async (jobId: string, thunkAPI: any) => {
  thunkAPI.dispatch(showLoading());
  try {
    const response = await customFetch.delete(`/jobs/${jobId}`);
    thunkAPI.dispatch(getAllJobs());
    return response.data.msg;
  } catch (error: any) {
    thunkAPI.dispatch(hideLoading());
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const editJobThunk = async (
  { job, jobId }: any,
  thunkAPI: {
    [x: string]: any;
    dispatch(arg: { payload: undefined; type: string }): unknown;
    rejectWithValue: (arg: any) => any;
  }
) => {
  try {
    const response = await customFetch.patch(`/jobs/${jobId}`, job);
    thunkAPI.dispatch(clearValues());
    return response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser(""));
      return thunkAPI.rejectWithValue("Unauthorized");
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
