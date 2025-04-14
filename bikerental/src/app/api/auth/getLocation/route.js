const haversine = require('haversine-distance');
const connection = require('@/db.js');

function getUserLocation(lat, lng) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM thong_tin_tram', (err, results) => {
      if (err) return reject(err);

      let closestStation = null;
      let minDistance = Infinity;

      results.forEach((tram) => {
        const stationLocation = { lat: tram.vi_do, lng: tram.kinh_do };
        const userLocation = { lat, lng };

        const distance = haversine(userLocation, stationLocation);
        if (distance < minDistance) {
          minDistance = distance;
          closestStation = tram;
        }
      });

      resolve({ station: closestStation, distance: minDistance });
    });
  });
}

module.exports = getUserLocation;
