const express = require('express')
const routes = express.Router()
const instructors = require('./instructors')

/* ====== ROUTES ====== */
// Rota principal 
routes.get('/', (req, res) =>{
    return res.redirect('/instructors')
})

//rota instructors
routes.get('/instructors', instructors.index)

//rota instructors create
routes.get('/instructors/create', (req, res) =>{
    return res.render('instructors/create')
})

routes.get('/instructors/:id', instructors.show)

routes.get('/instructors/:id/edit', instructors.edit)

//inserindo formulario create na página instructors
routes.post("/instructors", instructors.post)

routes.put("/instructors", instructors.put)

routes.delete("/instructors", instructors.delete)

routes.get('/members', (req, res) =>{
    return res.send('members')
})

module.exports = routes

/**
 * HTTP VERBS
 * GET : RECEBER RESOURCE
 * POST : CRIAR RESOURCE
 * POST : CRIAR UM NOVO RESOURCE COM DADOS ENVIADOS
 * PUT : ATUALIZAR RESOURCE
 * DELETE : DELETAR RESOURCE
 *  */ 