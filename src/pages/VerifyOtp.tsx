"use client";
import EBForm from "@/shared/form/EBForm";
import EBInput from "@/shared/form/EBInput";
import { KeyIcon } from "lucide-react";
import { FieldValues } from "react-hook-form";
import { useEffect, useState } from "react";
import { useVerifyOtpMutation } from "@/redux/api/authApi";
import { toast } from "sonner";

const VerifyOtp = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [verifyOtp] = useVerifyOtpMutation();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
    console.log("Loaded email:", storedEmail);
  }, []);

  const onSubmit = async (data: FieldValues) => {
    if (email) {
      const verifyData = {
        email,
        otp: data.otp,
      };

      try {
        const res = await verifyOtp(verifyData);
        console.log("OTP Verified:", res);
        if (res) {
          toast.success("Sign up successfully", { duration: 3000 });
          localStorage.removeItem("email");
        }
        // Optionally redirect
      } catch (err) {
        console.error("OTP verification failed:", err);
        toast.error("Sign up failed. Invalid OTP.", { duration: 3000 });
        // Don’t remove email yet — maybe allow retry
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 px-4">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-900 shadow-lg rounded-2xl border border-gray-100 dark:border-gray-800">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Verify Your OTP
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Enter the code sent to{" "}
            <span className="font-medium">{email || "your email"}</span>
          </p>
        </div>
        <EBForm onSubmit={onSubmit}>
          <EBInput
            label="OTP"
            name="otp"
            type="text"
            icon={<KeyIcon />}
            placeholder="Enter your valid OTP ..."
          />
          <button
            type="submit"
            className="cursor-pointer mt-6 w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition duration-300 shadow-md hover:shadow-lg"
          >
            Verify
          </button>
        </EBForm>
      </div>
    </div>
  );
};

export default VerifyOtp;
