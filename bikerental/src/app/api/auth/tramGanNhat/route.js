import { findNearestStation } from "@/app/services/stationService";

export async function POST(req) {
  try {
    const { latitude, longitude } = await req.json();

    if (!latitude || !longitude) {
      return new Response(JSON.stringify({ error: "Missing coordinates" }), { status: 400 });
    }

    const nearestStation = await findNearestStation(latitude, longitude);
    return new Response(JSON.stringify(nearestStation), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

