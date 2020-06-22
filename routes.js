const express = require('express')
const routes = express.Router()

routes.get('/', function(req, res){
    return res.redirect("/instructors")
})

routes.get('/instructors', function(req, res){
    return res.render("instructors/index")
})

routes.get('/members', function(req, res){
    return res.send("members")
})

routes.get('/instructors/create', (req, res) =>{
    return res.render("instructors/create")
})

routes.post('/instructors', (req, res) =>{
    //req.body
    //cria um array com as chaves no objeto
    const keys = Object.keys(req.body)

    for(let key of keys){
        //req.body.key == ""
       if(req.body[key] == "" )
           return res.send('Please, fill all filds')
    }
    return res.send(req.body)
})
module.exports = routes