import Banner from "@/components/homePages/Banner";
import Delivery from "@/components/homePages/Delivery";
import React from "react";

const page = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50/50 via-white/30 to-slate-100/50">
      <Banner />
      <Delivery />
    </div>
  );
};

export default page;
