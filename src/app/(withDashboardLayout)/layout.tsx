import Sidebar from "@/shared/sidebar/Sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-full">
      <div className="overflow-y-auto h-full ">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-y-auto h-full">
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default layout;
