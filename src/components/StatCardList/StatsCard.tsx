import * as React from "react";
import { CardContent } from "@/components/ui/card";
import Image from "next/image";

interface StatCardProps {
  title: string;
  value: string | number;
}

const StatCard: React.FunctionComponent<StatCardProps> = ({ title, value }) => {
  return (
    <CardContent className="h-64 bg-gray-300  rounded-3xl py-3 px-4">
      <h2 className="text-xl font-semibold text-white">Data {title}</h2>
      <h2 className="text-5xl font-semibold text-blue-950 mt-5 text-center">
        {value}
      </h2>
      <Image
        src="/images/pir-chart.svg"
        alt="Sponsor Logo"
        width={134}
        className="mx-auto"
        height={134}
      />
    </CardContent>
  );
};

export default StatCard;
