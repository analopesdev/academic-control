const express = require('express')
const server = express()
const nunjucks = require('nunjucks')
const routes = require('./routes')

server.set("view engine", "njk")

//Middwres
server.use(express.static('public'))
server.use(routes)

nunjucks.configure("views",{
    express:server,
    noCache: true
})

/* rum server*/
server.listen(5000, () => {
    console.log('Server os Running')
})