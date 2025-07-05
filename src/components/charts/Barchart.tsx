"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: Array<{ _id: string; count: number; totalBalance?: number }>;
  title: string;
  showBalance?: boolean;
  horizontal?: boolean;
}

const BarChart = ({
  data,
  title,
  showBalance = false,
  horizontal = false,
}: BarChartProps) => {
  const chartData = {
    labels: data.map((item) => item._id || "Unknown"),
    datasets: [
      {
        label: showBalance ? "Total Amount ($)" : "Count",
        data: showBalance
          ? data.map((item) => item.totalBalance || 0)
          : data.map((item) => item.count),
        backgroundColor: "#104042",
        borderColor: "#104042",
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? ("y" as const) : ("x" as const),
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed.y || context.parsed.x;
            return showBalance ? `$${value.toLocaleString()}` : `${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#f3f4f6",
        },
        ticks: {
          font: {
            size: 12,
          },
          callback: (value) =>
            showBalance ? `$${Number(value).toLocaleString()}` : value,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="h-80">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
