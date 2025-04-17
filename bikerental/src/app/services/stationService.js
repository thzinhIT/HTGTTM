import db from "@/db.js";

// Hàm tính khoảng cách giữa 2 tọa độ (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // khoảng cách tính bằng mét
}

export async function findNearestStation(userLat, userLng) {
  const [stations] = await db.query("SELECT * FROM tram");

  let nearest = null;
  let minDistance = Infinity;

  stations.forEach((station) => {
    const dist = calculateDistance(userLat, userLng, station.vi_do, station.kinh_do);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = { ...station, distance: dist };
    }
  });

  return nearest;
}
