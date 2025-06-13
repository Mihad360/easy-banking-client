"use client";
import { Button } from "@/components/ui/button";
import { useLoginUser } from "@/hooks/auth.hook";
import EBForm from "@/shared/form/EBForm";
import EBInput from "@/shared/form/EBInput";
import { Key, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FieldValues } from "react-hook-form";

const Login = () => {
  const { mutate: loginUser } = useLoginUser();
  const onSubmit = (data: FieldValues) => {
    const userData = {
      email: data.email,
      password: data.password,
    };
    const res = loginUser(userData);
    console.log(res);
  };

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
                className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Login
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
