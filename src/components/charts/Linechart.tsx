/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartProps {
  data: Array<{ _id: { day: number; type: string }; dailyAmount: number }>;
  title: string;
}

const LineChart = ({ data, title }: LineChartProps) => {
  // Process data to group by transaction type
  const processedData = data.reduce((acc: any, item) => {
    const type = item._id.type;
    const day = item._id.day;

    if (!acc[type]) {
      acc[type] = {};
    }
    acc[type][day] = item.dailyAmount;
    return acc;
  }, {});

  // Get all unique days and sort them
  const allDays = [...new Set(data.map((item) => item._id.day))].sort(
    (a, b) => a - b
  );

  const colors = [
    "#104042",
    "#2D6A4F",
    "#40916C",
    "#52B788",
    "#74C69D",
    "#95D5B2",
  ];

  const datasets = Object.keys(processedData).map((type, index) => ({
    label: type.charAt(0).toUpperCase() + type.slice(1),
    data: allDays.map((day) => processedData[type][day] || 0),
    borderColor: colors[index % colors.length],
    backgroundColor: colors[index % colors.length] + "20",
    fill: false,
    tension: 0.4,
    pointRadius: 4,
    pointHoverRadius: 6,
  }));

  const chartData = {
    labels: allDays.map((day) => `Day ${day}`),
    datasets,
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        grid: {
          color: "#f3f4f6",
        },
        ticks: {
          callback: (value) => "$" + Number(value).toLocaleString(),
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
