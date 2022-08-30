import { getAllJobs, hideLoading, showLoading } from "../slices/allJobsSlice";
import { clearValues } from "../slices/jobSlice";
import { logoutUser } from "../slices/userSlice";
import { customFetch, checkForUnauthorizedResponse } from "../utils/axios";

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
    return checkForUnauthorizedResponse(error, thunkAPI);
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
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const editJobThunk = async ({ job, jobId }: any, thunkAPI: any) => {
  try {
    const response = await customFetch.patch(`/jobs/${jobId}`, job);
    thunkAPI.dispatch(clearValues());
    return response.data;
  } catch (error: any) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
