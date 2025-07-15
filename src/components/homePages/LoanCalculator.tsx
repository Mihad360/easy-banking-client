"use client";
import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calculator, TrendingUp } from "lucide-react";
import { TbCoinTakaFilled } from "react-icons/tb";

export default function LoanCalculator() {
  const [amount, setAmount] = useState("");
  const interestRate = 0.05;
  const loan = Number(amount);
  const interest = loan * interestRate;
  const total = loan + interest;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const handleButtonClick = (value: string) => {
    if (value === "C") {
      setAmount("");
    } else if (value === "←") {
      setAmount((prev) => prev.slice(0, -1));
    } else {
      setAmount((prev) => prev + value);
    }
  };

  const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "←"];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  const displayVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="py-12 px-4">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center justify-center w-16 h-16 bg-[#104042] rounded-full mb-4"
          >
            <Calculator className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-[#104042] mb-2">
            Loan Calculator
          </h1>
          <p className="text-gray-600">
            Calculate your loan interest instantly
          </p>
        </motion.div>

        {/* Main Calculator Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row"
        >
          {/* Left Side: Display & Calculator */}
          <div className="w-[50%] p-6 border-b md:border-b-0 md:border-r border-gray-100">
            {/* Display */}
            <motion.div
              variants={displayVariants}
              className="bg-gradient-to-r from-[#104042] to-[#1a5a5d] p-6 rounded-xl mb-6"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 text-sm font-medium">
                  Loan Amount
                </span>
                <TbCoinTakaFilled className="w-5 h-5 text-white/80" />
              </div>
              <motion.div
                key={amount}
                initial={{ scale: 1.1, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-right text-3xl font-bold text-white"
              >
                ৳{amount || "0"}
              </motion.div>
            </motion.div>

            {/* Button Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-3"
            >
              {buttons.map((btn, index) => (
                <motion.button
                  key={btn}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => handleButtonClick(btn)}
                  className={`
            h-14 rounded-xl cursor-pointer font-semibold text-lg transition-all duration-200
            ${
              btn === "C" || btn === "←"
                ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                : "bg-[#104042]/5 text-[#104042] hover:bg-[#104042]/10 border border-[#104042]/20"
            }
            shadow-sm hover:shadow-md
          `}
                  style={{
                    animationDelay: `${index * 0.05}s`,
                  }}
                >
                  {btn}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Right Side: Results */}
          <div className="md:w-1/2 p-6 flex flex-col justify-center">
            
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-between p-4 bg-blue-50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-700">
                    Interest (5%)
                  </span>
                </div>
                <span className="font-bold text-blue-600">
                  ৳{Math.ceil(interest)}
                </span>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-between p-4 bg-[#104042]/5 rounded-xl border border-[#104042]/20"
              >
                <div className="flex items-center gap-3">
                  <TbCoinTakaFilled className="text-2xl text-[#104042]" />
                  <span className="font-medium text-gray-700">
                    Total Payable
                  </span>
                </div>
                <span className="font-bold text-[#104042] text-lg">
                  ৳{Math.ceil(total)}
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-8 text-gray-500 text-sm"
        >
          <p>Interest rate: 5% per annum</p>
          <p className="mt-1">Enter amount to see calculations</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
