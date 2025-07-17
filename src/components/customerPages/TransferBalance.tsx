/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import EBForm from "@/shared/form/EBForm";
import EBInput from "@/shared/form/EBInput";
import type { FieldValues } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  CreditCard,
  Users,
  Shield,
  ArrowLeftRight,
  Wallet,
} from "lucide-react";
import { useTransferBalanceMutation } from "@/redux/api/transactionApi";
import { TGlobalResponse } from "@/types/global.type";
import { toast } from "sonner";
import AuthLoading from "@/shared/loader/AuthLoading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/shared/loading/Loading";
import { JwtPayload } from "@/types/common.type";
import { TbCoinTakaFilled } from "react-icons/tb";

const TransferBalance = ({
  myAccount,
  user,
}: {
  myAccount: any;
  user: JwtPayload;
}) => {
  const router = useRouter();
  const [transferBalance, { isLoading }] = useTransferBalanceMutation();
  const { accountNumber, balance } = myAccount?.data ?? {};

  const shouldRedirect = !myAccount?.data || !accountNumber;

  useEffect(() => {
    if (shouldRedirect) {
      router.push(`/dashboard/${user?.role}/my-account`);
    }
  }, [shouldRedirect, router, user?.role]);

  if (shouldRedirect) {
    return <Loading />;
  }

  const onSubmit = async (data: FieldValues) => {
    try {
      const transferData = {
        ...data,
        amount: Number(data?.amount),
      };
      const res = (await transferBalance(transferData)) as TGlobalResponse;
      if (res?.data?.success) {
        toast.success(res?.data?.message || "Balance Transfer successfull", {
          duration: 3000,
        });
      } else {
        toast.error(res?.error?.data?.message || "Balance Transfer failed", {
          duration: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-2 sm:px-4">
      <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
        {/* Balance Overview */}
        <div className="rounded-lg sm:rounded-xl bg-gradient-to-r from-[#104042] to-[#1a5a5d] text-white">
          <div className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
              <div>
                <p className="text-blue-100 text-xs sm:text-sm">
                  Available Balance
                </p>
                <p className="text-xl sm:text-2xl">
                  ৳{balance?.toLocaleString() || "0.00"}
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 sm:gap-4">
                <div className="w-6 sm:w-8 h-6 sm:h-8 bg-white/60 rounded-full flex items-center justify-center">
                  <ArrowLeftRight className="h-4 sm:h-6 w-4 sm:w-6 text-black" />
                </div>
                <h1 className="text-lg sm:text-2xl text-white">
                  Transfer Funds
                </h1>
              </div>
              <div className="bg-white/20 p-2 sm:p-3 rounded-full">
                <Wallet className="h-5 sm:h-8 w-5 sm:w-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Transfer Form */}
        <Card className="bg-gray-200">
          <CardHeader className="bg-gradient-to-r from-[#104042] to-[#1a5a5d] text-white rounded-t-lg">
            <CardTitle className="text-lg sm:text-xl text-center flex items-center justify-center gap-1 sm:gap-2 pt-1">
              <ArrowLeftRight className="h-5 sm:h-6 w-5 sm:w-6" />
              <span>Transfer Transaction Form</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 md:px-8 py-4">
            <EBForm onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {/* Transaction Type */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                    <ArrowLeftRight className="h-4 sm:h-5 w-4 sm:w-5 text-[#104042]" />
                    <span className="text-base sm:text-lg text-[#104042]">
                      Transaction Details
                    </span>
                  </div>
                  <EBInput
                    label="Transaction Type"
                    name="transactionType"
                    readOnly={true}
                    type="text"
                    defaultValue="transfer"
                    className="border-none bg-slate-50 text-center font-semibold text-sm sm:text-base"
                  />
                </div>

                {/* From Account */}
                <div className="space-y-1 sm:space-y-2">
                  <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <CreditCard className="h-4 sm:h-5 w-4 sm:w-5 text-[#104042]" />
                    <span className="text-xs sm:text-sm text-[#104042]">
                      Source Account
                    </span>
                  </div>
                  <EBInput
                    label="From Account"
                    name="fromAccount"
                    type="text"
                    className="border-none focus:border-[#104042] transition-colors bg-white text-sm sm:text-base"
                    defaultValue={accountNumber}
                    readOnly={true}
                  />
                </div>

                {/* To Account */}
                <div className="space-y-1 sm:space-y-2">
                  <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <Users className="h-4 sm:h-5 w-4 sm:w-5 text-[#104042]" />
                    <span className="text-xs sm:text-sm text-[#104042]">
                      Destination Account
                    </span>
                  </div>
                  <EBInput
                    label="To Account"
                    name="toAccount"
                    type="text"
                    placeholder="EB01BUS-0000002"
                    className="border-none focus:border-[#104042] transition-colors bg-white text-sm sm:text-base"
                  />
                </div>

                {/* Amount */}
                <div className="space-y-1 sm:space-y-2">
                  <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <TbCoinTakaFilled className="h-4 sm:h-5 w-4 sm:w-5 text-[#104042]" />
                    <span className="text-xs sm:text-sm text-[#104042]">
                      Transfer Amount
                    </span>
                  </div>
                  <EBInput
                    label="Amount"
                    name="amount"
                    type="number"
                    placeholder="1000"
                    className="border-none focus:border-[#104042] transition-colors bg-white text-sm sm:text-base"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1 sm:space-y-2">
                  <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <FileText className="h-4 sm:h-5 w-4 sm:w-5 text-[#104042]" />
                    <span className="text-xs sm:text-sm text-[#104042]">
                      Transfer Purpose
                    </span>
                  </div>
                  <EBInput
                    label="Description"
                    name="description"
                    type="text"
                    placeholder="Rent payment"
                    className="border-none focus:border-[#104042] transition-colors bg-white text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6 sm:mt-8 md:mt-10 flex justify-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#104042] to-[#1a5a5d] text-white px-6 sm:px-8 py-1.5 sm:py-2 rounded-md sm:rounded-lg font-medium sm:font-semibold text-base sm:text-lg hover:from-[#0d3537] hover:to-[#164d50] transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2 sm:gap-3"
                >
                  <ArrowLeftRight className="h-4 sm:h-5 w-4 sm:w-5 md:h-6 md:w-6" />
                  {isLoading ? <AuthLoading /> : <span>Process Transfer</span>}
                </button>
              </div>
            </EBForm>
          </CardContent>
        </Card>

        {/* Security Footer */}
        <div className="text-center space-y-1 sm:space-y-2 pb-2 sm:pb-0">
          <div className="flex items-center justify-center gap-1 sm:gap-2 text-[#104042]">
            <Shield className="h-4 sm:h-5 w-4 sm:w-5" />
            <p className="text-sm sm:text-base font-medium sm:font-semibold">
              Bank-Level Security
            </p>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            All transfers are encrypted and monitored for your protection
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransferBalance;
