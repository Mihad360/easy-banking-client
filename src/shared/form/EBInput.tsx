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
}: EBInputType) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="grid w-full max-w-sm items-center gap-3 mb-2">
      <Label className="flex gap-2 items-center">
        {icon}
        {label}
      </Label>
      <Input
        {...register(name)}
        type={type}
        size={size}
        placeholder={placeholder}
      />
    </div>
  );
};

export default EBInput;
