var express = require('express')
var server = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var dbConnect = require('./config/db/mlab-config')
var galaxyRoutes = require('./routes/galaxy-routes')
var starRoutes = require('./routes/star-routes')
var moonRoutes = require('./routes/moon-routes')
var planetRoutes = require('./routes/planet-routes')
var port = 3000

server.listen(port,()=>{
  console.log('Listening on port: ', port)
})

// MIDDLEWARE
// this is your connection to the front end of our application. Eventually we won't do this
server.use(express.static(__dirname + '/public' ))

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:true})) 

server.use('/api/galaxies', galaxyRoutes)
server.use('/api/stars', starRoutes)
server.use('/api/moons', moonRoutes)
server.use('/api/planets', planetRoutes)


