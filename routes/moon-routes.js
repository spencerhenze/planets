var express = require('express')
var router = express.Router()
var galaxies = require('../models/galaxy') //import your galaxy model
var stars = require ('../models/star')
var planets = require('../models/moon')


router
    // DEFAULT ROUTES
    .get('/', (req, res, next) => {
        moons.find(req.query)
            .then(moons => {    //this is returning all of the moons that match the query (array)
                res.send(moons)
            })
            .catch(next)
    })

    .post('/', (req, res, next) => [
        moons.create(req.body)
            .then(moon => {
                res.send(moon)
            })
            .catch(next)
    ])

    .put('/:id', (req, res, next) => {
        var id = req.params.id
        moons.findByIdAndUpdate(id, req.body)
            .then(moon => {
                res.send({ message: 'Successfully updated' });
            })
            .catch(next)
    })

    .delete('/:id', (req, res, next) => {
        moons.findByIdAndRemove(req.params.id)
            .then(moon => {
                res.send({ message: 'Successfully Removed' })
            })
            .catch(next)
    })
// eventually we are not going to have to be responsible for writing these standard operations. A lot of times
// you can have them built into your framework for you becase every model will need to be interacted with this way.

    //CUSTOM ROUTES - define how a user interacts with your data. Build your API that forces the user to specify so the queries aren't huge
    // .get('/:id/stars', (req, res, next) => {
    //     stars.find({ galaxyId: req.params.id }) //querying the stars collection with a hard coded filter that only returns stars that have the galaxy id in the query.
    //         .then(galaxy => {
    //             res.send(galaxy)
    //         })
    //         .catch(next);
    // })

    // .get('/:id/stars/:starId/moons', (req, res, next) => {
    //     planets.find({ starId: req.params.starId }) //querying the stars collection with a hard coded filter that only returns stars that have the galaxy id in the query.
    //         .then(stars => {
    //             res.send(stars)
    //         })
    //         .catch(next);
    // })







// Error handler
router.use('/', (err, req, res, next) => {
    if (err) {
        res.send({
            success: false,
            error: err.message     //anything above 200 is an error, 300s are redirects, 400s are errors in the request itself, 500s are server errors
        })
    }
    else {  //if we get here it means someone called next but didn't give it an error.
        res.send(400, {
            success: false,
            error: 'Bad request'
        })
    }
})

module.exports = router;