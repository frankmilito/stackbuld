import axios from "axios";
import { store } from "../globalStore/store";

const baseUrl = "http://localhost:3005";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from the Redux store
    const token = store?.getState()?.post.token;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if (error.code === "ERR_NETWORK") {
    //   toast.error("Please check your network connection!");
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
