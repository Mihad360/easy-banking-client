/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  User,
  CreditCard,
  Building2,
  DollarSign,
  LogOut,
  Settings,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useGetMyAccountQuery } from "@/redux/api/accountApi";
import { getUser } from "@/services/authServices";
import { JwtPayload } from "@/types/common.type";
import Loading from "../loading/Loading";

const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getUser() as JwtPayload);
  }, []);
  const { data: myAccount, isLoading } = useGetMyAccountQuery(undefined, {
    skip: !userData,
  });
  const user = myAccount?.data;
  //   console.log(user);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "suspended":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-14 sticky top-0 w-full z-50 backdrop-blur-lg bg-gray-200/40 border-b border-gray-200/50 shadow-sm"
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Left side - Welcome message */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center space-x-3"
        >
          <div className="text-lg font-semibold text-gray-800">
            Welcome,{" "}
            <span className="text-blue-600">{user?.accountHolderName}</span>
          </div>
        </motion.div>

        {/* Right side - User? dropdown */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-3 hover:bg-white/50 transition-colors duration-200"
              >
                <div className="relative">
                  {userData && userData?.profilePhotoUrl && (
                    <Image
                      src={userData?.profilePhotoUrl as string}
                      alt="image"
                      width={32}
                      height={32}
                      className="rounded-full ring-2 ring-blue-500/20"
                      priority
                    />
                  )}
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(
                      user?.status
                    )} rounded-full border-2 border-white`}
                  />
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-gray-900">
                    {user?.accountHolderName}
                  </div>
                  <div className="text-xs text-gray-500">{userData?.email}</div>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </motion.div>
              </Button>
            </DropdownMenuTrigger>

            <AnimatePresence>
              {isOpen && (
                <DropdownMenuContent
                  align="end"
                  className="w-80 p-0 overflow-hidden"
                  asChild
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div className="bg-white rounded-lg shadow-lg border">
                      {/* User? Info Header */}
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            {userData && userData?.profilePhotoUrl && (
                              <Image
                                src={userData?.profilePhotoUrl as string}
                                alt="image"
                                width={32}
                                height={32}
                                className="rounded-full ring-2 ring-blue-500/20"
                                priority
                              />
                            )}
                            <div
                              className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(
                                user?.status
                              )} rounded-full border-2 border-white`}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">
                              {user?.accountHolderName}
                            </div>
                            <div className="text-sm text-gray-600">
                              {userData?.email}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {userData?.role}
                              </Badge>
                              <Badge
                                variant={
                                  user?.status === "active"
                                    ? "default"
                                    : user?.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                                }
                                className="text-xs"
                              >
                                {user?.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Account Details */}
                      <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              Account
                            </span>
                          </div>
                          <span className="text-sm font-mono text-gray-900">
                            {user?.accountNumber}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Building2 className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              Branch
                            </span>
                          </div>
                          <span className="text-sm text-gray-900">
                            {user?.branch?.name}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              Balance
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-green-600">
                            {user?.balance} {user?.currency}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Type</span>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-xs capitalize"
                          >
                            {user?.accountType}
                          </Badge>
                        </div>
                      </div>

                      <DropdownMenuSeparator />

                      {/* Action Items */}
                      <div className="p-2">
                        <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer">
                          <Settings className="h-4 w-4" />
                          <span>Account Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer text-red-600 focus:text-red-600">
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </DropdownMenuItem>
                      </div>
                    </div>
                  </motion.div>
                </DropdownMenuContent>
              )}
            </AnimatePresence>
          </DropdownMenu>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardNavbar;
