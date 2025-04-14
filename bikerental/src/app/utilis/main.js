const getUserLocation = require('./userLocationHandler');
const displayMap = require('./mapDisplay');

async function main() {
  const userLat = 10.762622; // Lấy từ Geolocation API của trình duyệt
  const userLng = 106.660172;

  try {
    const { station } = await getUserLocation(userLat, userLng);
    console.log('Trạm gần nhất:', station);

    await displayMap(userLat, userLng, station.vi_do, station.kinh_do);
  } catch (error) {
    console.error('Lỗi:', error);
  }
}

main();
