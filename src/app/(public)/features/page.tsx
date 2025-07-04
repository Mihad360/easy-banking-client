import FeatureBanner from "@/components/featurePages/FeatureBanner";
import AccountTypes from "@/components/featurePages/AccountTypes";

const page = () => {
  return (
    <div  className="bg-gradient-to-br from-slate-50/50 via-white/30 to-slate-100/50">
      <FeatureBanner />
      <AccountTypes />
    </div>
  );
};

export default page;
