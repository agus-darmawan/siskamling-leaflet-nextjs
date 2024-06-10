"use client";
import React, { useEffect, useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTableSkeleton } from "@/components/DataTableSkeleton";
import StatCardList from "@/components/StatCardList";
import LineChart from "@/components/LineChart";
import RepportTable from "./_report-table";
import { notFound } from "next/navigation";
import axios from "@/lib/axios";

interface Data {
  date: string;
  location: string;
  type: string;
  description: string;
}

interface AdminData {
  data: Data[];
}

const Statistika: React.FC = () => {
  const [data, setData] = useState<AdminData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/reports");
        if (!response.data) {
          notFound();
        } else {
          setData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
        notFound();
      }
    }
    fetchData();
  }, []);

  return (
    <section className="p-8">
      <CardHeader>
        <CardTitle className="text-5xl font-bold text-center text-blue-950">
          Administrator
        </CardTitle>
      </CardHeader>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <CardContent className="h-full w-[1150px]">
          {!data ? (
            <DataTableSkeleton columnCount={6} rowCount={4} />
          ) : (
            <RepportTable report={data.data} />
          )}
        </CardContent>
      </section>
    </section>
  );
};

export default Statistika;
