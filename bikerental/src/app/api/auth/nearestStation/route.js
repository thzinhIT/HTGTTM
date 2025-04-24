import { findNearestStation } from "@/app/services/stationService";

export async function POST(req) {
  try {
    const { address } = await req.json();
    if (!address) {
      return new Response(JSON.stringify({ error: "Missing address" }), { status: 400 });
    }

    // 1. Geocode the address
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
    const geoData = await geoRes.json();
    if (geoData.length === 0) throw new Error("Không tìm thấy vị trí");

    const { lat, lon } = geoData[0];
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);

    // 2. Tìm trạm gần nhất
    const nearestStation = await findNearestStation(latitude, longitude);

    // 3. Tính đường đi ngắn nhất (nếu muốn)
    // const route = await getRoute({ lat: latitude, lng: longitude }, { lat: nearestStation.lat, lng: nearestStation.lng });

    return new Response(JSON.stringify({
      station: nearestStation,
      userLocation: { latitude, longitude },
      // route
    }), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
