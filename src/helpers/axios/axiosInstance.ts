import { TResponse } from "@/types/common.type";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const axiosInstance = axios.create();
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 60000;

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = getFromLocalStorage("accessToken");
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  function (response) {
    const responseObject: TResponse = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  function (error) {
    const responseError = {
      statusCode: error?.response?.data?.statusCode,
      message: error?.response?.data?.message || "Something went wrong",
      errorMessages: error?.response?.data?.message,
    };
    return responseError;
  }
);

export { axiosInstance };
