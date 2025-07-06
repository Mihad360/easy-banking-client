/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  useGetAdminLastMonthStatsQuery,
  useGetAdminStatsQuery,
} from "@/redux/api/adminApi";
import Loading from "@/shared/loading/Loading";
import {
  Users,
  CreditCard,
  DollarSign,
  Activity,
  TrendingUp,
  Building2,
  PieChartIcon,
} from "lucide-react";
import ChartCard from "../charts/ChartCard";
import MetricCard from "../charts/MetricCard";

const AdminManagerBankStats = () => {
  const { data: bankStats, isLoading: bankStatLoading } =
    useGetAdminStatsQuery(undefined);
  const { data: bankLastMonthStats, isLoading } =
    useGetAdminLastMonthStatsQuery(undefined, { skip: bankStatLoading });

  const bankstats = bankStats?.data?.[0];
  const lastMonthBankStats = bankLastMonthStats?.data;
  // console.log(bankstats);

  if (isLoading || bankStatLoading) {
    return <Loading />;
  }

  if (!bankstats || !lastMonthBankStats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <Building2 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <p className="text-lg text-slate-600 font-medium">
            You are not included in any branch yet.
          </p>
        </div>
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
    <div className="">
      <div className="px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            Banking Stats
          </h1>
          <p className="text-slate-600 text-base">
            Real-time insights into your banking operations
          </p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Accounts"
            value={totalAccounts.toLocaleString()}
            subtitle="Active customer accounts"
            icon={<Users className="w-8 h-8" />}
            gradient="from-blue-500 to-blue-600"
            growth={12.5}
            trend="up"
          />
          <MetricCard
            title="Total Balance"
            value={`৳${totalBalance}`}
            subtitle="Assets under management"
            icon={<DollarSign className="w-8 h-8" />}
            gradient="from-emerald-500 to-emerald-600"
            growth={8.3}
            trend="up"
          />
          <MetricCard
            title="Monthly Transactions"
            value={totalTransactions.toLocaleString()}
            subtitle="Last 30 days activity"
            icon={<Activity className="w-8 h-8" />}
            gradient="from-orange-500 to-orange-600"
            growth={15.7}
            trend="up"
          />
          <MetricCard
            title="Active Loans"
            value={totalLoans.toLocaleString()}
            subtitle={`৳${totalLoanAmount}`}
            icon={<CreditCard className="w-8 h-8" />}
            gradient="from-purple-500 to-purple-600"
            growth={-2.1}
            trend="down"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Account Types - Doughnut Chart */}
          {bankstats.accountTypes && (
            <ChartCard
              type="doughnut"
              data={bankstats.accountTypes}
              title="Account Distribution"
              subtitle="By account type"
              icon={<PieChartIcon className="w-5 h-5" />}
              colors={["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"]}
            />
          )}

          {/* Transaction Types - Bar Chart */}
          {lastMonthBankStats.transactions && (
            <div className="lg:col-span-2">
              <ChartCard
                type="bar"
                data={lastMonthBankStats.transactions}
                title="Transaction Analysis"
                subtitle="Monthly transaction breakdown"
                icon={<Activity className="w-5 h-5" />}
                colors={["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ef4444"]}
              />
            </div>
          )}
        </div>

        {/* Daily Trends - Line Chart */}
        {lastMonthBankStats.dailyTrends && (
          <div className="mb-8">
            <ChartCard
              type="line"
              data={lastMonthBankStats.dailyTrends}
              title="Daily Transaction Trends"
              subtitle="Transaction volume over the last 30 days"
              icon={<TrendingUp className="w-5 h-5" />}
              colors={["#3b82f6"]}
            />
          </div>
        )}

        {/* Loan Analysis */}
        {bankstats.loanInsights && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ChartCard
              type="pie"
              data={bankstats.loanInsights}
              title="Loan Portfolio Status"
              subtitle="Distribution by loan status"
              icon={<CreditCard className="w-5 h-5" />}
              colors={["#8b5cf6", "#a855f7", "#c084fc", "#ddd6fe"]}
            />
            <ChartCard
              type="horizontalBar"
              data={bankstats.loanInsights}
              title="Loan Amounts"
              subtitle="By status"
              icon={<CreditCard className="w-5 h-5" />}
              colors={["#8b5cf6", "#a855f7", "#c084fc", "#ddd6fe"]}
              showBalance={true}
            />
          </div>
        )}

        {/* User Growth */}
        {bankstats.userGrowth && bankstats.userGrowth.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  User Growth
                </h3>
                <p className="text-slate-600">Monthly new user acquisition</p>
              </div>
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {bankstats.userGrowth
                .slice(-6)
                .map((item: any, index: number) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
                  >
                    <p className="text-sm font-medium text-slate-600 mb-1">
                      {new Date(
                        item._id.year,
                        item._id.month - 1
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        year: "2-digit",
                      })}
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      +{item.newUsers}
                    </p>
                    <p className="text-xs text-slate-500">new users</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Branch Performance - Last */}
        {bankstats.branchDetails && (
          <ChartCard
            type="multiBar"
            data={bankstats.branchDetails}
            title="Branch Performance Overview"
            subtitle="Comprehensive branch analytics"
            icon={<Building2 className="w-5 h-5" />}
            colors={["#3b82f6", "#10b981"]}
            showDetails={true}
          />
        )}
      </div>
    </div>
  );
};

export default AdminManagerBankStats;
