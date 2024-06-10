"use client";
import dynamic from "next/dynamic";
import * as React from "react";
import type { MarkerData } from "@/components/Map";
const DynamicMapComponent = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

const PetaSebaran: React.FC = () => {
  const markers: MarkerData[] = [
    {
      coordinates: [-7.2874102, 112.7780475],
      id: "some_id", // Example ID
    },
  ];

  return (
    <main>
      <DynamicMapComponent markers={markers} />
    </main>
  );
};

export default PetaSebaran;
