import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken =
  "pk.eyJ1IjoiZGNoaWNjaG9uIiwiYSI6ImNrMm5saGJsczB0emYzYm05dzV4c2lnMDMifQ.mHFtuW251o5kz5nKxKvc-A";

const App = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  }, []);
  return (
    <div>
      <h2>Topo Art</h2>
      <div ref={mapContainer} className="map-container"></div>
    </div>
  );
};

export default App;
