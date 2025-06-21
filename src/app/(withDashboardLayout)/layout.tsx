import Sidebar from "@/shared/sidebar/Sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen">
      <div className="overflow-y-auto h-full w-[300px] bg-gray-200">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-y-auto h-full">
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default layout;
