const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
const EventsService = require('./services/EventsService')


app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({
    storage: storage 
})

mongoose.connect("mongodb://localhost:27017/events", {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set('useFindAndModify', false)

app.get("/", async (req, res) => {
    let events = await EventsService.GetAll()
    res.render('page-events-map', {events})
})

app.get("/filter", async (req, res) => {
    let events = await EventsService.Filter(req.query.category)
    res.render('page-events-map', {events})
})

app.get("/lista-de-eventos", async (req, res) => {
    let events = await EventsService.GetAll()
    res.render('page-events-list', {events})
})

app.get("/entrar", (req, res) => {
    res.render('page-login')
})

app.get("/criar-conta", (req, res) => {
    res.render('page-sign-up')
})

app.get("/publicar-evento", (req, res) => {
    res.render('page-new-event')
})

app.post("/cadastrar", upload.single('image'), async (req, res) => {

    let img = fs.readFileSync(req.file.path)
    let encode_image = img.toString('base64')

    let event = {
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        lat: req.body.lat,
        lng: req.body.lng,
        date: req.body.date,
        time: req.body.time,
        category: req.body.category,
        price: req.body.price,
        image: {
            contentType: req.file.mimetype,
            path: req.file.path,
            image: new Buffer.from(encode_image, 'base64')
        },
        video: req.body.video,
        whatsapp: req.body.whatsapp,
        uid: req.body.uid,
        username: req.body.username
    }

    let status = await EventsService.Create(event)

    if(status){
        res.redirect("/")
    }else{
        res.send("Ocorreu uma falha!!")
    }

})

app.get("/evento/:id", async (req, res) => {
    let event = await EventsService.GetById(req.params.id)
    res.render('page-event', {event})
})

app.listen(8080, () => {
    console.log("Aplicação Rodando.")
})