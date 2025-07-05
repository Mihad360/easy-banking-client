"use client";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: Array<{ _id: string; count: number; totalBalance?: number }>;
  title: string;
  showBalance?: boolean;
}

const PieChart = ({ data, title, showBalance = false }: PieChartProps) => {
  const colors = [
    "#104042",
    "#2D6A4F",
    "#40916C",
    "#52B788",
    "#74C69D",
    "#95D5B2",
    "#B7E4C7",
    "#D8F3DC",
  ];

  const chartData = {
    labels: data.map((item) => item._id || "Unknown"),
    datasets: [
      {
        data: showBalance
          ? data.map((item) => item.totalBalance || 0)
          : data.map((item) => item.count),
        backgroundColor: colors.slice(0, data.length),
        borderColor: colors.slice(0, data.length),
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.parsed;
            const total = context.dataset.data.reduce(
              (a: number, b: number) => a + b,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${
              showBalance ? "$" + value.toLocaleString() : value
            } (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        {title}
      </h3>
      <div className="h-80">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
