const fs = require('fs');
const satelliteJS = require('satellite.js');

// Read satellite data from JSON file
const satelliteData = JSON.parse(fs.readFileSync('satellites.json'));

// Function to calculate and display satellite position
function updateSatelliteLocation(satellite) {

    const satrec = satelliteJS.twoline2satrec(satellite.tleLine1, satellite.tleLine2);

    const date = new Date();
    const positionAndVelocity = satelliteJS.propagate(satrec, date);
    const gmst = satelliteJS.gstime(date);
    const positionEci = positionAndVelocity.position;
    const positionGd = satelliteJS.eciToGeodetic(positionEci, gmst);

    const latitude = satelliteJS.degreesLat(positionGd.latitude);
    const longitude = satelliteJS.degreesLong(positionGd.longitude);

    console.log(`Current ${satellite.name} Location: Latitude - ${latitude.toFixed(4)}, Longitude - ${longitude.toFixed(4)}`);

}

// Loop through each satellite and update its location
function updateAllSatellites() {
    satelliteData.forEach(satellite => {
        updateSatelliteLocation(satellite);
    });
}

// Update all satellites every second
setInterval(updateAllSatellites, 1000);
