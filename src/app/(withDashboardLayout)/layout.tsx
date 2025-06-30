import DashboardNavbar from "@/shared/sidebar/DashboardNavbar";
import Sidebar from "@/shared/sidebar/Sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen">
      <div className="overflow-y-auto hide-scrollbar h-full w-72 bg-gray-200">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-y-auto h-full">
        <DashboardNavbar />
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
};

export default layout;
