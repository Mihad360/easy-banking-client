/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion, Variants } from "framer-motion";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  User,
  Shield,
  Globe,
  Banknote,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";

const MyAccountDetails = ({ myAccount }: { myAccount: any }) => {
  const account = myAccount?.data;

  if (!account) {
    return (
      <div className="p-6">
        <div className="text-center text-slate-500">
          No account data available
        </div>
      </div>
    );
  }

  const containerVariants:
  Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: account.currency || "BDT",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Personal Information */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg mr-4">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  Personal Information
                </h3>
                <p className="text-slate-600">Account holder details</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 shadow-lg">
                  <Image
                    src={
                      account.user?.profilePhotoUrl ||
                      "/placeholder.svg?height=96&width=96"
                    }
                    width={500}
                    height={500}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-1">
                  {account.accountHolderName}
                </h4>
                <p className="text-slate-600 capitalize">{account.gender}</p>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-600">
                        Email
                      </p>
                      <p className="text-slate-800">{account.user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-600">
                        Phone
                      </p>
                      <p className="text-slate-800">
                        {account.user?.phoneNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-600">
                        Date of Birth
                      </p>
                      <p className="text-slate-800">
                        {formatDate(account.dateOfBirth)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-slate-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-slate-600">
                        Address
                      </p>
                      <p className="text-slate-800">{account.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-600">
                        Location
                      </p>
                      <p className="text-slate-800">
                        {account.city}, {account.country} - {account.postalCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Branch Information */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg mr-4">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  Branch Information
                </h3>
                <p className="text-slate-600">Your home branch details</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">
                    {account.branch?.name}
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-slate-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">
                          Branch Address
                        </p>
                        <p className="text-slate-800">
                          {account.branch?.address}
                        </p>
                        <p className="text-slate-600">
                          {account.branch?.city}, {account.branch?.state} -{" "}
                          {account.branch?.zipCode}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">
                          Contact
                        </p>
                        <p className="text-slate-800">
                          {account.branch?.contactNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">
                          Email
                        </p>
                        <p className="text-slate-800">
                          {account.branch?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">
                    Branch Performance
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600">
                          Reserved Balance
                        </span>
                        <Banknote className="w-4 h-4 text-slate-500" />
                      </div>
                      <p className="text-xl font-bold text-slate-800">
                        {formatCurrency(account.branch?.reserevedBalance)}
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600">
                          Used Balance
                        </span>
                        <TrendingUp className="w-4 h-4 text-slate-500" />
                      </div>
                      <p className="text-xl font-bold text-slate-800">
                        {formatCurrency(account.branch?.usedBalance)}
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600">
                          Liquidity Ratio
                        </span>
                        <Shield className="w-4 h-4 text-slate-500" />
                      </div>
                      <p className="text-xl font-bold text-slate-800">
                        {(
                          (account.branch?.usedBalance /
                            account.branch?.reserevedBalance) *
                          100
                        ).toFixed(1)}
                        %
                      </p>
                    </div>
                  </div>
                </div>
                {account.branch?.openingSchedule && (
                  <div>
                    <h4 className="text-lg font-semibold text-slate-800 mb-3">
                      Opening Hours
                    </h4>
                    <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <Clock className="w-5 h-5 text-slate-500" />
                        <span className="font-medium text-slate-800">
                          Business Hours
                        </span>
                      </div>
                      <p className="text-slate-600">
                        {account.branch.openingSchedule.days?.join(", ")} <br />
                        {account.branch.openingSchedule.openTime} -{" "}
                        {account.branch.openingSchedule.closeTime}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Account Statistics */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 text-center">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg w-fit mx-auto mb-4">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">
                Account Age
              </h4>
              <p className="text-2xl font-bold text-slate-800">
                {Math.floor(
                  (Date.now() - new Date(account.createdAt).getTime()) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                days
              </p>
              <p className="text-sm text-slate-500">Since opening</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 text-center">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg w-fit mx-auto mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">
                Total Transactions
              </h4>
              <p className="text-2xl font-bold text-slate-800">
                {account.transactions?.length || 0}
              </p>
              <p className="text-sm text-slate-500">All time</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 text-center">
              <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg w-fit mx-auto mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">
                Account Security
              </h4>
              <p className="text-2xl font-bold text-green-600">Secure</p>
              <p className="text-sm text-slate-500">All verifications passed</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MyAccountDetails;
