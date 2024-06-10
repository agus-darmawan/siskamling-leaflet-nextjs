import React, { FC, useEffect, useState } from "react";
import useTileStore from "@/store/useSelectedTile";
import { MdWrongLocation } from "react-icons/md";
import {
  MapContainer,
  TileLayer,
  Marker,
  GeoJSON,
  LayersControl,
  useMapEvents,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ReactDOMServer from "react-dom/server";

export interface MarkerData {
  coordinates: [number, number];
  id: string;
  status: string;
  type: string;
  date: string;
}

interface MapComponentProps {
  markers: MarkerData[] | null;
}

const MapComponent: FC<MapComponentProps> = ({ markers }) => {
  const { setSelectedTile, getSelectedTile } = useTileStore();
  const selectedTile = getSelectedTile();
  const { BaseLayer } = LayersControl;
  const [geojsonData, setGeojsonData] = useState(null);

  const LayerChangeHandler = () => {
    useMapEvents({
      baselayerchange: (event: any) => {
        console.log(event);
        setSelectedTile(event.name);
      },
    });
    return null;
  };
  const getLocationIconSvgString = () => {
    return ReactDOMServer.renderToString(
      <MdWrongLocation size={22} color="red" />
    );
  };

  const createCustomIcon = () => {
    return L.divIcon({
      html: getLocationIconSvgString(),
      className: "custom-icon",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/data/klampis.json");
      const data = await response.json();
      setGeojsonData(data);
    }
    fetchData();
  }, []);

  return (
    <MapContainer
      center={[-7.2874102, 112.7780475]}
      zoom={23}
      style={{
        height: "90vh",
        width: "70vw",
      }}
      className="mt-16 ml-auto"
    >
      <LayerChangeHandler />
      <LayersControl position={"bottomright"}>
        <BaseLayer checked={selectedTile === "Leaflet"} name="Leaflet">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </BaseLayer>
        <BaseLayer checked={selectedTile === "Default"} name="Default">
          <TileLayer
            attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${process.env.NEXT_STADIA_MAPS_API_KEY}`}
          />
        </BaseLayer>
        <BaseLayer checked={selectedTile === "Satellite"} name="Satellite">
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </BaseLayer>
      </LayersControl>
      {markers?.map((marker, index) => (
        <Marker
          key={index}
          position={marker.coordinates}
          icon={createCustomIcon()}
        >
          <Popup className="px-0 py-0">
            <div className="space-x-0 space-y-0 px-0 py-0">
              <h3 className="font-semibold">{marker.type}</h3>
              <p>{new Date(marker.date).toLocaleDateString("id-ID")}</p>
              <p>{marker.status}</p>
            </div>
          </Popup>
        </Marker>
      ))}
      {geojsonData && (
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
    </MapContainer>
  );
};

export default MapComponent;
