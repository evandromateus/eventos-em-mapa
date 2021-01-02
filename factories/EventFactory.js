const events = require("../models/Events")

class EventFactory{
    Build(simpleEvent){
        let day = simpleEvent.date.getDate()+1
        let month = simpleEvent.date.getMonth()
        let year = simpleEvent.date.getFullYear()

        let hour = Number.parseInt(simpleEvent.time.split(":")[0])
        let minutes = Number.parseInt(simpleEvent.time.split(":")[1])

        let date = day + "/" + month + "/" + year
        let time = hour + ":" + minutes

        let event = {
            id: simpleEvent._id,
            name: simpleEvent.name,
            date: date,
            time: time,
            category: simpleEvent.category,
            description: simpleEvent.description,
            lat: simpleEvent.lat,
            lng: simpleEvent.lng
        }

        return event
    }
}

module.exports = new EventFactory