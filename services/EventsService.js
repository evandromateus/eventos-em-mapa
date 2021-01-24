const eventsModel = require('../models/Events')
const mongoose = require('mongoose')
const EventFactory = require('../factories/EventFactory')

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
            image: event.image.path,
            video: event.video,
            whatsapp: event.whatsapp,
            author: {
                uid: event.uid,
                username: event.username
            },
            finished: false
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
        this.finishEvents()
        let events = await Event.find({finished: false})
        let eventsCard = []
        events.forEach(event => {
            eventsCard.push( EventFactory.Build(event) )
        })
        return eventsCard
    }

    async GetById(id){
        try { 
            let event = await Event.findById(id)
            return event
        } catch (err) {
            console.log(err)
        }
    }

    async finishEvents(){
        let events = await Event.find()
        events.forEach(async event => {
            let todayDate = new Date()
            let dateEvent = event.date
            let diff = todayDate.getTime() - dateEvent.getTime()
            let days = 1000*60*60*24*10

            if(todayDate.getTime() > dateEvent.getTime() && diff > days){
                await Event.findByIdAndUpdate(event._id, {finished: true})
            }
        })
    }

    async Filter(query){
        try {
            let events = await Event.find({category: query})
            let eventsCard = []
            events.forEach(event => {
                eventsCard.push( EventFactory.Build(event) )
            })
            return eventsCard
        } catch (err) {
            console.log(err)
        }
    }

    async GetByUserId(uid){
        try {
            let events = await Event.find({'author.uid': uid})
            let eventsCard = []
            events.forEach(event => {
                eventsCard.push( EventFactory.Build(event) )
            })
            return eventsCard
        } catch (err) {
            console.log(err)
        }
    }

    async Delete(id){
        try {
            await Event.findByIdAndDelete({'_id': id})
        } catch (err) {
            console.log(err)
        }
    }

    async Update(id, event){
        try {
            await Event.findByIdAndUpdate(id, {$set: event})
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

}

module.exports = new EventsService