const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get("/", (req, res) => {
    res.render('page-events-map')
})

app.get("/lista-de-eventos", (req, res) => {
    res.render('page-events-list')
})

app.get("/login", (req, res) => {
    res.render('page-login')
})

app.get("/criar-conta", (req, res) => {
    res.render('page-sign-in')
})

app.get("/publicar-evento", (req, res) => {
    res.render('page-new-event')
})

app.get("/informacoes-evento", (req, res) => {
    res.render('page-event')
})

app.listen(8080, () => {
    console.log("Aplicação Rodando.")
})