import { customFetch, checkForUnauthorizedResponse } from "../utils/axios";
import { toast } from "react-toastify";

export const getAllJobsThunk = async (_: any, thunkAPI: any) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJobs;

  let url = `jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
  if (search) {
    url += `&search=${search}`;
  }

  try {
    const response = await customFetch.get(url);
    return response.data;
  } catch (error: any) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
