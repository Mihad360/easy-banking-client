"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  disabled?: boolean;
}

export function AnimatedButton({
  children,
  onClick,
  variant = "default",
  size = "default",
  className,
  disabled = false,
}: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.1 }}
    >
      <Button
        onClick={onClick}
        variant={variant}
        size={size}
        disabled={disabled}
        className={cn(
          "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#5855eb] hover:to-[#7c3aed] text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300",
          variant === "destructive" &&
            "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
          variant === "outline" &&
            "bg-transparent border-2 border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white",
          className
        )}
      >
        {children}
      </Button>
    </motion.div>
  );
}
