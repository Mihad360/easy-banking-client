"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getUser } from "@/services/authServices";
import { navRoutes } from "@/utils/routes";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  CreditCard,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { JwtPayload } from "@/types/common.type";
import { removeCookie } from "@/utils/deleteCookie";
import { removeFromLocalStorage } from "@/utils/local-storage";

const Navbar = () => {
  const [user, setUser] = useState<JwtPayload | null>(null);
  // console.log(user);
  useEffect(() => {
    setUser(getUser() as JwtPayload);
  }, []);
  const [isOpen, setIsOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
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
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const logoVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  const handleSignOut = async () => {
    await removeCookie("accessToken", "refreshToken");
    removeFromLocalStorage("accessToken");
    window.location.href = "/";
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className="flex items-center gap-3"
          >
            <motion.div variants={logoVariants} className="relative">
              <Image
                src="https://i.ibb.co/S4tfrcxP/c4802a9c-12a1-4281-88bb-ee49e81e814c.jpg"
                alt="Easy Bank Logo"
                width={40}
                height={40}
                className="w-14 h-12 rounded-xl"
                priority
              />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-pink-800 bg-clip-text text-transparent">
                Easy <span className="text-pink-600">Bank</span>
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Secure Banking</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            variants={itemVariants}
            className="hidden md:flex items-center space-x-8"
          >
            {navRoutes?.map((route, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={route.path}
                  className="relative text-gray-700 hover:text-pink-600 transition-colors duration-200 group py-2 font-bold"
                >
                  {route.label}
                  <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-pink-800 rounded-full transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Desktop Auth Section */}
          <motion.div
            variants={itemVariants}
            className="hidden md:flex items-center gap-4"
          >
            {!user ? (
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/login" className="text-pink-600 font-bold group relative py-2">
                    Login
                    <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-pink-800 rounded-full transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Avatar>
                    <AvatarImage src="https://i.ibb.co/YBF0wVrJ/profile-icon-design-free-vector-removebg-preview.png" />
                  </Avatar>
                </motion.div>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2"
                    >
                      <Avatar className="w-9 h-9 border-2 border-pink-200">
                        <AvatarImage
                          src={user?.profilePhotoUrl || "/placeholder.svg"}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-pink-500 to-pink-600 text-white font-semibold">
                          {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </motion.div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2">
                  <DropdownMenuLabel className="font-semibold">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href={`/dashboard/${user?.role}/my-account`}>
                      <User className="w-4 h-4 mr-2" />
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href={`/dashboard/${user?.role}/cards`}>
                      <CreditCard className="w-4 h-4 mr-2" />
                      My Cards
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <button className="cursor-pointer flex items-center gap-2">
                      <LogOut className="w-4 h-4 mr-2 text-red-600" />
                      Sign Out
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div variants={itemVariants} className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="w-6 h-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="w-6 h-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="p-6 border-b bg-gradient-to-r from-pink-50 to-pink-100">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="Easy Bank Logo"
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-lg shadow-md"
                      />
                      <div>
                        <h2 className="font-bold text-lg text-gray-900">
                          Easy Bank
                        </h2>
                        <p className="text-xs text-gray-600">Secure Banking</p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 p-6">
                    <nav className="space-y-4">
                      {navRoutes?.map((route, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link
                            href={route.path}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center py-3 px-4 rounded-lg hover:bg-pink-50 text-gray-700 hover:text-pink-600 font-medium transition-colors duration-200"
                          >
                            {route.label}
                          </Link>
                        </motion.div>
                      ))}
                    </nav>
                  </div>

                  {/* Mobile Auth Section */}
                  <div className="p-6 border-t bg-gray-50">
                    {!user ? (
                      <div className="space-y-3">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link href="/login" onClick={() => setIsOpen(false)}>
                            <Button variant="outline" className="w-full">
                              Login
                            </Button>
                          </Link>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link href="/signup" onClick={() => setIsOpen(false)}>
                            <Button className="w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800">
                              Get Started
                            </Button>
                          </Link>
                        </motion.div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                          <Avatar className="w-10 h-10 border-2 border-pink-200">
                            <AvatarImage
                              src={user?.profilePhotoUrl || "/placeholder.svg"}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-pink-500 to-pink-600 text-white">
                              {user?.name?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">
                              {user?.name || "User"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              variant="ghost"
                              className="w-full justify-start"
                            >
                              <User className="w-4 h-4 mr-2" />
                              Profile
                            </Button>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              variant="ghost"
                              className="w-full justify-start"
                            >
                              <CreditCard className="w-4 h-4 mr-2" />
                              My Cards
                            </Button>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              variant="ghost"
                              className="w-full justify-start"
                            >
                              <Settings className="w-4 h-4 mr-2" />
                              Settings
                            </Button>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50"
                            >
                              <LogOut className="w-4 h-4 mr-2" />
                              Sign Out
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
