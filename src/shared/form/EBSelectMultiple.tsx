"use client";
import React, { ReactNode } from "react";
import { Select } from "antd";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";

type OptionType = {
  label: string;
  value: string;
};

type EBSelectMultipleProps = {
  name: string;
  label: string;
  options: OptionType[];
  disabled?: boolean;
  placeholder?: string;
  mode?: "multiple" | "tags";
  className?: string;
  icon?: ReactNode;
};

const EBSelectMultiple = ({
  name,
  label,
  options,
  disabled,
  placeholder = "Please select",
  mode,
  className,
  icon,
}: EBSelectMultipleProps) => {
  return (
    <div className="flex flex-col gap-1">
      <Label className="flex gap-2 items-center pb-2">
        {icon}
        {label}
      </Label>
      <Controller
        name={name}
        render={({ field }) => (
          <Select
            className={` ${className ?? ""}`}
            mode={mode}
            allowClear
            {...field}
            style={{ width: "100%" }}
            disabled={disabled}
            placeholder={placeholder}
            options={options}
          />
        )}
      />
    </div>
  );
};

export default EBSelectMultiple;
