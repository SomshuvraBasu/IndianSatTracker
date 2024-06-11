const fs = require('fs');

// Read satellite data from the text file
const lines = fs.readFileSync('Positioning/satellites.txt', 'utf8').split('\n');

const satellites = [];

// Process each satellite data
for (let i = 0; i < lines.length; i += 3) {
    const name = lines[i].trim();
    const noradId = lines[i+1].trim().split(' ')[1];
    const tleLine1 = lines[i + 1].trim();
    const tleLine2 = lines[i + 2].trim();

    // Construct satellite object
    const satellite = {
        name: name,
        noradId: noradId,
        tleLine1: tleLine1,
        tleLine2: tleLine2
    };

    // Append satellite object to the array
    satellites.push(satellite);
}

// Write satellite data to a JSON file
fs.writeFileSync('Positioning/satellites.json', JSON.stringify(satellites, null, 4));
