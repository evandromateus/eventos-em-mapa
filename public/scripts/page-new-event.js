var map = L.map('mapid', { zoomControl: false }).setView([-23.5893795, -48.0427597], 13);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map);


// Propriedades do icone de marcação
const icon = L.icon({
    iconUrl: "./img/marker.svg",
    iconSize: [50, 75],
    iconAnchor: [22, 59]
});

// Marcador
let marker

// Função de clique no mapa
map.on('click', event => {
    // Pegando a latitude e longitude do local clicado no mapa
    const lat = event.latlng.lat
    const lng = event.latlng.lng

    // Passando a lat e lng para os campos input hidden na view page-new-event.ejs
    document.querySelector('[name=lat]').value = lat
    document.querySelector('[name=lng]').value = lng

    // Remove o marcador se ja existir um
    marker && map.removeLayer(marker)

    // Adiciona o marcador no mapa
    marker = L.marker([lat, lng], {icon}).addTo(map)

})