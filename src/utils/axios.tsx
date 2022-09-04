import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";
import { clearStore } from "../slices/userSlice";

//cau hinh axios
export const customFetch = axios.create({
  baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
});
// Axios interceptors làm mới token khi hết hạn trong jwt
customFetch.interceptors.request.use((config: any) => {
  const user = getUserFromLocalStorage();
  if (user) {
    /* `headers` là các header được đặt lại trước khi gửi lên server
    Bearer Token cấp quyền truy cập cho người dùng khi có token hợp lệ. */
    config.headers.common["Authorization"] = `Bearer ${user.token}`;
  }
  return config;
});

export const checkForUnauthorizedResponse = (error: any, thunkAPI: any) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};
