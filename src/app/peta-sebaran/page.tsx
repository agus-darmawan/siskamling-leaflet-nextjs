"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import * as React from "react";
import axios from "@/lib/axios";
import { notFound } from "next/navigation";
import { SidebarMap } from "@/components/SidebarMap";

const DynamicMapComponent = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

const PetaSebaran: React.FC = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<any | null>(null);

  // Initial fetch on mount
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get("/reports/meta");
        if (!response) {
          notFound();
        } else {
          setData(response.data.data);
          setFilteredData(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(filter);
    if (data) {
      const newFilteredData = data.filter((item: any) =>
        filter.includes(item.type)
      );
      setFilteredData(newFilteredData);
    }
  }, [filter, data]);

  return (
    <section>
      <SidebarMap selectedItems={filter} setSelectedItems={setFilter} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DynamicMapComponent markers={filteredData} />
      )}
    </section>
  );
};

export default PetaSebaran;
