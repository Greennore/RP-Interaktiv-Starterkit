var map = L.map('map').setView([37.8, -96], 4);

map.scrollWheelZoom.disable();


L.tileLayer
    ('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',{
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'rheinischepost.ngnam6dd',
    accessToken: 'pk.eyJ1IjoicmhlaW5pc2NoZXBvc3QiLCJhIjoiZDkzMDEwMjVjZjlhM2JiYzNhMWE5YmM1YzVlODNlMjgifQ.fTeI32PZIYzD2ND9vkMbPQ'
}).addTo(map);

//Adding Some Color

function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

var geoJson;
geojson = L.geoJson(statesData, {style: style}).addTo(map);

// mouseover event

function highlightFeature(e) {
    //console.log("#43 highlightFeature", e);
    var layer = e.target;
    info.update(layer.feature.properties);

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}

//mouseout

function resetHighlight(e) {
    //console.log("#61 resetHighlight", e);
    geojson.resetStyle(e.target);
    info.update();
}

//The handy geojson.resetStyle method will reset the layer style to its default state (defined by our style function). For this to work, make sure our GeoJSON layer is accessible through the geojson variable by defining it before our listeners and assigning the layer to it later:

/*var geojson;
// ... our listeners
geojson = L.geoJson(...);*/

//a click listener that zooms to the state

function zoomToFeature(e) {
    //console.log("#73 onEachFeature");
    //map.fitBounds(e.target.getBounds());
}

//onEachFeature option to add the listeners on our state layers

function onEachFeature(feature, layer) {
    //console.log("#79 onEachFeature", layer, highlightFeature);
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

//Custom Info Control

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
        : 'Hover over a state');
};

info.addTo(map);

//We need to update the control when the user hovers over a state, so we’ll also modify our listeners as follows:

//Custom Legend Control

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);
