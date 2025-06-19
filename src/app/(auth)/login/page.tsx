"use client";
import { motion } from "framer-motion";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { TGlobalResponse } from "@/types/global.type";
import { Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import EBForm from "@/shared/form/EBForm";
import EBInput from "@/shared/form/EBInput";
import { Button } from "@/components/ui/button";
import AuthLoading from "@/shared/loader/AuthLoading";
import Link from "next/link";
import { Key, Mail } from "lucide-react";
import { setToLocalStorage } from "@/utils/local-storage";

const Login = () => {
  const router = useRouter();
  const [loginUser, { isLoading }] = useLoginUserMutation();

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

  const pulseVariants: Variants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Floating background elements */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-pink-200/30 rounded-full blur-xl"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-20 right-20 w-40 h-40 bg-purple-200/30 rounded-full blur-xl"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
      />
      <motion.div
        className="absolute top-1/2 left-10 w-24 h-24 bg-pink-200/30 rounded-full blur-xl"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
      />

      <motion.div className="flex relative z-10" variants={containerVariants}>
        <motion.div
          className="w-full max-w-md p-8 bg-white/80 dark:bg-gray-900/80 rounded-l-2xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
          variants={cardVariants}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <motion.h1
              className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Sign in to your account
            </motion.h1>
          </motion.div>

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
                    className="cursor-pointer w-full py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
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
          className="w-[450px] bg-gradient-to-br from-pink-600 to-pink-700 rounded-r-2xl relative overflow-hidden"
          variants={rightPanelVariants}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <motion.div
            className="text-center pt-10 px-8 relative z-10"
            variants={containerVariants}
          >
            <motion.div className="mb-6" variants={itemVariants}>
              <motion.div
                className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <div className="w-8 h-8 bg-white rounded-full"></div>
              </motion.div>
            </motion.div>

            <motion.h1
              className="text-2xl font-bold text-white mb-3"
              variants={itemVariants}
              animate={{
                textShadow: [
                  "0 0 10px rgba(255,255,255,0.5)",
                  "0 0 20px rgba(255,255,255,0.8)",
                  "0 0 10px rgba(255,255,255,0.5)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              Welcome to Easy Bank
            </motion.h1>

            <motion.div
              className="text-white/90 mb-8 space-y-3"
              variants={itemVariants}
            >
              <p className="text-lg font-medium">
                Your Trusted Financial Partner
              </p>
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
                  className="inline-flex items-center px-6 py-2 border-2 border-white/80 rounded-full text-white font-medium transition-all duration-300 hover:bg-white hover:text-pink-600 hover:shadow-lg backdrop-blur-sm"
                >
                  Create Account
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Floating elements in right panel */}
          <motion.div
            className="absolute top-10 right-10 w-4 h-4 bg-white/20 rounded-full"
            variants={pulseVariants}
            animate="animate"
          />
          <motion.div
            className="absolute bottom-10 left-10 w-6 h-6 bg-white/20 rounded-full"
            variants={pulseVariants}
            animate="animate"
            style={{ animationDelay: "1s" }}
          />
          <motion.div
            className="absolute top-1/3 right-20 w-3 h-3 bg-white/15 rounded-full"
            variants={pulseVariants}
            animate="animate"
            style={{ animationDelay: "2s" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
