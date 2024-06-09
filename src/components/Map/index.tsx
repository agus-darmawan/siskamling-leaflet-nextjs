import React, { FC } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

interface MarkerData {
  coordinates: [number, number];
  id: string;
}

interface MapComponentProps {
  markers: MarkerData[];
}

const MapComponent: FC<MapComponentProps> = ({ markers }) => {
  return (
    <MapContainer
      center={[-7.2874102, 112.7780475]}
      zoom={15}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.coordinates}></Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
