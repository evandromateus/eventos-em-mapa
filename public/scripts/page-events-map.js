// Criando o mapa
var map = L.map('mapid', { zoomControl: false }).setView([-23.5893795, -48.0427597], 14);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map);



// Essa função espera receber do banco de dados o id, name, lat, lng para adicionar o marcador e direcionar a página de informações
function addMarker({id, name, date, hour, category, lat, lng}){

   // Propriedades do popup
  let popupContent = `<div><h4>${name}</h4> <span>${category}</span> <br> <span>${date} - ${hour}</span></div> <a href="/evento/${id}"><i class='bx bx-right-arrow-circle'></i></a>`
  
  const popup = L.popup({
    closeButton: false,
    className: 'map-popup',
    minWidth: 240,
    minHeight: 300
  }).setContent(popupContent)

  color = colorByDate(date)

  const icon = L.icon({
    iconUrl: `/img/marker${category}-${color}.svg`,
    iconSize: [40, 60],
    iconAnchor: [22, 59],
    popupAnchor: [155, 15]
  })

  // Criando o marcador com base na latitude e longitude recebidas do banco de dados
  L.marker([lat, lng], {icon})
  .addTo(map)
  .bindPopup(popup)

}

  // Definindo a cor do marcador com base na data
function colorByDate(date){
  
  let days = 1000*60*60*24*10 // 10 dias em milisegundos
  let todayDate = new Date()

  let day = todayDate.getDate().toString().padStart(2, '0')
  let month = (todayDate.getMonth()+1).toString().padStart(2, '0') 
  let year = todayDate.getFullYear()
  let today = day+"/" + month + "/" + year

  let parts = date.split('/')
  let dateEvent = new Date(parts[2], parts[1] -1, parts[0])
  let diff = dateEvent.getTime() - todayDate.getTime()


  let color

  if(date == today){
    color = "green"
  }else if(diff < days && dateEvent > todayDate){
    color = "yellow"
  }else if(dateEvent < todayDate){
    color = "red"
  }else{
    color = "blue"
  }

  return color

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

// Modal
function startModal(modalId){
  const modal = document.getElementById(modalId)
  if(modal){
    modal.classList.add('display')
    modal.addEventListener('click', (e) => {
      if(e.target.id == modalId){
        modal.classList.remove('display')
      }
    })
  }
}

const filterBtn = document.querySelector('#filter')
filterBtn.addEventListener('click', () => startModal('modal-container'))
