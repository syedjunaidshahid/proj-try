// Initialize Leaflet map
const map = L.map('map').setView([38.627, -90.1994], 12); // Coordinates for Saint Louis

// Use OpenStreetMap as the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to add the specified layers on top of the basemap
function addLayers() {
  const layer0URL = 'https://services2.arcgis.com/bB9Y1bGKerz1PTl5/ArcGIS/rest/services/Drug_Crime_Within_School_Buffer_WFL1/FeatureServer/0';
  const layer4URL = 'https://services2.arcgis.com/bB9Y1bGKerz1PTl5/ArcGIS/rest/services/Drug_Crime_Within_School_Buffer_WFL1/FeatureServer/4';

  // Add layer 0
  fetch(layer0URL)
    .then(response => response.json())
    .then(data => {
      const layer0 = L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
          layer.bindPopup(`Layer 0<br>Crime Type: ${feature.properties.CrimeType}`);
        }
      }).addTo(map);
    });

  // Add layer 4
  fetch(layer4URL)
    .then(response => response.json())
    .then(data => {
      const layer4 = L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
          layer.bindPopup(`Layer 4<br>Crime Type: ${feature.properties.CrimeType}`);
        }
      }).addTo(map);
    });
}

// Call the addLayers function to load the layers
addLayers();
/ Array to store crime incidents
const crimeIncidents = [];

// Function to add a marker for a crime incident
function addCrimeIncident(lat, lng, date, crimeType, details) {
  const marker = L.marker([lat, lng]).addTo(map);
  marker.bindPopup(`<b>${crimeType}</b><br>Date: ${date}<br>${details}`);
  crimeIncidents.push({ lat, lng, date, crimeType, details });
}

// Event listener for map click to simulate reporting a crime incident
document.getElementById('addCrimeButton').addEventListener('click', function () {
  // Inform the user to click on the map to report a crime incident
  alert('Click on the map to report a crime incident.');

  // Get the map click event to add a marker at the clicked location
  map.once('click', function (e) {
    // Prompt users to enter date and additional details for the new crime incident
    const date = prompt('Enter date (YYYY-MM-DD):');
    const crimeType = prompt('Enter crime type:');
    const details = prompt('Enter additional details:');

    // Check if the entered data is valid
    if (date && crimeType && details) {
      // Add a marker for the crime incident
      addCrimeIncident(e.latlng.lat, e.latlng.lng, date, crimeType, details);
    } else {
      // Inform the user about invalid input
      alert('Invalid input. Crime incident not reported.');
    }
  });
});
