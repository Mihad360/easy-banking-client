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
  readOnly,
}: EBInputType) => {
  const { register } = useFormContext();
  return (
    <div className="grid w-full items-center gap-3">
      <Label className="flex gap-2 items-center">
        {icon}
        {label}
      </Label>
      <Input
        className={`${className ? className : ""}`}
        {...register(name)}
        type={type}
        size={size}
        placeholder={placeholder}
        defaultValue={defaultValue}
        readOnly={readOnly}
      />
    </div>
  );
};

export default EBInput;
