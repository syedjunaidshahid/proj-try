// URL for US states dataset
const statesPath = 'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json';

// URL for US state capitals dataset
const capitalsPath = 'https://gist.githubusercontent.com/mcwhittemore/1f81416ff74dd64decc6/raw/f34bddb3bf276a32b073ba79d0dd625a5735eedc/usa-state-capitals.geojson';

// Initialize Leaflet map
const map = L.map('map').setView([37.8, -96], 4); // Adjust the center and zoom level

// Use Stadia Maps Alidade Satellite tile layer
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    attribution: '© Stadia Maps',
    maxZoom: 18,
}).addTo(map);

// Load GeoJSON data for US states and capitals
(async () => {
    const statesData = await fetch(statesPath).then(response => response.json());
    const capitalsData = await fetch(capitalsPath).then(response => response.json());

    // Add GeoJSON layers for US states and capitals
    const statesLayer = L.geoJSON(statesData, {
        style: {
            fillOpacity: 0.5,
            color: 'white',
            weight: 2
        },
        onEachFeature: onEachState
    }).addTo(map);

    const capitalsLayer = L.geoJSON(capitalsData, {
        pointToLayer: (feature, latlng) => {
            return L.circleMarker(latlng, {
                radius: 8,
                fillColor: 'red',
                color: '#fff',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        onEachFeature: onEachCapital
    }).addTo(map);
})();

// Function to handle quiz interaction for US states
function onEachState(feature, layer) {
    layer.on({
        click: handleStateClick
    });
}

// Function to handle quiz interaction for US state capitals
function onEachCapital(feature, layer) {
    layer.on({
        click: handleCapitalClick
    });
}

// Function to handle US state click event
function handleStateClick(e) {
    const clickedState = e.target.feature.properties.name;
    alert(`You clicked on ${clickedState} (State)!`);
    // Implement scoring and next question logic for US states
}

// Function to handle US state capital click event
function handleCapitalClick(e) {
    const clickedCapital = e.target.feature.properties.name;
    alert(`You clicked on ${clickedCapital} (State Capital)!`);
    // Implement scoring and next question logic for US state capitals
}
