/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface LineChartProps {
  data: any[];
  title: string;
  color?: string;
  compact?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  title,
  color = "#dc2626",
  compact = false,
}) => {
  const chartData = data.map((item) => ({
    date: new Date(item._id || item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    value: item.count || item.amount || 0,
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
          <RechartsLineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" fontSize={compact ? 10 : 12} />
            <YAxis fontSize={compact ? 10 : 12} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChart;
