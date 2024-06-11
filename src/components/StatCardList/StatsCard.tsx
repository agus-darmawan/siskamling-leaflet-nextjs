// components/StatCard.tsx
import React from "react";
import { CardContent } from "@/components/ui/card";
import PieChart from "./PIeChart";
import Image from "next/image";

interface StatCardProps {
  title: string;
  value: string | number;
  chartData?: any; // Replace 'any' with proper type if known
  imageSrc?: string; // New prop for dynamic image source
}

const StatCard: React.FunctionComponent<StatCardProps> = ({
  title,
  value,
  chartData,
  imageSrc,
}) => {
  return (
    <CardContent className="h-64 bg-gray-300 rounded-3xl py-3 px-4">
      <h2 className="text-xl font-semibold text-white">Data {title}</h2>
      <h2 className="text-5xl font-semibold text-blue-950 mt-5 text-center">
        {value}
      </h2>
      {chartData ? (
        <PieChart data={chartData} />
      ) : (
        <Image
          src={imageSrc || "/images/default-chart.svg"}
          alt="Chart Image"
          width={134}
          height={134}
          className="mx-auto"
        />
      )}
    </CardContent>
  );
};

export default StatCard;
