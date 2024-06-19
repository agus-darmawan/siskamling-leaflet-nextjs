import React, { FC, useEffect, useState } from "react";
import { RiPoliceBadgeFill } from "react-icons/ri";
import { TbMapPinExclamation } from "react-icons/tb";

import {
  MapContainer,
  TileLayer,
  Marker,
  GeoJSON,
  LayersControl,
  useMapEvents,
  Popup,
} from "react-leaflet";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ReactDOMServer from "react-dom/server";
import CloudinaryImg from "../CloudinaryImage";
import useTileStore from "@/store/useSelectedTile";

export interface MarkerData {
  coordinates: [number, number];
  id: string;
  status: string;
  type: string;
  date: string;
}

interface MapComponentProps {
  markers: MarkerData[] | null;
  showGeoJSON: boolean;
  showHeatmap: boolean;
}

const MapComponent: FC<MapComponentProps> = ({
  markers,
  showGeoJSON,
  showHeatmap,
}) => {
  const { setSelectedTile, selectedTile } = useTileStore();
  const [geojsonData, setGeojsonData] = useState<any | null>(null);
  const [postData, setPostData] = useState<any[] | null>(null);

  const LayerChangeHandler: FC = () => {
    useMapEvents({
      baselayerchange: (event: any) => {
        setSelectedTile(event.name);
      },
    });
    return null;
  };

  const policeIconSvgString = () => {
    return ReactDOMServer.renderToString(
      <RiPoliceBadgeFill size={22} color="#0C364B" />
    );
  };

  const createCustomIcon = (status: string) => {
    const statusColors: { [key: string]: string } = {
      curat: "#FF0000", // Red color for "curat" (burglary)
      maling: "#FFFF00", // Yellow color for "maling" (thief)
      curanmor: "#00FF00", // Green color for "curanmor" (motorcycle theft)
      penganiayaan: "#FFA500", // Orange color for "penganiayaan" (assault)
      penipuan: "#FF1493", // DeepPink color for "penipuan" (fraud)
      pengeroyokan: "#8A2BE2", // BlueViolet color for "pengeroyokan" (assault)
      pembobolan: "#008080", // Teal color for "pembobolan" (break-in)
      lainnya: "#808080",
      lainya: "#808080",
      // Add more as needed
    };

    const color = statusColors[status.toLowerCase()] || "#FF0000";

    const iconHtml = `
      <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill=${color}
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
        <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
  <path d="M15.005 19.31l-1.591 1.59a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 13.592 -4.638" />
  <path d="M19 16v3" />
  <path d="M19 22v.01" />
      </svg>
    `;

    return L.divIcon({
      html: iconHtml,
      className: "custom-icon",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });
  };

  const createPoliceIcon = () => {
    return L.divIcon({
      html: policeIconSvgString(),
      className: "custom-icon ",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response, responsePos] = await Promise.all([
          fetch("/data/klampis.json"),
          fetch("/data/post.json"),
        ]);

        const data = await response.json();
        const dataPost = await responsePos.json();

        setGeojsonData(data);
        setPostData(dataPost);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const customGradient = {
    0.2: "#99c8e1", // Gold
    0.4: "#78add1", // Orange
    0.6: "#4596c4", // Tomato
    0.8: "#1e7bad", // OrangeRed
    1.0: "#045a8d",
  };

  return (
    <MapContainer
      center={[-7.2874102, 112.7780475]}
      zoom={13}
      style={{ height: "94vh", width: "70%" }}
      className="mt-16 ml-auto"
    >
      <LayerChangeHandler />
      <LayersControl position="bottomright">
        <LayersControl.BaseLayer
          checked={selectedTile === "Leaflet"}
          name="Leaflet"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer
          checked={selectedTile === "Default"}
          name="Default"
        >
          <TileLayer
            attribution={`© <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> © <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
            url={`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${process.env.NEXT_STADIA_MAPS_API_KEY}`}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer
          checked={selectedTile === "Satellite"}
          name="Satellite"
        >
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      ;
      {showHeatmap && markers && (
        <HeatmapLayer
          fitBoundsOnLoad
          fitBoundsOnUpdate
          points={markers.map((marker) => ({
            lat: marker.coordinates[0],
            lng: marker.coordinates[1],
            value: 1,
          }))}
          longitudeExtractor={(m) => m.lng}
          latitudeExtractor={(m) => m.lat}
          intensityExtractor={(m) => m.value}
          gradient={customGradient}
        />
      )}
      {showGeoJSON && geojsonData && (
        <GeoJSON
          data={geojsonData}
          style={{
            color: "#9BD2EF",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.5,
          }}
        />
      )}
      {postData?.map((marker: any, index: number) => (
        <Marker
          key={`post-${index}`}
          position={[marker.lat, marker.long]}
          icon={createPoliceIcon()}
        >
          <Popup>
            <div>
              <h3>{marker.name}</h3>
              <CloudinaryImg
                publicId={`pos/${marker.name
                  .toLowerCase()
                  .replace(/\s+/g, "")}`}
                width="200"
                height="300"
                alt={marker.name}
              />
            </div>
          </Popup>
        </Marker>
      ))}
      {markers?.map((marker, index) => (
        <Marker
          key={`marker-${index}`}
          position={marker.coordinates}
          icon={createCustomIcon(marker.type)}
        >
          <Popup>
            <div>
              <h3>{marker.type}</h3>
              <p>{new Date(marker.date).toLocaleDateString("id-ID")}</p>
              <p>{marker.status}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
