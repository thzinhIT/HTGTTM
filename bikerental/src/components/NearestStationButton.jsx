"use client"; // nếu bạn dùng Next.js App Router

import React from "react";

const NearestStationButton = () => {
  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const res = await fetch("/api/station/nearest", {
        method: "POST",
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      });
      const data = await res.json();
      console.log("Nearest Station:", data);
    });
  };

  return <button onClick={handleClick}>Tìm trạm gần nhất</button>;
};

export default NearestStationButton;
