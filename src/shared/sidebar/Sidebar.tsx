"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getUser } from "@/services/authServices";
import { JwtPayload, SidebarRoutes } from "@/types/common.type";
import { adminRoutes, customerRoutes, managerRoutes } from "@/utils/sidebar";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<JwtPayload | null>(null);
  // console.log(user);
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

  return (
    <div className="w-64 h-full border-r bg-background p-4">
      <nav className="space-y-1">
        {userRole.map((route) => {
          const isActive =
            pathname === route.href || pathname?.startsWith(`${route.href}/`);

          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {route.icon && <route.icon />}
              {route.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
