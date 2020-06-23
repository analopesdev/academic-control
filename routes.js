const express = require('express')
const routes = express.Router()
const instructors = require('./instructors')

/* ====== ROUTES ====== */
// Rota principal 
routes.get('/', (req, res) =>{
    return res.redirect('/instructors')
})

//rota instructors
routes.get('/instructors', (req, res) =>{
    return res.render('instructors/index')
})

//rota instructors create
routes.get('/instructors/create', (req, res) =>{
    return res.render('instructors/create')
})

routes.get('/instructors/:id', instructors.show)

//inserindo formulario create na página instructors
routes.post("/instructors", instructors.post)

routes.get('/members', (req, res) =>{
    return res.send('members')
})

module.exports = routes