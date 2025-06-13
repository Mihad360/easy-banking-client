"use server";
import { axiosUrl } from "@/lib/axiosInstance";
import { TLogin } from "@/types/auth.type";
import { cookies } from "next/headers";

export const loginUser = async (userData: TLogin) => {
  try {
    const { data } = await axiosUrl.post("/auth/login", userData);
    if (data.success) {
      (await cookies()).set("accessToken", data?.data?.accessToken);
      (await cookies()).set("refreshToken", data?.data?.refreshToken);
    }
    return data;
  } catch (error) {
    // console.log(error);
    throw new Error(error?.response?.data?.message);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signUpUser = async (userData: FormData): Promise<any> => {
  try {
    console.log(userData);
    const { data } = await axiosUrl.post("/users/create-customer", userData);
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};

export const verifyOtp = async (otpData) => {
  try {
    const { data } = await axiosUrl.post("/users/verify-otp", otpData);
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};
