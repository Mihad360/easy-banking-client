"use client";
import EBForm from "@/shared/form/EBForm";
import EBInput from "@/shared/form/EBInput";
import type { FieldValues } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  DollarSign,
  FileText,
  CreditCard,
  Wallet,
} from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WithdrawBalance = ({ myAccount }: { myAccount: any }) => {
  const { accountNumber, balance } = myAccount?.data;

  const onSubmit = async (data: FieldValues) => {
    const withdrawData = {
      ...data,
      amount: Number(data?.amount),
    };
    console.log(withdrawData);
  };

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto space-y-5">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-[#104042]">
            Withdraw Your Savings
          </h1>
          <p className="text-slate-600 text-sm mt-2">
            Access your funds securely with our withdrawal service
          </p>
        </div>

        {/* Balance Alert */}
        <div className="border-l-4 border-l-[#104042] bg-gray-200 rounded-xl">
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-[#104042]" />
              <div>
                <p className="text-sm font-semibold text-orange-800">
                  Current Balance: 	৳{balance}
                </p>
                <p className="text-xs text-rose-600">
                  Please ensure you have sufficient funds before proceeding
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <Card className="bg-gray-200">
          <CardHeader className="bg-gradient-to-r from-[#104042] to-[#104042] text-white rounded-t-lg">
            <CardTitle className="text-lg font-bold text-center pt-1">
              Withdrawal Transaction Form
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8">
            <EBForm onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Row */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <CreditCard className="h-4 w-4 text-[#104042]" />
                    <span className="text-sm font-bold text-[#104042]">
                      Account Information
                    </span>
                  </div>
                  <EBInput
                    label="Account Number"
                    name="account"
                    type="text"
                    className="border-2 border-[#104042] focus:border-[#104042] transition-colors bg-white"
                    defaultValue={accountNumber}
                    readOnly={true}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <Wallet className="h-4 w-4 text-[#104042]" />
                    <span className="text-sm font-bold text-[#104042]">
                      Transaction Type
                    </span>
                  </div>
                  <EBInput
                    label="Transaction Type"
                    name="transactionType"
                    readOnly={true}
                    type="text"
                    defaultValue="withdraw"
                    className="border-2 border-[#104042] bg-slate-50"
                  />
                </div>

                {/* Second Row */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="h-4 w-4 text-[#104042]" />
                    <span className="text-sm font-bold text-[#104042]">
                      Withdrawal Amount
                    </span>
                  </div>
                  <EBInput
                    label="Amount"
                    name="amount"
                    type="number"
                    placeholder="1000"
                    className="border-2 bg-white border-[#104042] focus:border-[#104042] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="h-4 w-4 text-[#104042]" />
                    <span className="text-sm font-bold text-[#104042]">
                      Withdrawal Purpose
                    </span>
                  </div>
                  <EBInput
                    label="Description"
                    name="description"
                    type="text"
                    placeholder="Rent payment"
                    className="border-2 bg-white border-[#104042] focus:border-[#104042] transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-7 flex justify-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#104042] to-[#1a5a5d] text-white px-8 py-2 rounded-lg font-semibold text-lg hover:from-[#0d3537] hover:to-[#164d50] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  Process Withdrawal
                </button>
              </div>
            </EBForm>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="text-center text-slate-500 text-sm space-y-1">
          <p>🔒 Your transaction is secured with bank-level encryption</p>
          <p className="text-xs text-red-500">
            ⚠️ Please ensure you have sufficient funds before processing
            withdrawal
          </p>
        </div>
      </div>
    </div>
  );
};

export default WithdrawBalance;
