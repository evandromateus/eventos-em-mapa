const events = require("../models/Events")

class EventFactory{
    Build(simpleEvent){
        let day = (simpleEvent.date.getDate()+1).toString().padStart(2, '0')
        let month = (simpleEvent.date.getMonth()+1).toString().padStart(2, '0') 
        let year = simpleEvent.date.getFullYear()

        let hour = Number.parseInt(simpleEvent.time.split(":")[0]).toString().padStart(2, '0')
        let minutes = Number.parseInt(simpleEvent.time.split(":")[1]).toString().padStart(2, '0')

        let date = day + "/" + month + "/" + year
        let time = hour + ":" + minutes

        //let fullDate = new Date(year,month-1, day, hour, minutes, 0, 0)

        

        let event = {
            id: simpleEvent._id,
            name: simpleEvent.name,
            date: date,
            time: time,
            category: simpleEvent.category,
            description: simpleEvent.description,
            lat: simpleEvent.lat,
            lng: simpleEvent.lng,
            image: simpleEvent.image
        }

        return event
    }
}

module.exports = new EventFactory