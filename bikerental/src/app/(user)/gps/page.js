"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import City from "../../../../public/assets/mock-data/list-station";

const icon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32], // Giữ biểu tượng cố định tại vị trí trung tâm dưới cùng
  popupAnchor: [0, -32], // Điều chỉnh vị trí popup nếu cần
});

// function haversineDistance(lat1, lng1, lat2, lng2) {
//   const R = 6371;
//   const toRad = (x) => (x * Math.PI) / 180;
//   const dLat = toRad(lat2 - lat1);
//   const dLng = toRad(lng2 - lng1);
//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// }

export default function ShortestDistancePage() {
  const [address, setAddress] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [nearest, setNearest] = useState(null);
  const [routeGeoJSON, setRouteGeoJSON] = useState(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [isClient, setIsClient] = useState(false); // Thêm state để kiểm tra môi trường client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Hàm tính khoảng cách giữa 2 điểm
  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Bán kính trái đất (km)
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Đơn vị km
    return distance;
  };
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            resolve([lat, lng]);
          },
          (error) => {
            reject("Không thể lấy vị trí hiện tại.");
          }
        );
      } else {
        reject("Trình duyệt của bạn không hỗ trợ geolocation.");
      }
    });
  };

  // const fetchRoute = async (start, end) => {
  //   const response = await fetch(
  //     "https://api.openrouteservice.org/v2/directions/foot-walking/geojson",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization:
  //           "5b3ce3597851110001cf62482db79a5e338e44d3b215892c5edac9ea", // Thay bằng API key của bạn
  //       },
  //       body: JSON.stringify({
  //         coordinates: [
  //           [start[1], start[0]], // lng, lat
  //           [end[1], end[0]], // lng, lat
  //         ],
  //       }),
  //     }
  //   );

  //   const data = await response.json();
  //   setRouteGeoJSON(data);
  // };
  const fetchRoute = async (start, end) => {
    const response = await fetch(
      "https://api.openrouteservice.org/v2/directions/foot-walking/geojson",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "5b3ce3597851110001cf62482db79a5e338e44d3b215892c5edac9ea", // Thay bằng API key của bạn
        },
        body: JSON.stringify({
          coordinates: [
            [start[1], start[0]], // lng, lat
            [end[1], end[0]], // lng, lat
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("vinh đây", data);
    setRouteGeoJSON(data);

    // Trích xuất thời gian di chuyển và cập nhật state
    const duration = data.features[0]?.properties?.summary?.duration;
    const durationInMinutes = (duration / 60).toFixed(0); // Thời gian di chuyển tính bằng phút
    setNearest((prevNearest) => ({
      ...prevNearest,
      duration: isNaN(durationInMinutes)
        ? "Không thể tính thời gian"
        : durationInMinutes,
    }));
  };

  const geocodeAddress = async () => {
    setNearest(null);
    setRouteGeoJSON(null);

    if (useCurrentLocation) {
      // Nếu checkbox đã được chọn, lấy vị trí người dùng hiện tại
      try {
        const location = await getCurrentLocation();
        setUserLocation(location); // Cập nhật vị trí người dùng
      } catch (error) {
        alert(error);
        return;
      }
    } else {
      // Xử lý khi người dùng nhập địa chỉ
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          address
        )}&format=json`
      );
      const data = await res.json();
      if (!data.length) {
        alert("Không tìm thấy địa chỉ.");
        return;
      }
      const lat = parseFloat(data[0].lat);
      const lng = parseFloat(data[0].lon);
      setUserLocation([lat, lng]);
    }

    // Sau khi có vị trí người dùng, tìm trạm gần nhất và đường đi
    let minDist = Infinity;
    let nearestStation = null;

    City.forEach((cityData) => {
      cityData.stations.forEach((station) => {
        const dist = haversineDistance(
          userLocation[0],
          userLocation[1],
          parseFloat(station.lat),
          parseFloat(station.lng)
        );
        if (dist < minDist) {
          minDist = dist;
          nearestStation = {
            ...station,
            city: cityData.city,
            distance: dist.toFixed(2),
          };
        }
      });
    });

    setNearest(nearestStation);
    // Log ra kinh độ (longitude) của trạm gần nhất
    if (nearestStation) {
      console.log(
        "Kinh độ trạm gần nhất: ",
        nearestStation?.lng,
        nearestStation?.lat
      );
    }

    if (nearestStation) {
      await fetchRoute(
        [userLocation[0], userLocation[1]],
        [nearestStation.lat, nearestStation.lng]
      );
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">
        Tìm trạm gần nhất từ địa chỉ
      </h1>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Nhập địa chỉ của bạn..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="flex-1 border rounded px-4 py-2"
        />
        <button
          onClick={geocodeAddress}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tìm
        </button>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="current-location"
          checked={useCurrentLocation}
          onChange={(e) => setUseCurrentLocation(e.target.checked)}
        />
        <label htmlFor="current-location">Vị trí của bạn hiện tại</label>
      </div>

      <div className="h-[500px] rounded overflow-hidden">
        <MapContainer
          center={userLocation ?? [10.7769, 106.7009]}
          zoom={14}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {userLocation && (
            <Marker position={userLocation} icon={icon}>
              <Popup>Vị trí của bạn</Popup>
            </Marker>
          )}

          {/* {nearest && (
            <Marker position={[nearest.lat, nearest.lng]} icon={icon}>
              <Popup>
                {nearest.name} <br />
                Cách bạn: {nearest.distance} km
              </Popup>
            </Marker>
          )} */}
          {nearest && (
            <Marker position={[nearest.lat, nearest.lng]} icon={icon}>
              <Popup>
                {nearest.name} <br />
                Cách bạn: {nearest.distance} km <br />
                Thời gian di chuyển: {nearest.duration - 140} (phút)
              </Popup>
            </Marker>
          )}

          {routeGeoJSON && (
            <GeoJSON data={routeGeoJSON} style={{ color: "red", weight: 4 }} />
          )}
        </MapContainer>
      </div>
    </div>
  );
}
