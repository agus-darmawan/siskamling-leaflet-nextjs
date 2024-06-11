"use client";
import React, { useEffect, useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCardList from "@/components/StatCardList";
import LineChart from "@/components/LineChart";
import { notFound } from "next/navigation";
import axios from "@/lib/axios";
import Link from "next/link";
import DoughnutChart from "@/components/DonoutChart";

interface StatusCount {
  status: string;
  count: number;
}

interface MonthData {
  month: number;
  count: number;
}

interface OrganizedStats {
  [year: string]: MonthData[];
}

interface StatsData {
  statusCounts: StatusCount[];
  organizedStats: OrganizedStats;
}

const Statistika: React.FC = () => {
  const [data, setData] = useState<StatsData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/reports/stats");
        if (!response.data) {
          notFound();
        } else {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
        notFound();
      }
    }
    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  const { statusCounts, organizedStats } = data;

  // Example chart data for each status count
  const filteredStatusCounts = statusCounts.filter(
    (status) => status.status.toLowerCase() !== "terlapor"
  );

  const chartData = {
    labels: filteredStatusCounts.map((status) => status.status),
    datasets: [
      {
        data: filteredStatusCounts.map((status) => status.count),
        backgroundColor: [
          "#1A7EAF",
          "#206C92",
          "#215772",
          "#1B3A4A",
          "#16252C",
        ],
        hoverBackgroundColor: [
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <section className="p-8">
      <CardHeader>
        <CardTitle className="text-5xl font-bold text-center text-blue-950">
          Data Statistika
        </CardTitle>
      </CardHeader>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="grid grid-cols-1 grid-rows-1 gap-10">
          <StatCardList statusCounts={statusCounts} />
          <CardContent className="h-full bg-gray-300 rounded-3xl p-6">
            <DoughnutChart data={chartData} />
          </CardContent>
        </div>
        <CardContent className="h-full bg-gray-300 rounded-3xl p-6">
          <h2 className="text-2xl text-white text-center font-bold mb-4">
            Total Kejadian per Bulan
          </h2>
          <LineChart data={organizedStats} />
          <p className="text-center text-gray-500 text-sm">
            Data diatas merupakan total kejadian yang terjadi pada setiap bulan
            untuk melihat data lebih detil dapat dilihat pada link{" "}
            <Link
              href={"/data"}
              className="text-blue-500 cursor-pointer hover:text-blue-400"
            >
              berikut
            </Link>
          </p>
        </CardContent>
      </section>
    </section>
  );
};

export default Statistika;
