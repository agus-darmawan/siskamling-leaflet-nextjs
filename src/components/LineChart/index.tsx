// components/LineChart.tsx
import React from "react";
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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MonthData {
  month: number;
  count: number;
}

interface OrganizedStats {
  [year: string]: MonthData[];
}

interface LineChartProps {
  data: OrganizedStats;
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartLabels: string[] = [];
  const chartData: number[] = [];

  Object.keys(data).forEach((year) => {
    data[year].forEach((monthData) => {
      chartLabels.push(`${year}-${String(monthData.month).padStart(2, "0")}`);
      chartData.push(monthData.count);
    });
  });

  const chartConfig = {
    labels: chartLabels,
    datasets: [
      {
        label: "Total Kejadian",
        data: chartData,
        fill: true,
        borderColor: "rgb(12, 54, 75)",
        tension: 1,
      },
    ],
  };

  return <Line data={chartConfig} className="min-h-[45vh]" />;
};

export default LineChart;
