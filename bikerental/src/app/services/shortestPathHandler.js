const fetch = require('node-fetch');

async function getShortestPath(userLat, userLng, stationLat, stationLng) {
  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${userLat},${userLng}&destination=${stationLat},${stationLng}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.routes && data.routes.length > 0) {
      return data.routes[0].legs[0].steps; // Trả về các bước hướng dẫn
    } else {
      throw new Error('Không tìm thấy đường đi.');
    }
  } catch (error) {
    console.error('Lỗi API:', error);
  }
}

module.exports = getShortestPath;
