// Criando o mapa
var map = L.map('mapid', { zoomControl: false }).setView([-23.5893795, -48.0427597], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


// Propriedades do ícone
const icon = L.icon({
    iconUrl: "/img/marker.svg",
    iconSize: [50, 75],
    iconAnchor: [22, 59],
    popupAnchor: [164, 15]
  })


// Essa função espera receber do banco de dados o id, name, lat, lng para adicionar o marcador e direcionar a página de informações
function addMarker({id, name, date, hour, category, lat, lng}){

  let popupContent = `<div><h4>${name}</h4> <span>${category}</span> <br> <span>${date} - ${hour}</span></div> <a href="/evento/${id}"><i class='bx bx-right-arrow-circle'></i></a>`

  // Propriedades do popup
  const popup = L.popup({
    closeButton: false,
    className: 'map-popup',
    minWidth: 240,
    minHeight: 300
  }).setContent(popupContent)

  // Criando o marcador com base na latitude e longitude recebidas do banco de dados
  L.marker([lat, lng], {icon})
  .addTo(map)
  .bindPopup(popup)

}

// Pegando os spans da view page-events-map.ejs que contém os dados necessários do banco de dados
const eventsSpan = document.querySelectorAll('.events span')

// Para span que foi criado, será executada a função:
eventsSpan.forEach(span => {

  // event recebe os dados que foram passados no span da view page-events-map.ejs
  const event = {
    id: span.dataset.id,
    name: span.dataset.name,
    date: span.dataset.date,
    hour: span.dataset.time,
    category: span.dataset.category,
    lat: span.dataset.lat,
    lng: span.dataset.lng
  }

  // Passa o event como parâmetro da função addMarker que espera os dados que foram passados no event
  addMarker(event)

})