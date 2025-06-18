"use client";
import { Toaster } from "@/components/ui/sonner";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";


const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      {children}
      <Toaster position="top-center" />
    </Provider>
  );
};

export default Providers;
