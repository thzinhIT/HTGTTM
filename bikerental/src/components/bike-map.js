"use client"; // Đảm bảo chỉ chạy trên client-side

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

const MapComponent = dynamic(() => import("./LeafletMap"), { ssr: false });

const BikeMap = () => {
  return (
    <div>
      <MapComponent />
    </div>
  );
};

export default BikeMap;
