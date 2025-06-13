import { loginUser, signUpUser, verifyOtp } from "@/services/authServices";
import { TLogin } from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";

export const useLoginUser = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (userData: TLogin) => {
      return await loginUser(userData);
    },
  });
};

export const useSignupUser = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (userData: FormData) => {
      return await signUpUser(userData);
    },
    onSuccess: (data) => {
      if (data.data.sendMail.success) {
        localStorage.setItem("email", data.data.email);
      }
    },
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: async (otpData) => {
      return await verifyOtp(otpData);
    },
    onSuccess: (data) => {
      if (data.success) {
        localStorage.removeItem("email");
      }
    },
  });
};
