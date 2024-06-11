// components/PieChart.tsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";

interface PieChartProps {
  data: ChartData<"pie">;
  options?: ChartOptions<"pie">;
}

const PieChart: React.FC<PieChartProps> = ({ data, options }) => {
  return <Pie data={data} options={options} />;
};

export default PieChart;
