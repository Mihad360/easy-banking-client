import AccountTypes from "./AccountTypes";
import Banner from "./Banner";
import Delivery from "./Delivery";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50/50 via-white/30 to-slate-100/50">
      {/* <div className="absolute inset-0 bg-gradient-to-br from-[#104042]/3 via-transparent to-[#104042]/5"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-white/20 via-transparent to-slate-100/30"></div> */}
      <Banner />
      <Delivery />
      <AccountTypes />
    </div>
  );
};

export default Home;
