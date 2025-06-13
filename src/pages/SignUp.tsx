"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignupUser } from "@/hooks/auth.hook";
import EBForm from "@/shared/form/EBForm";
import EBInput from "@/shared/form/EBInput";
import AuthLoading from "@/shared/loader/AuthLoading";
import { FolderPen, Key, Mail, Phone, PictureInPicture } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Controller, FieldValues } from "react-hook-form";

const SignUp = () => {
  const { mutate: signupUser, isPending, isSuccess } = useSignupUser();
  const router = useRouter();
  const onSubmit = (data: FieldValues) => {
    const { profilePhotoUrl, ...rest } = data;
    console.log(data);
    const formData = new FormData();
    const userData = {
      ...rest,
    };
    // console.log(imageFile);
    formData.append("data", JSON.stringify(userData));
    formData.append("file", profilePhotoUrl);
    const res = signupUser(formData);
    console.log(res);
  };
  // console.log(isPending, isSuccess);
  useEffect(() => {
    if (isSuccess) {
      router.push("/verify-otp");
    }
  }, [isSuccess, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="w-full max-w-[800px] p-8 bg-white/80 dark:bg-gray-900/80 rounded-l-2xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
            Sign Up to your account
          </h1>
        </div>

        <EBForm onSubmit={onSubmit}>
          <div className="flex gap-10 justify-center">
            <div>
              <EBInput
                label="First Name"
                name="name.firstName"
                type="text"
                icon={<FolderPen />}
                placeholder="Enter your First Name"
                size={40}
              />
              <EBInput
                label="Email"
                name="email"
                type="email"
                icon={<Mail />}
                placeholder="Enter your verified email"
                size={40}
              />
              <EBInput
                label="Password"
                name="password"
                type="password"
                icon={<Key />}
                placeholder="Enter your valid password ..."
                size={40}
              />
            </div>
            <div>
              <EBInput
                label="Last Name"
                name="name.lastName"
                type="text"
                icon={<FolderPen />}
                placeholder="Enter your Last Name"
                size={40}
              />
              <EBInput
                label="Phone Number"
                name="phoneNumber"
                type="text"
                icon={<Phone />}
                placeholder="Enter your Phone Number"
                size={40}
              />
              <div className="flex items-center gap-2 pb-3">
                <PictureInPicture />
                <Label>Profile Photo</Label>
              </div>
              <Controller
                name="profilePhotoUrl"
                render={({ field: { onChange, value, ...field } }) => (
                  <Input
                    value={value?.fileName}
                    type="file"
                    {...field}
                    onChange={(e) => onChange(e.target.files?.[0])}
                  ></Input>
                )}
              ></Controller>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-center py-3">
            <p className="font-medium">Already Logged in ? </p>
            <Link href="/login" className="text-sky-700 font-bold">
              Login
            </Link>
          </div>
          <div className="pt-2 w-96 mx-auto">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? <AuthLoading /> : "Sign Up"}
            </Button>
          </div>
        </EBForm>
      </div>
    </div>
  );
};

export default SignUp;
