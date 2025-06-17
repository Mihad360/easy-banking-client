"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { getUser } from "@/services/authServices";
import type { JwtPayload, SidebarRoutes } from "@/types/common.type";
import { adminRoutes, customerRoutes, managerRoutes } from "@/utils/sidebar";
import { useEffect, useState } from "react";
import { User, ChevronRight, Building2, CreditCard } from "lucide-react";
import { AnimatedContainer } from "@/utils/sidebarMotions/animatedContainer";
import { SlideInText } from "@/utils/sidebarMotions/slideInText";
import { AnimatedItem } from "@/utils/sidebarMotions/animatedItem";
import { AnimatedNavItem } from "@/utils/sidebarMotions/animatedNavItem";
import { AnimatedBackground } from "@/utils/sidebarMotions/animatedBackground";
import { AnimatedIcon } from "@/utils/sidebarMotions/animatedIcons";
import { ShineEffect } from "@/utils/sidebarMotions/shineEffect";

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

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "from-pink-500 to-rose-500";
      case "manager":
        return "from-pink-400 to-purple-500";
      case "customer":
        return "from-pink-300 to-pink-500";
      default:
        return "from-pink-400 to-rose-400";
    }
  };

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

  return (
    <AnimatedContainer className="w-72 h-full bg-gradient-to-b from-pink-50 via-white to-pink-50 border-r border-pink-100 shadow-xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 via-transparent to-rose-100/20" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-200/30 to-transparent rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-rose-200/30 to-transparent rounded-full blur-xl" />

      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Header Section */}
        <SlideInText delay={0.2} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Easy Bank
              </h2>
              <p className="text-sm text-pink-500/70">Banking Made Simple</p>
            </div>
          </div>

          {/* User Badge */}
          {user && (
            <AnimatedItem delay={0.4}>
              <div
                className={cn(
                  "p-4 rounded-2xl bg-gradient-to-r shadow-lg border border-white/50",
                  getRoleColor(user.role)
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">
                      {user.name || "User"}
                    </p>
                    <p className="text-white/80 text-xs">
                      {getRoleBadgeText(user.role)}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedItem>
          )}
        </SlideInText>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          <SlideInText delay={0.6}>
            <p className="text-xs font-semibold text-pink-400 uppercase tracking-wider mb-4 px-3">
              Manage Your Account
            </p>
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
                >
                  <Link
                    href={route.href}
                    className={cn(
                      "group relative flex items-center gap-4 px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-300 overflow-hidden",
                      isActive
                        ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/25"
                        : "text-pink-600 hover:bg-pink-50 hover:text-pink-700"
                    )}
                  >
                    {/* Active/Hover Background */}
                    <AnimatedBackground
                      isActive={isActive}
                      isHovered={isHovered && !isActive}
                    />

                    <div className="relative z-10 flex items-center gap-4 w-full">
                      {route.icon && (
                        <AnimatedIcon
                          isActive={isActive}
                          isHovered={isHovered}
                          className={cn(
                            "w-5 h-5 transition-colors duration-300",
                            isActive ? "text-white" : "text-pink-500"
                          )}
                        >
                          <route.icon />
                        </AnimatedIcon>
                      )}

                      <span className="flex-1 relative z-10 font-bold">
                        {route.label}
                      </span>

                      <AnimatedIcon
                        isActive={isActive}
                        isHovered={isHovered}
                        className="relative z-10"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </AnimatedIcon>
                    </div>

                    {/* Shine effect on hover */}
                    <ShineEffect isVisible={isHovered} />
                  </Link>
                </AnimatedNavItem>
              );
            })}
          </AnimatePresence>
        </nav>

        {/* Footer */}
        <SlideInText delay={0.8} className="mt-8">
          <div className="p-4 bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl border border-pink-200/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-pink-700">Need Help?</p>
                <p className="text-xs text-pink-500">24/7 Support</p>
              </div>
            </div>
          </div>
        </SlideInText>
      </div>
    </AnimatedContainer>
  );
};

export default EasyBankSidebar;
