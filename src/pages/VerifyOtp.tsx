"use client";
import EBForm from "@/shared/form/EBForm";
import EBInput from "@/shared/form/EBInput";
import { KeyIcon } from "lucide-react";
import { FieldValues } from "react-hook-form";
import { useEffect, useState } from "react";
import { useVerifyOtp } from "@/hooks/auth.hook";

const VerifyOtp = () => {
  const [email, setEmail] = useState<string | null>(null);
  const { mutate: verifyOtp } = useVerifyOtp();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
    console.log("Loaded email:", storedEmail);
  }, []);

  const onSubmit = (data: FieldValues) => {
    if (email) {
      const verifyData = {
        email: email,
        otp: data.otp,
      };
      console.log(verifyData);
      const res = verifyOtp(verifyData);
      console.log(res);
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
            className="mt-6 w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition duration-300 shadow-md hover:shadow-lg"
          >
            Verify
          </button>
        </EBForm>
      </div>
    </div>
  );
};

export default VerifyOtp;
