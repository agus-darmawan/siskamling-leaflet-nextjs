// components/BarChart.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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

interface BarChartProps {
  data: OrganizedStats;
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartLabels: string[] = [];
  const datasets: any[] = [];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const colors = ["#1A7EAF", "#206C92", "#215772", "#1B3A4A", "#16252C"];

  // Collect all unique months from all years for the x-axis labels
  const allMonths = new Set<number>();
  Object.keys(data).forEach((year) => {
    data[year].forEach((monthData) => {
      allMonths.add(monthData.month);
    });
  });
  const sortedMonths = Array.from(allMonths).sort((a, b) => a - b);

  Object.keys(data).forEach((year, index) => {
    const yearData: number[] = new Array(sortedMonths.length).fill(0);
    data[year].forEach((monthData) => {
      const monthIndex = sortedMonths.indexOf(monthData.month);
      if (monthIndex !== -1) {
        yearData[monthIndex] = monthData.count;
      }
    });

    datasets.push({
      label: `Total Kejadian ${year}`,
      data: yearData,
      backgroundColor: colors[index % colors.length],
      borderColor: colors[index % colors.length],
      borderWidth: 1,
    });
  });

  sortedMonths.forEach((month) => {
    chartLabels.push(monthNames[month - 1]);
  });

  const chartConfig = {
    labels: chartLabels,
    datasets: datasets,
    animation: {
      animateScale: true,
    },
  };

  return <Bar data={chartConfig} className="min-h-[45vh]" />;
};

export default BarChart;
