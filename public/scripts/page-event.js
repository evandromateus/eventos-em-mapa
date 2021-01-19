let lat = document.querySelector('#lat')
let lng = document.querySelector('#lng')
let category = document.querySelector('#category')

var map = L.map('mapid', { zoomControl: false }).setView([lat.value, lng.value], 15);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map);

const icon = L.icon({
    iconUrl: `/img/marker${category.value}-blue.svg`,
    iconSize: [40, 60],
    iconAnchor: [22, 59],
    popupAnchor: [155, 15]
  })

  L.marker([lat.value, lng.value], {icon})
  .addTo(map)