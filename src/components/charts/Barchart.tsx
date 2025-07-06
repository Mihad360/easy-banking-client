/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface BarChartProps {
  data: any[];
  title: string;
  showBalance: boolean;
  horizontal?: boolean;
  colors?: string[];
  compact?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  showBalance,
  horizontal = false,
  colors = ["#059669", "#10b981", "#34d399", "#6ee7b7"],
  compact = false,
}) => {
  const chartData = data.map((item, index) => ({
    name: item._id || item.name || `Item ${index + 1}`,
    value: showBalance
      ? item.totalBalance || item.totalLoanAmount || 0
      : item.count,
    fill: colors[index % colors.length],
  }));

  return (
    <div className={`bg-white rounded-lg shadow-sm ${compact ? "p-4" : "p-6"}`}>
      <h3
        className={`${
          compact ? "text-sm" : "text-lg"
        } font-semibold text-gray-800 mb-4`}
      >
        {title}
      </h3>
      <div className={compact ? "h-48" : "h-64"}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={chartData}
            layout={horizontal ? "horizontal" : "vertical"}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            {horizontal ? (
              <>
                <XAxis type="number" fontSize={compact ? 10 : 12} />
                <YAxis
                  type="category"
                  dataKey="name"
                  fontSize={compact ? 10 : 12}
                />
              </>
            ) : (
              <>
                <XAxis dataKey="name" fontSize={compact ? 10 : 12} />
                <YAxis fontSize={compact ? 10 : 12} />
              </>
            )}
            <Tooltip
              formatter={(value: any) => [
                showBalance ? `$${value.toLocaleString()}` : value,
                showBalance ? "Amount" : "Count",
              ]}
            />
            <Bar dataKey="value" radius={4} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
