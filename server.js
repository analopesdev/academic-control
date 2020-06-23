const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes')

const server = express();

// Linha responsável por fazer funcionar o req.body recebendo os daados do formlulario
server.use(express.urlencoded({ extended:true}))
server.use(express.static('public'));
server.use(routes)

server.set('view engine', 'njk');

nunjucks.configure('views', {
    express: server,
    noCache: true
});

server.listen(5000, function () {
    console.log("Server is running.");
});