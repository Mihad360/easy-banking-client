import { ReactNode } from "react";

export type EBInputType = {
  type: string;
  label: string;
  name: string;
  size?: number;
  icon?: ReactNode;
  placeholder?: string;
};
