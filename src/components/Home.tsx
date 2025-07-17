"use client";
import Banner from "./homePages/Banner";
import Delivery from "./homePages/Delivery";
import FAQ from "./homePages/FAQ";
import InterestCalculator from "./homePages/InterestCalculator";
import LoanCalculator from "./homePages/LoanCalculator";
import SliderPart from "./homePages/SliderPart";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50/50 via-white/30 to-slate-100/50">
      <Banner />
      <SliderPart />
      <Delivery />
      <div className="flex flex-col lg:flex-row justify-center max-w-7xl mx-auto gap-4 px-4">
        <div className="w-full sm:w-1/2">
          <LoanCalculator />
        </div>
        <div className="w-full sm:w-1/2">
          <InterestCalculator />
        </div>
      </div>

      <FAQ />
    </div>
  );
};

export default Home;
