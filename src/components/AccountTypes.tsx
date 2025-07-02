"use client";

import { motion } from "framer-motion";
import { PiggyBank, Wallet, Briefcase, CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Assuming this hook is defined elsewhere, e.g., in "@/redux/api/multipleApi"
// Make sure your actual useGetAccountTypesQuery hook is correctly imported and configured.
import { useGetAccountTypesQuery } from "@/redux/api/multipleApi";

interface AccountType {
  _id: string;
  type: string;
  description: string;
  features: string[];
  updatedAt?: string;
}

// Helper to get the appropriate icon based on account type
const getAccountIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "savings":
      return PiggyBank;
    case "current": // Assuming 'Current' might be a type, even if JSON says 'Savings'
    case "checking":
      return Wallet;
    case "business":
      return Briefcase;
    default:
      return Wallet; // Default icon
  }
};

import type { Variants } from "framer-motion";

const cardVariants: Variants = {
  hidden: { y: 75, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const, // ✅ fix
      stiffness: 120,
      damping: 15,
      duration: 0.6,
    },
  },
  hover: {
    scale: 1.03,
    y: -8,
    boxShadow: "0px 12px 35px rgba(16, 64, 66, 0.25)",
    transition: {
      type: "spring" as const, // ✅ fix
      stiffness: 300,
      damping: 15,
    },
  },
};

const featureListVariants = {
  visible: {
    transition: {
      staggerChildren: 0.04, // Slightly faster stagger for features
    },
  },
};

const featureVariants: Variants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 250,
      damping: 25,
    },
  },
};

const AccountTypes = () => {
  const { data: accountTypes, isLoading } = useGetAccountTypesQuery(undefined);
  const types = accountTypes?.data;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#104042]">
          Our Account Offerings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              className="h-full flex flex-col p-5 border-2 border-gray-100 rounded-2xl shadow-md"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center mb-3">
                  <div className="p-2 rounded-full bg-gray-200 animate-pulse mr-3 h-12 w-12"></div>
                  <div className="h-7 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full mb-1 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between pt-3">
                <ul className="space-y-2 mb-6">
                  {[1, 2, 3, 4].map((j) => (
                    <li key={j} className="flex items-start">
                      <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse mr-2 flex-shrink-0"></div>
                      <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    </li>
                  ))}
                </ul>
                <div className="h-10 bg-gray-200 rounded-lg w-full animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl lg:text-5xl font-extrabold text-center mb-16 text-slate-900"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }} // Animate heading on scroll
          viewport={{ once: true, amount: 0.5 }} // Only animate once when 50% in view
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="bg-gradient-to-r from-[#104042] to-[#0d3335] bg-clip-text text-transparent">
            Discover Your Perfect Account
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {types?.map((account: AccountType, index: number) => {
            const Icon = getAccountIcon(account.type);
            return (
              <motion.div
                key={account._id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible" // Animate card on scroll
                whileHover="hover"
                viewport={{ once: true, amount: 0.4 }} // Animate once when 40% in view
                custom={index} // Pass index for staggered animation if needed (though staggerChildren handles it)
              >
                <Card className="h-full flex flex-col p-5 border-2 border-gray-100 hover:border-[#104042]/30 transition-all duration-300 rounded-2xl shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="flex items-center mb-3">
                      <motion.div
                        className="p-2 rounded-full bg-[#104042]/10 text-[#104042] mr-3"
                        whileHover={{ scale: 1.1 }} // Icon animation on hover
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <Icon className="h-7 w-7" />
                      </motion.div>
                      <CardTitle className="text-2xl font-bold text-slate-900">
                        {account.type}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-sm text-slate-600 leading-relaxed">
                      {account.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between pt-3">
                    <motion.ul
                      className="space-y-2 mb-6"
                      variants={featureListVariants}
                    >
                      {account.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          className="flex items-start text-sm text-slate-700"
                          variants={featureVariants}
                        >
                          <CheckCircle className="h-4 w-4 text-[#104042] mr-2 flex-shrink-0 mt-1" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                    <Button
                      className="w-full bg-[#104042] hover:bg-[#0d3335] text-white py-2.5 text-base font-semibold rounded-lg transition-colors duration-300"
                      size="lg"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AccountTypes;
