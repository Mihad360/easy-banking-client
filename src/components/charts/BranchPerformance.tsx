"use client";

import { Building2, TrendingUp, AlertTriangle } from "lucide-react";

interface BranchData {
  _id: [string, string]; // [name, code]
  count: number;
  reserevedBalance: number;
  usedBalance: number;
  liquidityRatio: number;
}

interface BranchPerformanceProps {
  data: BranchData[];
  title: string;
}

const BranchPerformance = ({ data, title }: BranchPerformanceProps) => {
  const getLiquidityStatus = (ratio: number) => {
    if (ratio > 80)
      return {
        status: "High Risk",
        color: "text-red-600 bg-red-100",
        icon: AlertTriangle,
      };
    if (ratio > 60)
      return {
        status: "Medium Risk",
        color: "text-yellow-600 bg-yellow-100",
        icon: TrendingUp,
      };
    return {
      status: "Good",
      color: "text-green-600 bg-green-100",
      icon: TrendingUp,
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">{title}</h3>
      <div className="space-y-4">
        {data.map((branch, index) => {
          const [name, code] = branch._id;
          const liquidityStatus = getLiquidityStatus(branch.liquidityRatio);
          const StatusIcon = liquidityStatus.icon;

          return (
            <div
              key={index}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Building2 className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{name}</h4>
                    <p className="text-sm text-gray-500">Code: {code}</p>
                  </div>
                </div>
                <div
                  className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${liquidityStatus.color}`}
                >
                  <StatusIcon className="w-3 h-3" />
                  <span>{liquidityStatus.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Accounts</p>
                  <p className="font-semibold text-gray-900">{branch.count}</p>
                </div>
                <div>
                  <p className="text-gray-500">Reserved</p>
                  <p className="font-semibold text-gray-900">
                    ${branch.reserevedBalance.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Used</p>
                  <p className="font-semibold text-gray-900">
                    ${branch.usedBalance.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Liquidity Ratio</p>
                  <p className="font-semibold text-gray-900">
                    {branch.liquidityRatio.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Progress bar for liquidity ratio */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      branch.liquidityRatio > 80
                        ? "bg-red-500"
                        : branch.liquidityRatio > 60
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{
                      width: `${Math.min(branch.liquidityRatio, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BranchPerformance;
