"use client";
import EBForm from "@/shared/form/EBForm";
import EBInput from "@/shared/form/EBInput";
import type { FieldValues } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, DollarSign, FileText, CreditCard } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DepositBalance = ({ myAccount }: { myAccount: any }) => {
  const { accountNumber } = myAccount?.data;
  const onSubmit = async (data: FieldValues) => {
    const depositData = {
      ...data,
      amount: Number(data?.amount),
    };
    console.log(depositData);
  };

  const suggestions = [
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: "Verify Account",
      description: "Check your account number is valid",
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: "Enter Amount",
      description: "Add the amount you want to save",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Add Description",
      description: "Enter a valid description",
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: "Complete",
      description: "Review and submit your deposit",
    },
  ];

  return (
    <div className=" p-4">
      <div className="max-w-4xl mx-auto space-y-5">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-[#104042]">
            Deposit Your Money for Savings
          </h1>
          <p className="text-slate-600 text-sm mt-2">
            Secure your future with our savings deposit service
          </p>
        </div>

        {/* Suggestions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
          {suggestions.map((suggestion, index) => (
            <Card
              key={index}
              className="border-l-4 border-l-[#104042] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gray-200"
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-[#104042] text-white p-2 rounded-lg">
                    {suggestion.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#104042] text-sm">
                      {suggestion.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      {suggestion.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Form Card */}
        <Card className="bg-gray-200">
          <CardHeader className="bg-gradient-to-r from-[#104042] to-[#1a5a5d] text-white rounded-t-lg">
            <CardTitle className="text-lg font-bold text-center pt-1">
              Deposit Transaction Form
            </CardTitle>
          </CardHeader>
          <CardContent className="py-5 px-8">
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
                    <CheckCircle className="h-4 w-4 text-[#104042]" />
                    <span className="text-sm font-bold text-[#104042]">
                      Transaction Type
                    </span>
                  </div>
                  <EBInput
                    label="Transaction Type"
                    name="transactionType"
                    readOnly={true}
                    type="text"
                    defaultValue="deposit"
                    className="border-2  border-[#104042] bg-slate-50"
                  />
                </div>

                {/* Second Row */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="h-4 w-4 text-[#104042]" />
                    <span className="text-sm font-bold text-[#104042]">
                      Deposit Amount
                    </span>
                  </div>
                  <EBInput
                    label="Amount"
                    name="amount"
                    type="number"
                    placeholder="2000"
                    className="border-2 bg-white  border-[#104042] focus:border-[#104042] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="h-4 w-4 text-[#104042]" />
                    <span className="text-sm font-bold text-[#104042]">
                      Transaction Details
                    </span>
                  </div>
                  <EBInput
                    label="Description"
                    name="description"
                    type="text"
                    placeholder="Rent payment"
                    className="border-2 bg-white  border-[#104042] focus:border-[#104042] transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-7 flex justify-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#104042] to-[#1a5a5d] text-white px-8 py-2 rounded-lg font-semibold text-lg hover:from-[#0d3537] hover:to-[#164d50] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  Complete Deposit
                </button>
              </div>
            </EBForm>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="text-center text-slate-500 text-sm">
          <p>🔒 Your transaction is secured with bank-level encryption</p>
        </div>
      </div>
    </div>
  );
};

export default DepositBalance;
