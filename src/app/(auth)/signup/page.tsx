"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignupUserMutation } from "@/redux/api/authApi";
import EBForm from "@/shared/form/EBForm";
import EBInput from "@/shared/form/EBInput";
import AuthLoading from "@/shared/loader/AuthLoading";
import { setToLocalStorage } from "@/utils/local-storage";
import {
  FolderPen,
  Key,
  Mail,
  Phone,
  PictureInPicture,
  UserPlus,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, type FieldValues } from "react-hook-form";
import { toast } from "sonner";
import type { Variants } from "framer-motion";

const SignUp = () => {
  const [signupUser, { isLoading }] = useSignupUserMutation();
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    const { profilePhotoUrl, ...rest } = data;
    const formData = new FormData();
    const userData = {
      ...rest,
    };
    formData.append("data", JSON.stringify(userData));
    formData.append("file", profilePhotoUrl);
    const res = await signupUser(formData);
    if (res?.data?.success) {
      setToLocalStorage("email", res?.data?.data?.email);
      router.push("/verify-otp");
      toast.success("OTP sent to your Email", { duration: 3000 });
    } else {
      toast.error("Something went wrong");
    }
    console.log(res);
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  const rotateVariants: Variants = {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  };

  const pulseVariants: Variants = {
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-gray-900 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Geometric background shapes */}
      <motion.div
        className="absolute top-10 left-10 w-24 h-24 border-4 border-[#104042]/20 rounded-full"
        variants={rotateVariants}
        animate="animate"
      />
      <motion.div
        className="absolute top-20 right-20 w-20 h-20 bg-[#104042]/10 transform rotate-45"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-20 left-20 w-16 h-16 bg-[#104042]/15 rounded-full"
        variants={pulseVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-32 right-32 w-28 h-28 border-2 border-[#104042]/20 transform rotate-12"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
      />
      <motion.div
        className="absolute top-1/3 left-5 w-12 h-12 bg-[#104042]/20 transform rotate-45"
        variants={rotateVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
      />
      <motion.div
        className="absolute top-1/2 right-5 w-10 h-10 border-2 border-[#104042]/25 rounded-full"
        variants={pulseVariants}
        animate="animate"
        style={{ animationDelay: "1.5s" }}
      />

      <motion.div
        className="w-full max-w-[900px] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl relative z-10 overflow-hidden"
        variants={cardVariants}
        whileHover={{
          scale: 1.01,
          boxShadow: "0 25px 50px -12px rgba(16, 64, 66, 0.25)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header Section */}
        <motion.div
          className="bg-[#104042] px-8 pt-6 pb-2 relative overflow-hidden"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Geometric pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 left-10 w-16 h-16 border border-white rounded-full"></div>
            <div className="absolute top-4 right-20 w-12 h-12 border border-white transform rotate-45"></div>
            <div className="absolute bottom-2 left-32 w-8 h-8 border border-white rounded-full"></div>
            <div className="absolute bottom-4 right-10 w-10 h-10 border border-white transform rotate-12"></div>
          </div>

          <div className="text-center relative z-10 flex gap-3 items-center justify-center">
            <motion.div
              className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mb-4 relative"
              animate={{
                rotateY: [0, 360],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <UserPlus className="w-10 h-10 text-white" />
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Shield className="w-3 h-3 text-[#104042]" />
              </motion.div>
            </motion.div>
            <motion.h1
              className="text-3xl font-bold text-white mb-2"
              variants={itemVariants}
            >
              Create Your Account
            </motion.h1>
          </div>
        </motion.div>

        {/* Form Section */}
        <motion.div className="p-8" variants={containerVariants}>
          <EBForm onSubmit={onSubmit}>
            <motion.div
              className="flex gap-10 justify-center"
              variants={containerVariants}
            >
              {/* Left Column */}
              <motion.div className="space-y-4" variants={itemVariants}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <EBInput
                    label="First Name"
                    name="name.firstName"
                    type="text"
                    icon={<FolderPen />}
                    placeholder="Enter your First Name"
                    size={40}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <EBInput
                    label="Email"
                    name="email"
                    type="email"
                    icon={<Mail />}
                    placeholder="Enter your verified email"
                    size={40}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <EBInput
                    label="Password"
                    name="password"
                    type="password"
                    icon={<Key />}
                    placeholder="Enter your valid password ..."
                    size={40}
                  />
                </motion.div>
              </motion.div>

              {/* Right Column */}
              <motion.div className="space-y-4" variants={itemVariants}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <EBInput
                    label="Last Name"
                    name="name.lastName"
                    type="text"
                    icon={<FolderPen />}
                    placeholder="Enter your Last Name"
                    size={40}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <EBInput
                    label="Phone Number"
                    name="phoneNumber"
                    type="text"
                    icon={<Phone />}
                    placeholder="Enter your Phone Number"
                    size={40}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 pb-1">
                      <div className="w-8 h-8 bg-[#104042]/10 rounded-lg flex items-center justify-center">
                        <PictureInPicture className="w-4 h-4 text-[#104042]" />
                      </div>
                      <Label className="text-[#104042] font-medium">
                        Profile Photo
                      </Label>
                    </div>
                    <Controller
                      name="profilePhotoUrl"
                      render={({ field: { onChange, value, ...field } }) => (
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Input
                            value={value?.fileName}
                            type="file"
                            {...field}
                            onChange={(e) => onChange(e.target.files?.[0])}
                            className="border-[#104042]/20 focus:border-[#104042] focus:ring-[#104042]/20 rounded-lg"
                          />
                        </motion.div>
                      )}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Login Link */}
            <motion.div
              className="flex items-center gap-2 justify-center py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <p className="font-medium text-gray-600 dark:text-gray-300">
                Already have an account?
              </p>
              <Link
                href="/login"
                className="text-[#104042] font-bold hover:text-[#0d353a] transition-colors duration-200"
              >
                Login
              </Link>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              className="pt-2 w-96 mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="cursor-pointer w-full py-3 bg-[#104042] hover:bg-[#0d353a] text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                >
                  {isLoading ? (
                    <AuthLoading />
                  ) : (
                    <>
                      <span className="relative z-10">Create Account</span>
                      <motion.div
                        className="absolute inset-0 bg-white/10"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </EBForm>
        </motion.div>

        {/* Floating geometric elements */}
        <motion.div
          className="absolute top-32 right-8 w-4 h-4 border-2 border-[#104042]/20 rounded-full"
          variants={pulseVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-32 left-8 w-6 h-6 border border-[#104042]/15 transform rotate-45"
          variants={rotateVariants}
          animate="animate"
          style={{ animationDelay: "1s" }}
        />
        <motion.div
          className="absolute top-1/2 right-4 w-3 h-3 bg-[#104042]/20 rounded-full"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default SignUp;
