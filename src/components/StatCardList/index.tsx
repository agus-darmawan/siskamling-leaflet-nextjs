// components/StatCardList.tsx
import React from "react";
import StatCard from "./StatsCard";

interface StatusCount {
  status: string;
  count: number;
}

interface StatCardListProps {
  statusCounts: StatusCount[];
  chartDataList: any[]; // Replace 'any' with proper type if known
}

const StatCardList: React.FC<StatCardListProps> = ({
  statusCounts,
  chartDataList,
}) => {
  return (
    <div className="grid grid-cols-2 gap-10">
      {statusCounts.map((status, index) => (
        <StatCard
          key={status.status}
          title={status.status}
          value={status.count}
          chartData={chartDataList[index]}
          imageSrc={`/images/${status.status}-chart.svg`} // Assuming images are named by status
        />
      ))}
    </div>
  );
};

export default StatCardList;
