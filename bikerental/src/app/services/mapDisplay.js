const getShortestPath = require('./shortestPathHandler');

async function displayMap(userLat, userLng, stationLat, stationLng) {
  const steps = await getShortestPath(userLat, userLng, stationLat, stationLng);

  steps.forEach((step) => {
    console.log(step.html_instructions); // In hướng dẫn ra console hoặc render lên UI
  });
}

module.exports = displayMap;
