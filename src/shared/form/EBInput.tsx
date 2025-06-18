"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EBInputType } from "@/types/form.type";
import { useFormContext } from "react-hook-form";

const EBInput = ({
  type,
  label,
  name,
  size,
  icon,
  placeholder,
  className,
  defaultValue,
}: EBInputType) => {
  const { register } = useFormContext();
  return (
    <div className="grid w-full max-w-sm items-center gap-3 mb-3">
      <Label className="flex gap-2 items-center">
        {icon}
        {label}
      </Label>
      <Input
        className={className}
        {...register(name)}
        type={type}
        size={size}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default EBInput;
