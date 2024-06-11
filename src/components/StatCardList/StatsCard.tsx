// components/StatCard.tsx
import React from "react";
import { CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
}

const StatCard: React.FunctionComponent<StatCardProps> = ({ title, value }) => {
  return (
    <CardContent className="bg-gray-300 rounded-3xl py-3 px-4 h-40 flex justify-between flex-col">
      <h2 className="text-lg font-semibold text-white text-center">{title}</h2>
      <h2 className="text-5xl font-semibold text-blue-950 mt-5 text-center pb-5">
        {value}
      </h2>
    </CardContent>
  );
};

export default StatCard;
