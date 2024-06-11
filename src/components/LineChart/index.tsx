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
  const datasets: any[] = [];

  // Collect all unique months from all years for the x-axis labels
  const allMonths = new Set<string>();
  Object.keys(data).forEach((year) => {
    data[year].forEach((monthData) => {
      allMonths.add(String(monthData.month).padStart(2, "0"));
    });
  });
  const sortedMonths = Array.from(allMonths).sort(
    (a, b) => parseInt(a) - parseInt(b)
  );

  Object.keys(data).forEach((year) => {
    const yearData: number[] = new Array(sortedMonths.length).fill(0);
    data[year].forEach((monthData) => {
      const monthIndex = sortedMonths.indexOf(
        String(monthData.month).padStart(2, "0")
      );
      if (monthIndex !== -1) {
        yearData[monthIndex] = monthData.count;
      }
    });

    datasets.push({
      label: `Total Kejadian ${year}`,
      data: yearData,
      fill: false,
      borderColor: getRandomColor(),
      tension: 0.1,
    });
  });

  const chartConfig = {
    labels: sortedMonths.map((month) => `Month ${month}`),
    datasets: datasets,
  };

  return <Line data={chartConfig} className="min-h-[45vh]" />;
};

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default LineChart;
