var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var sessions = require('./authentication/sessions')
var authRoutes = require('./authentication/auth-routes')
var galaxyRoutes = require('./routes/galaxy-routes')
var starRoutes = require('./routes/star-routes')
var moonRoutes = require('./routes/moon-routes')
var planetRoutes = require('./routes/planet-routes')
var server = express()
var port = 3000

var dbConnect = require('./config/db/mlab-config')

server.listen(port,()=>{
  console.log('Listening on port: ', port)
})

// MIDDLEWARE
// this is your connection to the front end of our application. Eventually we won't do this
server.use(express.static(__dirname + '/public' ))

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:true})) 
server.use(sessions)

server.use('/', authRoutes)

// server.use('/api', authenticated)

server.use('/api/galaxies', galaxyRoutes)
server.use('/api/stars', starRoutes)
server.use('/api/moons', moonRoutes)
server.use('/api/planets', planetRoutes)


