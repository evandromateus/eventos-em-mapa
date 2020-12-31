const eventsModel = require('../models/Events')
const mongoose = require('mongoose')
const EventFactory = require('../factories/EventFactory')
const events = require('../models/Events')

const Event = mongoose.model("Events", eventsModel)

class EventsService{
    async Create(event){
        let newEvent = new Event({
            name: event.name,
            description: event.description,
            address: event.address,
            lat: event.lat,
            lng: event.lng,
            date: event.date,
            time: event.time,
            category: event.category,
            price: event.price,
            image: event.image,
            video: event.video
        })

        try {
            await newEvent.save()
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async GetAll(){
        let events = await Event.find()
        let eventsCard = []

        events.forEach(event => {
            eventsCard.push( EventFactory.Build(event) )
        })

        return eventsCard
    }

    async GetById(id){
        try {
            let event = await Event.findOne({'_id': id})
            return event
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = new EventsService