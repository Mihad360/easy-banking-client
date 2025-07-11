/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreditCard, Wifi } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { JwtPayload } from "@/types/common.type";
import MyAccountDetails from "./MyAccountDetails";

const MyAccount = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  user,
  myAccount,
}: {
  user: JwtPayload;
  myAccount: any;
}) => {
  const { accountHolderName, accountNumber, balance, status, minimumBalance } =
    myAccount?.data;

  return (
    <div>
      <div className="flex gap-5 px-6">
        <div className="">
          <motion.div
            initial={{ opacity: 0, y: 100, rotateX: -15 }}
            animate={{
              opacity: 1,
              y: 0,
              rotateX: 0,
            }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              delay: 0.2,
            }}
            className="relative"
          >
            <motion.div
              className="w-[500px] h-72 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl shadow-2xl relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #104042 0%, #0d363a 50%, #0a2d30 100%)",
                // boxShadow:
                //   "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Background Geometric Shapes */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-8 right-8 w-20 h-20 border-2 border-white/20 rounded-full"></div>
                <div className="absolute top-12 right-12 w-12 h-12 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-16 left-8 w-16 h-16 bg-white/5 transform rotate-45"></div>
                <div className="absolute bottom-8 left-16 w-8 h-8 border border-white/15 transform rotate-45"></div>
                <div className="absolute top-1/2 left-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -rotate-12"></div>
              </div>

              {/* Card Content */}
              <div
                className="relative z-10 p-6 h-full flex flex-col justify-between text-white"
                style={{
                  textRendering: "optimizeLegibility",
                  WebkitFontSmoothing: "antialiased",
                }}
              >
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h1
                      className="text-2xl font-bold tracking-wide"
                      style={{ textRendering: "optimizeLegibility" }}
                    >
                      EasyBank
                    </h1>
                    <p className="text-sm opacity-90 mt-1 font-medium">
                      Bank Card
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className="text-lg font-semibold"
                      style={{ textRendering: "optimizeLegibility" }}
                    >
                      VISA
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Wifi className="w-5 h-5" />
                      <span className="text-xs font-medium">Contactless</span>
                    </div>
                  </div>
                </div>

                {/* Chip and Contactless */}
                <div className="flex items-center gap-4 my-4">
                  <div className="w-12 h-9 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md flex items-center justify-center shadow-lg">
                    <CreditCard className="w-6 h-6 text-yellow-800" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    className="flex gap-1"
                  >
                    <div className="w-4 h-3 bg-white/80 rounded-full"></div>
                    <div className="w-4 h-3 bg-white/60 rounded-full"></div>
                    <div className="w-4 h-3 bg-white/40 rounded-full"></div>
                  </motion.div>
                </div>

                {/* Card Number */}
                <div className="my-6">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="text-2xl font-mono tracking-widest font-bold"
                    style={{
                      textRendering: "optimizeLegibility",
                      WebkitFontSmoothing: "antialiased",
                    }}
                  >
                    {accountNumber}
                  </motion.p>
                </div>

                {/* Bottom Info */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-75 uppercase tracking-wide font-medium">
                      Cardholder Name
                    </p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2, duration: 0.8 }}
                      className="font-bold text-lg tracking-wide"
                      style={{
                        textRendering: "optimizeLegibility",
                        WebkitFontSmoothing: "antialiased",
                      }}
                    >
                      {accountHolderName}
                    </motion.p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-75 uppercase tracking-wide font-medium">
                      Expires
                    </p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.2, duration: 0.8 }}
                      className="font-bold text-lg font-mono"
                      style={{
                        textRendering: "optimizeLegibility",
                        WebkitFontSmoothing: "antialiased",
                      }}
                    >
                      12/28
                    </motion.p>
                  </div>
                </div>
              </div>

              {/* Shine Effect */}
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "100%", opacity: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
              />
            </motion.div>

            {/* Card Shadow */}
            <motion.div
              animate={{
                scale: [0.95, 1.05, 0.95],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute -bottom-4 left-4 right-4 h-8 bg-black/30 rounded-full blur-xl"
            />
          </motion.div>

          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="absolute top-20 left-20 w-32 h-32 border border-white/10 rounded-full"
            />
            <motion.div
              animate={{
                rotate: -360,
                scale: [1.1, 1, 1.1],
              }}
              transition={{
                duration: 25,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="absolute bottom-20 right-20 w-24 h-24 border border-white/5 rounded-full"
            />
          </div>
        </div>
        <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
              ৳
            </div>
            <div className="text-right">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  status === "active"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {status?.toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-600 mb-1">
              Current Balance
            </p>
            <p className="text-3xl font-bold text-slate-800 mb-2">
              BDT {balance}
            </p>
            <p className="text-sm text-slate-500">Available Balance</p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Minimum Balance:</span>
              <span className="font-medium">BDT {minimumBalance}</span>
            </div>
          </div>
        </div>
      </div>
      <MyAccountDetails myAccount={myAccount} />
    </div>
  );
};

export default MyAccount;
