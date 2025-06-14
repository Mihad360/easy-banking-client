"use client";
import { store } from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Provider } from "react-redux";

const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
