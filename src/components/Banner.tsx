"use client";

import { motion } from "framer-motion";

import {
  ArrowRight,
  CreditCard,
  Send,
  Download,
  DollarSign,
  Star,
  Users,
  Shield,
  Zap,
  TrendingUp,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Banner = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const phoneVariants = {
    hidden: { x: 100, opacity: 0, rotate: 10 },
    visible: {
      x: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const activities = [
    {
      icon: Download,
      name: "Instant Deposit",
      amount: "+$2,350.00",
      time: "2 minutes ago",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50/80",
    },
    {
      icon: Send,
      name: "Quick Transfer",
      amount: "-$850.00",
      time: "1 hour ago",
      color: "text-blue-600",
      bgColor: "bg-blue-50/80",
    },
    {
      icon: CreditCard,
      name: "Smart Loan",
      amount: "+$5,000.00",
      time: "Today, 2:30 PM",
      color: "text-purple-600",
      bgColor: "bg-purple-50/80",
    },
    {
      icon: DollarSign,
      name: "ATM Withdrawal",
      amount: "-$200.00",
      time: "Yesterday",
      color: "text-orange-600",
      bgColor: "bg-orange-50/80",
    },
  ];

  return (
    <div className="relative overflow-hidden pt-16">
      {/* Enhanced Transparent Background */}
      <div className="absolute inset-0">
        {/* Multiple Gradient Overlays for Better Transparency */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-[#104042]/3 via-transparent to-[#104042]/5"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-white/20 via-transparent to-slate-100/30"></div> */}
        {/* Enhanced Glass Morphism Elements - Subtle Animations */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-[#104042]/8 via-[#104042]/4 to-transparent rounded-full blur-3xl backdrop-blur-sm"
          animate={{
            y: [-20, 20, -20], // Subtle vertical movement
            opacity: [0.1, 0.3, 0.1], // Subtle opacity change
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-[#104042]/10 via-[#104042]/5 to-transparent rounded-full blur-3xl backdrop-blur-sm"
          animate={{
            y: [20, -20, 20], // Subtle vertical movement
            opacity: [0.3, 0.1, 0.3], // Subtle opacity change
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        {/* Additional Floating Glass Elements - More Subtle */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-white/10 to-[#104042]/5 rounded-full blur-2xl backdrop-blur-sm"
          animate={{
            scale: [1, 1.05, 1], // Even more subtle scale
            opacity: [0.05, 0.15, 0.05], // Even more subtle opacity
          }}
          transition={{
            duration: 18, // Slower
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        {/* New: Subtle transparent primary color elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 h-48 bg-[#104042]/5 rounded-full blur-xl backdrop-blur-sm"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-[#104042]/8 rounded-full blur-2xl backdrop-blur-sm"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 22,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        {/* Subtle Transparent Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #104042 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>
      <div className="container mx-auto px-6 py-16 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center min-h-screen"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content - Enhanced Transparency */}
          <div className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-8">
              <motion.div
                className="inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-2 h-2 bg-[#104042] rounded-full animate-pulse"></div>
                <span className="bg-white/40 backdrop-blur-md border border-white/30 text-[#104042] px-6 py-3 rounded-full text-sm font-semibold tracking-wide shadow-lg">
                  ENTERPRISE FINANCIAL PLATFORM
                </span>
              </motion.div>
              <motion.h1
                className="text-4xl lg:text-6xl font-bold leading-[0.9]"
                variants={itemVariants}
              >
                <span className="bg-gradient-to-r from-[#104042] via-[#0d3335] to-[#104042] bg-clip-text text-transparent">
                  The Future of
                </span>
                <br />
                <span className="text-slate-900">Digital Banking</span>
                <motion.span
                  className="text-[#104042] text-6xl"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  .
                </motion.span>
              </motion.h1>
              <motion.p
                className="text-lg text-slate-600 leading-relaxed max-w-2xl font-medium"
                variants={itemVariants}
              >
                Experience seamless banking with our comprehensive platform.
                <span className="text-[#104042] font-semibold">
                  {" "}
                  Deposit, Withdraw, Transfer & Secure Loans
                </span>{" "}
                - all powered by enterprise-grade security and lightning-fast
                processing.
              </motion.p>
            </motion.div>
            {/* Enhanced CTA Section with Glass Effect */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 items-start"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#104042] to-[#0d3335] hover:from-[#0d3335] hover:to-[#104042] text-white px-10 py-6 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-[#104042]/25 transition-all duration-300 border-0 backdrop-blur-sm"
                >
                  Start Your Journey
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/40 text-[#104042] hover:bg-white/20 hover:border-white/60 px-10 py-6 rounded-2xl text-lg font-bold transition-all duration-300 bg-white/20 backdrop-blur-md shadow-lg"
                >
                  Schedule Demo
                </Button>
              </motion.div>
            </motion.div>
            {/* Enhanced Stats with Glass Effect */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-white/30"
            >
              {[
                { value: "99.9%", label: "Uptime", icon: Shield },
                { value: "500K+", label: "Active Users", icon: Users },
                { value: "4.9", label: "App Rating", icon: Star },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group cursor-pointer p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="h-5 w-5 text-[#104042] mr-2" />
                    <div className="text-3xl font-bold text-[#104042]">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-sm text-slate-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          {/* Right Content - Enhanced Glass Design */}
          <div className="relative flex justify-center lg:justify-end items-center">
            {/* Enhanced Activities Card with Better Transparency (No Floating) */}
            <motion.div
              variants={itemVariants} // Use itemVariants for initial entrance
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block"
            >
              <Card className="w-96 p-8 bg-white/30 backdrop-blur-xl shadow-2xl border border-white/30 rounded-3xl">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Transaction History
                    </h3>
                    <p className="text-sm text-slate-600">Recent activities</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#104042] hover:text-[#104042]/80 hover:bg-white/20 rounded-xl backdrop-blur-sm"
                  >
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/40 transition-all duration-300 group cursor-pointer backdrop-blur-sm border border-white/20"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div
                        className={`p-3 rounded-2xl ${activity.bgColor} backdrop-blur-sm group-hover:scale-110 transition-transform`}
                      >
                        <activity.icon
                          className={`h-6 w-6 ${activity.color}`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-slate-900">
                          {activity.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          {activity.time}
                        </div>
                      </div>
                      <div className={`font-bold text-lg ${activity.color}`}>
                        {activity.amount}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
            {/* Enhanced Phone Mockup - Adjusted z-index */}
            <motion.div
              variants={phoneVariants}
              className="relative w-full max-w-xs sm:max-w-sm lg:max-w-sm mx-auto lg:ml-auto lg:mr-0" // Increased z-index
            >
              <motion.div animate="animate" className="relative">
                <div className="relative mx-auto w-full h-[500px] sm:h-[650px] bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-[3.5rem] p-3 shadow-2xl backdrop-blur-sm">
                  <div className="w-full h-full bg-gradient-to-br from-white/95 to-slate-50/90 rounded-[3rem] overflow-hidden relative backdrop-blur-md">
                    {/* Enhanced Phone Screen Content */}
                    <div className="absolute inset-0">
                      <div className="p-8 space-y-8">
                        {/* Enhanced Balance Card */}
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 1 }}
                          className="bg-gradient-to-br from-[#104042] via-[#0d3335] to-[#104042] rounded-3xl p-8 text-white relative overflow-hidden backdrop-blur-sm"
                        >
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 backdrop-blur-sm"></div>
                          <div className="relative z-10">
                            <div className="text-sm opacity-80 mb-2">
                              Available Balance
                            </div>
                            <div className="text-4xl font-bold mb-1">
                              $127,588
                            </div>
                            <div className="text-sm opacity-80 flex items-center gap-2">
                              <TrendingUp className="h-4 w-4" />
                              +12.5% this month
                            </div>
                          </div>
                        </motion.div>
                        {/* Enhanced Quick Actions */}
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 1.2 }}
                          className="grid grid-cols-2 gap-4"
                        >
                          {[
                            {
                              icon: Download,
                              label: "Deposit",
                              color: "from-emerald-500 to-emerald-600",
                              textColor: "text-emerald-600",
                            },
                            {
                              icon: Send,
                              label: "Transfer",
                              color: "from-blue-500 to-blue-600",
                              textColor: "text-blue-600",
                            },
                            {
                              icon: CreditCard,
                              label: "Loans",
                              color: "from-purple-500 to-purple-600",
                              textColor: "text-purple-600",
                            },
                            {
                              icon: DollarSign,
                              label: "Withdraw",
                              color: "from-orange-500 to-orange-600",
                              textColor: "text-orange-600",
                            },
                          ].map((action, index) => (
                            <motion.div
                              key={index}
                              whileHover={{ scale: 1.05 }}
                              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/40 hover:shadow-xl hover:bg-white/90 transition-all duration-300"
                            >
                              <div
                                className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mx-auto mb-3`}
                              >
                                <action.icon className="h-6 w-6 text-white" />
                              </div>
                              <div
                                className={`text-sm font-bold ${action.textColor}`}
                              >
                                {action.label}
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                        {/* Enhanced Features List */}
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 1.4 }}
                          className="space-y-4"
                        >
                          {[
                            {
                              icon: Zap,
                              text: "Instant Processing",
                              color: "text-yellow-600",
                            },
                            {
                              icon: Lock,
                              text: "Military-Grade Security",
                              color: "text-green-600",
                            },
                            {
                              icon: TrendingUp,
                              text: "Smart Investment Tools",
                              color: "text-blue-600",
                            },
                          ].map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm border border-white/40 hover:bg-white/80 transition-all duration-300"
                            >
                              <feature.icon
                                className={`h-6 w-6 ${feature.color}`}
                              />
                              <span className="text-sm font-semibold text-slate-700">
                                {feature.text}
                              </span>
                            </div>
                          ))}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            {/* Enhanced Floating Badge (No Floating) */}
            <motion.div
              className="absolute -right-8 bottom-32 bg-white/40 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-2xl hidden lg:block z-20" // Ensure badge is also above background
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-[#104042] mb-2">
                  $2.5B+
                </div>
                <div className="text-slate-600 text-sm font-medium">
                  Transactions Processed
                </div>
                <div className="flex items-center justify-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
