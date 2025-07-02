"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { getUser } from "@/services/authServices";
import type { JwtPayload, SidebarRoutes } from "@/types/common.type";
import { adminRoutes, customerRoutes, managerRoutes } from "@/utils/sidebar";
import { useEffect, useState } from "react";
import { User, ChevronRight, Shield, Crown } from "lucide-react";
import { AnimatedContainer } from "@/utils/sidebarMotions/animatedContainer";
import { SlideInText } from "@/utils/sidebarMotions/slideInText";
import { AnimatedItem } from "@/utils/sidebarMotions/animatedItem";
import { AnimatedNavItem } from "@/utils/sidebarMotions/animatedNavItem";
import { AnimatedIcon } from "@/utils/sidebarMotions/animatedIcons";
import Image from "next/image";

const EasyBankSidebar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    setUser(getUser() as JwtPayload);
  }, []);

  // Get routes based on user role with proper typing
  const userRole: SidebarRoutes = (() => {
    switch (user?.role) {
      case "admin":
        return adminRoutes;
      case "customer":
        return customerRoutes;
      case "manager":
        return managerRoutes;
      default:
        return [];
    }
  })();

  const getRoleBadgeText = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrator";
      case "manager":
        return "Manager";
      case "customer":
        return "Customer";
      default:
        return "User";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return Crown;
      case "manager":
        return Shield;
      case "customer":
        return User;
      default:
        return User;
    }
  };

  return (
    <AnimatedContainer className="shadow-r-lg relative">
      <div className="relative z-10 p-6 flex flex-col">
        {/* Header Section */}
        <SlideInText delay={0.2} className="mb-5">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300">
              <Image
                src="https://i.ibb.co/wZ0721GL/be-eb-b-e-abstract-260nw-2385258941-removebg-preview.png"
                width={80}
                height={80}
                alt="image"
                priority
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#104042]">EasyBank</h2>
              <p className="text-sm text-gray-500 font-medium">
                Premium Banking
              </p>
            </div>
          </div>

          {/* User Badge */}
          {user && (
            <AnimatedItem delay={0.4}>
              <div className="p-2 bg-[#104042] border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center shadow-sm">
                    {(() => {
                      const RoleIcon = getRoleIcon(user.role);
                      return <RoleIcon className="w-6 h-6 text-[#104042]" />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-xs">
                      {user.name || "User"}
                    </p>
                    <p className="text-gray-100 text-[11px] font-medium">
                      {getRoleBadgeText(user.role)}
                    </p>
                  </div>
                  <div className="w-3 h-3 bg-green-400 rounded-full shadow-sm"></div>
                </div>
              </div>
            </AnimatedItem>
          )}
        </SlideInText>

        {/* Navigation */}
        <nav className="flex-1 space-y-3">
          <SlideInText delay={0.6}>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="w-1 h-5 bg-[#104042] rounded-full"></div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Dashboard Menu
              </p>
              <Link
                href="/"
                className={cn(
                  "group relative flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-2xl transition-all duration-500 overflow-hidden border-2",
                  "bg-white text-gray-700 hover:text-white border-gray-200 hover:border-[#104042] hover:shadow-md"
                )}
              >
                {/* Left-to-right fill effect */}
                <div className="absolute inset-0 bg-[#104042] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />

                <div className="relative z-10 flex items-center gap-2 w-full">
                  {/* Optional icon */}
                  {/* <div className="w-4 h-4 text-[#104042] group-hover:text-white group-hover:scale-110 transition-all duration-500">
                    <Home/>
                  </div> */}

                  <span className="flex-1 font-semibold">Home</span>
                </div>
              </Link>
            </div>
          </SlideInText>

          <AnimatePresence>
            {userRole.map((route) => {
              const isActive =
                pathname === route.href ||
                pathname?.startsWith(`${route.href}/`);
              const isHovered = hoveredItem === route.href;

              return (
                <AnimatedNavItem
                  key={route.href}
                  href={route.href}
                  isActive={isActive}
                  onHover={setHoveredItem}
                  className="relative"
                  // delay={0.1 * index}
                >
                  <Link
                    href={route.href}
                    className={cn(
                      "group relative flex items-center gap-4 px-3 py-[6px] text-xs font-semibold rounded-2xl transition-all duration-500 overflow-hidden border-2 ",
                      isActive
                        ? "bg-[#104042] text-white shadow-lg border-[#104042]"
                        : "bg-white hover:text-white border-gray-200 hover:border-[#104042] hover:shadow-md text-black font-semibold"
                    )}
                  >
                    {/* Left-to-right fill effect */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-[#104042] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                    )}

                    <div className="relative z-10 flex items-center gap-4 w-full">
                      {route.icon && (
                        <AnimatedIcon
                          isActive={isActive}
                          isHovered={isHovered}
                          className={cn(
                            "w-6 h-6 transition-all duration-500",
                            isActive
                              ? "text-white"
                              : "text-[#104042] group-hover:text-white group-hover:scale-110"
                          )}
                        >
                          <route.icon />
                        </AnimatedIcon>
                      )}

                      <span className="flex-1 relative z-10 font-semibold">
                        {route.label}
                      </span>

                      <AnimatedIcon
                        isActive={isActive}
                        isHovered={isHovered}
                        className={cn(
                          "relative z-10 transition-all duration-500",
                          isActive
                            ? "text-white translate-x-1"
                            : "text-gray-400 group-hover:text-white group-hover:translate-x-2 group-hover:scale-110"
                        )}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </AnimatedIcon>
                    </div>
                  </Link>
                </AnimatedNavItem>
              );
            })}
          </AnimatePresence>
        </nav>
      </div>
    </AnimatedContainer>
  );
};

export default EasyBankSidebar;
