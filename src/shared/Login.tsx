"use client";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import type { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";
import { Key, Mail, Shield, Banknote, TrendingUp, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { TGlobalResponse } from "@/types/global.type";
import { setToLocalStorage } from "@/utils/local-storage";
import EBInput from "./form/EBInput";
import EBForm from "./form/EBForm";
import { Button } from "@/components/ui/button";
import AuthLoading from "./loader/AuthLoading";
import { saveCookie } from "@/utils/saveCookie/saveCookie";

const Login = () => {
  const router = useRouter();
  const [session, setSession] = useState("");
  const searchParams = useSearchParams();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  useEffect(() => {
    const sessionStatus = searchParams?.get("session");
    if (sessionStatus === "expired") {
      setSession(sessionStatus);
    }
  }, [searchParams]);

  const onSubmit = async (data: FieldValues) => {
    try {
      const userData = {
        email: data.email,
        password: data.password,
      };
      const res = (await loginUser(userData)) as TGlobalResponse;
      console.log(res);
      if (res?.data?.data?.accessToken) {
        setToLocalStorage("accessToken", res?.data?.data?.accessToken);
        await saveCookie(
          res?.data?.data?.accessToken,
          res?.data?.data?.refreshToken
        );
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

  // Animation variants with proper typing
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
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic bezier
      },
    },
  };

  const rightPanelVariants: Variants = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic bezier
        delay: 0.2,
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
        className="absolute top-10 left-10 w-20 h-20 border-4 border-[#104042]/20 rounded-full"
        variants={rotateVariants}
        animate="animate"
      />
      <motion.div
        className="absolute top-32 right-20 w-16 h-16 bg-[#104042]/10 transform rotate-45"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-20 left-32 w-12 h-12 bg-[#104042]/15 rounded-full"
        variants={pulseVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-40 right-10 w-24 h-24 border-2 border-[#104042]/20 transform rotate-12"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
      />
      <motion.div
        className="absolute top-1/2 left-5 w-8 h-8 bg-[#104042]/20 transform rotate-45"
        variants={rotateVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
      />

      <motion.div className="flex relative z-10" variants={containerVariants}>
        <motion.div
          className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-l-2xl border-r border-[#104042]/10 shadow-xl"
          variants={cardVariants}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgba(16, 64, 66, 0.25)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <motion.div
              className="w-16 h-16 bg-[#104042] rounded-2xl flex items-center justify-center mx-auto mb-4 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Lock className="w-8 h-8 text-white" />
              <motion.div
                className="absolute inset-0 bg-white/20"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <motion.h1
              className="text-3xl font-bold text-[#104042] dark:text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Sign in to your account
            </motion.h1>
            <motion.p
              className="text-gray-600 dark:text-gray-300 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Welcome back to Easy Bank
            </motion.p>
          </motion.div>

          <div>
            {session === "expired" ? (
              <p className="text-red-500 font-medium py-3">
                Your session has expired. Please log in again!
              </p>
            ) : (
              ""
            )}
          </div>

          <motion.div variants={itemVariants}>
            <EBForm onSubmit={onSubmit}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <EBInput
                  label="Email"
                  name="email"
                  type="email"
                  icon={<Mail />}
                  placeholder="Enter your email"
                  className="mb-3"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <EBInput
                  label="Password"
                  name="password"
                  type="password"
                  icon={<Key />}
                  placeholder="Enter your valid password ..."
                />
              </motion.div>

              <motion.div
                className="pt-2"
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
                    className="cursor-pointer w-full py-3 bg-[#104042] hover:bg-[#0d353a] text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? <AuthLoading /> : "Login"}
                  </Button>
                </motion.div>
              </motion.div>
            </EBForm>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-[450px] bg-[#104042] rounded-r-2xl relative overflow-hidden"
          variants={rightPanelVariants}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgba(16, 64, 66, 0.4)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Geometric pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
            <div className="absolute top-20 right-20 w-24 h-24 border border-white transform rotate-45"></div>
            <div className="absolute bottom-20 left-20 w-20 h-20 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-32 right-10 w-16 h-16 border border-white transform rotate-12"></div>
          </div>

          <motion.div
            className="text-center pt-10 px-8 relative z-10"
            variants={containerVariants}
          >
            <motion.div className="mb-6" variants={itemVariants}>
              <motion.div
                className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-4 relative"
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Banknote className="w-10 h-10 text-white" />
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
            </motion.div>

            <motion.h1
              className="text-3xl font-bold text-white mb-2"
              variants={itemVariants}
            >
              Welcome to Easy Bank
            </motion.h1>

            <motion.div
              className="text-white/90 mb-3 space-y-3"
              variants={itemVariants}
            >
              <p className="text-lg font-medium">
                Your Trusted Financial Partner
              </p>

              <div className="flex justify-center space-x-6 mt-6">
                <motion.div
                  className="flex flex-col items-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-white/80">Secure</span>
                </motion.div>

                <motion.div
                  className="flex flex-col items-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-white/80">Growth</span>
                </motion.div>

                <motion.div
                  className="flex flex-col items-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                    <Banknote className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-white/80">Banking</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.p className="text-white/80 font-medium mb-4">
                Don&apos;t have an account yet?
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href="/signup"
                  className="inline-flex items-center px-6 py-2 border-2 border-white/80 rounded-xl text-white font-medium transition-all duration-300 hover:bg-white hover:text-[#104042] hover:shadow-lg backdrop-blur-sm"
                >
                  Create Account
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Floating geometric elements in right panel */}
          <motion.div
            className="absolute top-16 right-12 w-6 h-6 border-2 border-white/30 rounded-full"
            variants={pulseVariants}
            animate="animate"
          />
          <motion.div
            className="absolute bottom-16 left-12 w-8 h-8 border border-white/20 transform rotate-45"
            variants={rotateVariants}
            animate="animate"
            style={{ animationDelay: "1s" }}
          />
          <motion.div
            className="absolute top-1/3 right-24 w-4 h-4 bg-white/20 rounded-full"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: "2s" }}
          />
          <motion.div
            className="absolute bottom-1/3 left-16 w-5 h-5 border border-white/25 rounded-full"
            variants={pulseVariants}
            animate="animate"
            style={{ animationDelay: "1.5s" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
