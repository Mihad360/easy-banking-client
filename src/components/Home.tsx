"use client";
import Banner from "./homePages/Banner";
import Delivery from "./homePages/Delivery";
import FAQ from "./homePages/FAQ";
import SliderPart from "./homePages/SliderPart";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50/50 via-white/30 to-slate-100/50">
      <Banner />
      <SliderPart />
      <Delivery />
      <FAQ />
    </div>
  );
};

export default Home;
