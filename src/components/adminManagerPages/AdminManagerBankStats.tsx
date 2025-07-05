/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useGetAdminLastMonthStatsQuery,
  useGetAdminStatsQuery,
} from "@/redux/api/adminApi";
import Loading from "@/shared/loading/Loading";
import { Users, CreditCard, DollarSign, Activity } from "lucide-react";
import MetricCard from "../charts/MetricCard";
import PieChart from "../charts/Piechart";
import BarChart from "../charts/Barchart";
import LineChart from "../charts/Linechart";
import BranchPerformance from "../charts/BranchPerformance";

const AdminManagerBankStats = () => {
  const { data: bankStats, isLoading: bankStatLoading } =
    useGetAdminStatsQuery(undefined);
  const { data: bankLastMonthStats, isLoading } =
    useGetAdminLastMonthStatsQuery(undefined, { skip: bankStatLoading });

  const bankstats = bankStats?.data?.[0];
  const lastMonthBankStats = bankLastMonthStats?.data;

  if (isLoading || bankStatLoading) {
    return <Loading />;
  }

  if (!bankstats || !lastMonthBankStats) {
    return (
      <div className="pt-40">
        <p className="text-center text-rose-500 font-medium">
          You are not included in any branch yet.
        </p>
      </div>
    );
  }

  // Calculate key metrics
  const totalAccounts =
    bankstats.accountTypes?.reduce(
      (sum: number, item: any) => sum + item.count,
      0
    ) || 0;
  const totalBalance =
    bankstats.accountTypes?.reduce(
      (sum: number, item: any) => sum + (item.totalBalance || 0),
      0
    ) || 0;
  const totalTransactions =
    lastMonthBankStats.transactions?.reduce(
      (sum: number, item: any) => sum + item.count,
      0
    ) || 0;
  const totalLoans =
    bankstats.loanInsights?.reduce(
      (sum: number, item: any) => sum + item.count,
      0
    ) || 0;
  const totalLoanAmount =
    bankstats.loanInsights?.reduce(
      (sum: number, item: any) => sum + (item.totalLoanAmount || 0),
      0
    ) || 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Banking Dashboard
        </h1>
        <p className="text-gray-600">
          Comprehensive overview of your banking operations
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Accounts"
          value={totalAccounts.toLocaleString()}
          subtitle="Active accounts"
          icon={<Users className="w-8 h-8" />}
          color="#104042"
        />
        <MetricCard
          title="Total Balance"
          value={`$${totalBalance.toLocaleString()}`}
          subtitle="Across all accounts"
          icon={<DollarSign className="w-8 h-8" />}
          color="#2D6A4F"
        />
        <MetricCard
          title="Monthly Transactions"
          value={totalTransactions.toLocaleString()}
          subtitle="Last 30 days"
          icon={<Activity className="w-8 h-8" />}
          color="#40916C"
        />
        <MetricCard
          title="Active Loans"
          value={totalLoans.toLocaleString()}
          subtitle={`$${totalLoanAmount.toLocaleString()} total`}
          icon={<CreditCard className="w-8 h-8" />}
          color="#52B788"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Account Types Distribution */}
        {bankstats.accountTypes && (
          <PieChart
            data={bankstats.accountTypes}
            title="Account Types Distribution"
            showBalance={false}
          />
        )}

        {/* Transaction Types */}
        {lastMonthBankStats.transactions && (
          <BarChart
            data={lastMonthBankStats.transactions}
            title="Transaction Types (Last Month)"
            showBalance={true}
          />
        )}
      </div>

      {/* Daily Trends */}
      {lastMonthBankStats.dailyTrends && (
        <div className="mb-8">
          <LineChart
            data={lastMonthBankStats.dailyTrends}
            title="Daily Transaction Trends (Last Month)"
          />
        </div>
      )}

      {/* Loan Insights and Branch Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Loan Status Distribution */}
        {bankstats.loanInsights && (
          <div className="space-y-6">
            <PieChart
              data={bankstats.loanInsights}
              title="Loan Status Distribution"
              showBalance={false}
            />
            <BarChart
              data={bankstats.loanInsights}
              title="Loan Amounts by Status"
              showBalance={true}
              horizontal={true}
            />
          </div>
        )}

        {/* Branch Performance */}
        {bankstats.branchDetails && (
          <BranchPerformance
            data={bankstats.branchDetails}
            title="Branch Performance Overview"
          />
        )}
      </div>

      {/* User Growth Chart */}
      {bankstats.userGrowth && bankstats.userGrowth.length > 0 && (
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              User Growth Trends
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {bankstats.userGrowth.map((item: any, index: number) => (
                <div
                  key={index}
                  className="text-center p-4 bg-gray-50 rounded-lg"
                >
                  <p className="text-sm text-gray-600">
                    {new Date(
                      item._id.year,
                      item._id.month - 1
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {item.newUsers}
                  </p>
                  <p className="text-sm text-gray-500">New Users</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Summary Footer */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Account Overview</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• {totalAccounts} total accounts managed</li>
              <li>• ${totalBalance.toLocaleString()} in total deposits</li>
              <li>• Multiple account types supported</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Transaction Activity
            </h4>
            <ul className="space-y-1 text-gray-600">
              <li>• {totalTransactions} transactions last month</li>
              <li>• Multiple transaction types processed</li>
              <li>• Daily transaction monitoring active</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Loan Portfolio</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• {totalLoans} active loans</li>
              <li>• ${totalLoanAmount.toLocaleString()} total loan value</li>
              <li>• Various loan statuses tracked</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManagerBankStats;
