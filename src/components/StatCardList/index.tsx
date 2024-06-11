import React from "react";
import StatCard from "./StatsCard";

interface StatusCount {
  status: string;
  count: number;
}

interface StatCardListProps {
  statusCounts: StatusCount[];
}

const StatCardList: React.FC<StatCardListProps> = ({ statusCounts }) => {
  return (
    <div className="grid grid-cols-4 gap-5">
      {statusCounts.map((status) => (
        <StatCard
          key={status.status}
          title={status.status}
          value={status.count}
        />
      ))}
    </div>
  );
};

export default StatCardList;
