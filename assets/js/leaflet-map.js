var map = L.map('map').setView([51.505, -0.09], 13);

map.scrollWheelZoom.disable();

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'rheinischepost.ngnam6dd',
    accessToken: 'pk.eyJ1IjoicmhlaW5pc2NoZXBvc3QiLCJhIjoiZDkzMDEwMjVjZjlhM2JiYzNhMWE5YmM1YzVlODNlMjgifQ.fTeI32PZIYzD2ND9vkMbPQ'
}).addTo(map);
