// Initialize Leaflet map
const map = L.map('map').setView([40.7128, -74.0060], 12); // Default to New York

// Use OpenStreetMap as the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Array to store user recommendations
const userRecommendations = [];

// Function to add a marker for user recommendation
function addUserRecommendation(lat, lng, name, cuisine, comments, rating) {
  const marker = L.marker([lat, lng]).addTo(map);
  marker.bindPopup(`<b>${name}</b><br>${cuisine}<br>${comments}<br>Rating: ${rating}`);
  userRecommendations.push({ lat, lng, name, cuisine, comments, rating });
}

// Example: Adding a user recommendation
addUserRecommendation(40.7128, -74.0060, 'Local Delight', 'Italian', 'Great pasta!', 4.5);

// Event listener for map click to simulate user recommendation
map.on('click', function (e) {
  const name = prompt('Enter restaurant name:');
  const cuisine = prompt('Enter cuisine type:');
  const comments = prompt('Enter comments:');
  const rating = parseFloat(prompt('Enter rating (1-5):'));

  if (name && cuisine && comments && !isNaN(rating) && rating >= 1 && rating <= 5) {
    addUserRecommendation(e.latlng.lat, e.latlng.lng, name, cuisine, comments, rating);
  } else {
    alert('Invalid input. Please try again.');
  }
});
