"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

type TSelectOption = {
  label: string;
  value: string;
};

type TEBSelect = {
  options: TSelectOption[];
  name: string;
  label: string;
  disabled?: boolean;
  placeholder?: string;
};

const EBSelect = ({
  options,
  name,
  label,
  disabled,
  placeholder,
}: TEBSelect) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={disabled}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder || "Select"} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.label} value={option.label}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
};

export default EBSelect;
