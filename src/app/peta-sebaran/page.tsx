"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import * as React from "react";
import axios from "@/lib/axios";
import { notFound } from "next/navigation";
import { SidebarMap } from "@/components/SidebarMap";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";

const DynamicMapComponent = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

const PetaSebaran: React.FC = () => {
  const [showGeoJSON, setShowGeoJSON] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(true);
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
    if (data) {
      const newFilteredData = data.filter((item: any) =>
        filter.includes(item.type)
      );
      setFilteredData(newFilteredData);
    }
  }, [filter, data]);

  const toggleGeoJSON = () => {
    setShowGeoJSON(!showGeoJSON);
  };

  const toggleHeatmap = () => {
    setShowHeatmap(!showHeatmap);
  };

  return (
    <section>
      <SidebarMap selectedItems={filter} setSelectedItems={setFilter} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="absolute left-64 bottom-6 z-50">
            <div className="flex items-center space-x-2">
              {showGeoJSON ? (
                <CheckCircledIcon
                  className="h-6 w-6 text-green-500"
                  onClick={toggleGeoJSON}
                />
              ) : (
                <CrossCircledIcon
                  className="h-6 w-6 text-red-500"
                  onClick={toggleGeoJSON}
                />
              )}
              <label>Show GeoJSON</label>
            </div>
            <div className="flex items-center space-x-2">
              {showHeatmap ? (
                <CheckCircledIcon
                  className="h-6 w-6 text-green-500"
                  onClick={toggleHeatmap}
                />
              ) : (
                <CrossCircledIcon
                  className="h-6 w-6 text-red-500"
                  onClick={toggleHeatmap}
                />
              )}
              <label>Show Kernel</label>
            </div>
          </div>
          <DynamicMapComponent
            markers={filteredData}
            showGeoJSON={showGeoJSON}
            showHeatmap={showHeatmap}
          />
        </>
      )}
    </section>
  );
};

export default PetaSebaran;
