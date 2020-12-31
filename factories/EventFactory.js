const events = require("../models/Events")

class EventFactory{
    Build(simpleEvent){
        let day = simpleEvent.date.getDate()+1
        let month = simpleEvent.date.getMonth()
        let year = simpleEvent.date.getFullYear()

        let date = day + "/" + month + "/" + year

        let event = {
            id: simpleEvent._id,
            name: simpleEvent.name,
            date: date,
            description: simpleEvent.description,
            lat: simpleEvent.lat,
            lng: simpleEvent.lng
        }

        return event
    }
}

module.exports = new EventFactory