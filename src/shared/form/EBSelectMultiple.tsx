"use client";
import React from "react";
import { Select } from "antd";
import { Controller } from "react-hook-form";

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
};

const EBSelectMultiple = ({
  name,
  label,
  options,
  disabled,
  placeholder = "Please select",
  mode,
}: EBSelectMultipleProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium mb-1">{label}</label>
      <Controller
        name={name}
        render={({ field }) => (
          <Select
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
