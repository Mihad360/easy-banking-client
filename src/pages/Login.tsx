"use client";
import { Button } from "@/components/ui/button";
import { useLoginUserMutation } from "@/redux/api/authApi";
import EBForm from "@/shared/form/EBForm";
import EBInput from "@/shared/form/EBInput";
import AuthLoading from "@/shared/loader/AuthLoading";
import { Key, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const Login = () => {
  const [loginUser, { data: loginData, isSuccess, isLoading }] =
    useLoginUserMutation();
  const router = useRouter();
  console.log(loginData);
  const onSubmit = async (data: FieldValues) => {
    try {
      const userData = {
        email: data.email,
        password: data.password,
      };
      const res = await loginUser(userData);
      console.log(res);
      if (res?.data?.accessToken) {
        localStorage.setItem("accessToken", res?.data?.accessToken);
        toast.success("Login Successfull", { duration: 3000 });
        router.push("/");
      } else {
        toast.error(
          res?.error?.data?.message === "The user is not found"
            ? "Invalid details or Something went wrong"
            : res?.error?.data?.message,
          { duration: 4000 }
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.log(error);
      toast.error("Login Failed", { duration: 3000 });
    }
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     localStorage.setItem("accessToken", loginData?.accessToken);
  //     toast.success("Login Successfull", { duration: 3000 });
  //   } else {
  //     toast.error("Login Failed", { duration: 3000 });
  //   }
  // }, [isSuccess, loginData]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="flex">
        <div className="w-full max-w-md p-8 bg-white/80 dark:bg-gray-900/80 rounded-l-2xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
              Sign in to your account
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">______</p>
          </div>

          <EBForm onSubmit={onSubmit}>
            <EBInput
              label="Email"
              name="email"
              type="email"
              icon={<Mail />}
              placeholder="Enter your email"
            />
            <EBInput
              label="Password"
              name="password"
              type="password"
              icon={<Key />}
              placeholder="Enter your valid password ..."
            />
            <div className="pt-2">
              <Button
                type="submit"
                className="cursor-pointer w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {isLoading ? <AuthLoading /> : "Login"}
              </Button>
            </div>
          </EBForm>
        </div>
        <div className="w-[450px] bg-sky-600 rounded-r-2xl">
          <div className="text-center pt-28 px-5">
            <h1 className="text-white text-2xl font-semibold pb-2">
              Welcome to Easy Bank!
            </h1>
            <p className="text-white font-bold pb-4">____</p>
            <p className="text-white font-medium pb-4">New Here !</p>
            <Link
              href="/signup"
              className="border-white border-2 py-1 px-5 rounded-2xl text-white"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
