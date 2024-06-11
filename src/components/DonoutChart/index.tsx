// components/DoughnutChart.tsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the components
ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  data: any; // Replace with proper type if known
  options?: any; // Replace with proper type if known
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, options }) => {
  const defaultOptions = {
    ...options,
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <Doughnut data={data} options={defaultOptions} className=" max-h-[35vh]" />
  );
};

export default DoughnutChart;
