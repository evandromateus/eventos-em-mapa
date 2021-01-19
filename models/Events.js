const mongoose = require('mongoose')

const events = new mongoose.Schema({
    name: String,
    description: String,
    address: String,
    lat: String,
    lng: String,
    date: Date,
    time: String,
    category: String,
    price: String,
    image: String,
    video: String,
    whatsapp: String,
    author: {
        uid: String,
        username: String
    },
    finished: Boolean
})

module.exports = events