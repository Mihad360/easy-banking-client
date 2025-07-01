"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  CreditCard,
  Calendar,
  MapPin,
  Building,
  User,
  Phone,
  Mail,
  Percent,
  Clock,
} from "lucide-react";
import { ReusableModal } from "@/shared/modal/ReusableModal";
import { LoanPaymentForm } from "@/shared/form/LoanPaymentForm";
import { FieldValues } from "react-hook-form";
import { TbCoinTaka } from "react-icons/tb";
import { usePayLaonMutation } from "@/redux/api/loanApi";
import { toast } from "sonner";
import AuthLoading from "@/shared/loader/AuthLoading";
/* eslint-disable @typescript-eslint/no-explicit-any */

const MyLoan = ({ myLoan }: { myLoan: any }) => {
  const [payLoan, { isLoading }] = usePayLaonMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loan = myLoan?.data;

  if (!loan) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">No loan data available</p>
      </div>
    );
  }

  const handlePaymentSubmit = async (data: FieldValues) => {
    try {
      const payLoanData = {
        id: loan?._id,
        loanData: {
          transactionType: data?.transactionType,
          monthsToPay: Number(data?.monthsToPay),
        },
      };
      const res = await payLoan(payLoanData);
      console.log(res);
      if (res?.data) {
        if (res.data?.data?.startsWith("http")) {
          window.location.href = res?.data?.data;
        }
      } else {
        toast.error("Something went wrong", { duration: 4000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatCurrency = (amountDue: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amountDue);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const nextPay =
    loan?.repaymentSchedule?.find((payment: { paid: any }) => !payment.paid) ||
    null;
  const getUpcomingPayments = (repaymentSchedule: any[], limit = 5) => {
    return (
      repaymentSchedule
        ?.filter((payment) => !payment.paid)
        ?.slice(0, limit)
        ?.map((payment) => ({
          month: new Date(payment.dueDate).toLocaleDateString("en-US", {
            month: "long",
          }),
          amountDue: payment.amountDue,
          dueDate: payment.dueDate,
        })) || []
    );
  };
  const upcomingPayments = getUpcomingPayments(loan?.repaymentSchedule);

  return (
    <div className="max-w-5xl mx-auto px-6 pb-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-0 bg-gray-200 rounded-b-none">
          <CardHeader className="">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Loan Account
                </CardTitle>
                <p className="text-black/70 font-mono text-sm mt-1">
                  {loan.accountNumber}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  className={`${getStatusColor(
                    loan.status
                  )} text-sm font-semibold`}
                >
                  {loan.status.toUpperCase()}
                </Badge>
                <ReusableModal
                  trigger={
                    <Button
                      size="sm"
                      className="bg-[#104042] text-white hover:bg-[#355354] font-semibold shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      {isLoading ? <AuthLoading /> : "Make Payment"}
                    </Button>
                  }
                  title="Loan Payment"
                  open={isModalOpen}
                  onOpenChange={setIsModalOpen}
                >
                  <LoanPaymentForm
                    onSubmit={handlePaymentSubmit}
                    onClose={() => setIsModalOpen(false)}
                  />
                </ReusableModal>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-5 bg-gray-200">
            {/* Next Payment Due - Prominent Display */}
            {nextPay && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-400 rounded-lg shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-red-700 mb-1">
                      Next Payment Due
                    </h3>
                    <p className="text-xl font-bold text-red-600">
                      BDT {nextPay.amountDue}
                    </p>
                    <p className="text-sm text-red-600 mt-1">
                      Due: {formatDate(nextPay.dueDate)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      Payment Required
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="grid lg:grid-cols-4 gap-6">
              {/* Left side - Loan Details */}
              <div className="lg:col-span-3 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Loan Amount */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <TbCoinTaka className="h-5 w-5 text-[#104042]" />
                    <span className="text-sm font-medium">Loan Amount</span>
                  </div>
                  <p className="text-xl font-bold text-[#104042]">
                    {formatCurrency(loan.loanAmount)}
                  </p>
                </motion.div>

                {/* Remaining Balance */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <TbCoinTaka className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium">
                      Remaining Loan Balance
                    </span>
                  </div>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(loan.remainingBalance)}
                  </p>
                </motion.div>

                {/* Interest Rate */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Percent className="h-5 w-5 text-[#104042]" />
                    <span className="text-sm font-medium">Interest Rate</span>
                  </div>
                  <p className="text-xl font-bold text-[#104042]">
                    {(loan.interestRate * 100).toFixed(1)}%
                  </p>
                </motion.div>

                {/* Term */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Clock className="h-5 w-5 text-[#104042]" />
                    <span className="text-sm font-medium">Term</span>
                  </div>
                  <p className="text-xl font-bold text-[#104042]">
                    {loan.term} months
                  </p>
                </motion.div>

                {/* Start Date */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Calendar className="h-5 w-5 text-[#104042]" />
                    <span className="text-sm font-medium">Start Date</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatDate(loan.startDate)}
                  </p>
                </motion.div>

                {/* End Date */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Calendar className="h-5 w-5 text-[#104042]" />
                    <span className="text-sm font-medium">End Date</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatDate(loan.endDate)}
                  </p>
                </motion.div>
              </div>

              {/* Right side - Upcoming Payments */}
              {upcomingPayments.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="lg:col-span-1"
                >
                  <div className="bg-white p-3 rounded-xl shadow-md border border-gray-100 h-fit">
                    <h4 className="text-sm font-semibold text-[#104042] mb-3 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Upcoming Payments
                    </h4>
                    <div className="space-y-2">
                      {upcomingPayments?.map((payment, index) => (
                        <div
                          key={index}
                          className={`flex justify-between items-center py-1 px-3 rounded-lg text-sm ${
                            index === 0
                              ? "bg-red-50 border border-red-200"
                              : "bg-gray-50 border border-gray-200"
                          }`}
                        >
                          <span
                            className={`font-medium ${
                              index === 0 ? "text-red-700" : "text-gray-700"
                            }`}
                          >
                            {payment.month}
                          </span>
                          <span
                            className={`font-semibold ${
                              index === 0 ? "text-red-600" : "text-gray-600"
                            }`}
                          >
                            {formatCurrency(payment.amountDue)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="text-red-500 font-medium p-3">
                  Your Loan is in processing. Please wait until the result
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Account Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="border-0 bg-gray-200 rounded-none">
          <CardHeader>
            <CardTitle className="text-white bg-[#104042] w-60 pl-2 py-1 rounded-xl flex items-center gap-2">
              <User className="h-5 w-5" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Account Holder</p>
                  <p className="font-semibold">
                    {loan.account.accountHolderName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Account Balance</p>
                  <p className="font-semibold text-green-600">
                    {formatCurrency(loan.account.balance)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Account Type</p>
                  <p className="font-semibold capitalize">
                    {loan.account.accountType}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Date of Birth</p>
                  <p className="font-semibold">
                    {formatDate(loan.account.dateOfBirth)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gender</p>
                  <p className="font-semibold">{loan.account.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Currency</p>
                  <p className="font-semibold">{loan.account.currency}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Branch Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="border-0 bg-gray-200 rounded-t-none">
          <CardHeader className="">
            <CardTitle className="text-white bg-[#104042] w-60 pl-2 py-1 rounded-xl flex items-center gap-2">
              <Building className="h-5 w-5" />
              Branch Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Branch Name</p>
                  <p className="font-semibold">{loan.branch.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Branch Code</p>
                  <p className="font-semibold">{loan.branch.code}</p>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-semibold">{loan.branch.address}</p>
                    <p className="text-sm text-gray-600">
                      {loan.branch.city}, {loan.branch.state}{" "}
                      {loan.branch.zipCode}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Contact</p>
                    <p className="font-semibold">{loan.branch.contactNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">{loan.branch.email}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Operating Hours</p>
                  <p className="font-semibold">
                    {loan.branch.openingSchedule.openTime} -{" "}
                    {loan.branch.openingSchedule.closeTime}
                  </p>
                  <p className="text-xs text-gray-500">
                    {loan.branch.openingSchedule.days.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default MyLoan;
