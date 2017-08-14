var express = require('express')
var router = express.Router()
var stars = ('../models/star')


router
    // DEFAULT ROUTES
    .get('/', (req, res, next) => {
        stars.find(req.query)
            .then(stars => {    //this is returning all of the stars that match the query (array)
                res.send(stars)
            })
            .catch(next)
    })

    .post('/', (req, res, next) => [
        stars.create(req.body)
            .then(star => {
                res.send(star)
            })
            .catch(next)
    ])

    .put('/:id', (req, res, next) => {
        var id = req.params.id
        stars.findByIdAndUpdate(id, req.body)
            .then(star => {
                res.send({ message: 'Successfully updated' });
            })
            .catch(next)
    })

    .delete('/:id', (req, res, next) => {
        stars.findByIdAndRemove(req.params.id)
            .then(star => {
                res.send({ message: 'Successfully Removed' })
            })
            .catch(next)
    })
// eventually we are not going to have to be responsible for writing these standard operations. A lot of times
// you can have them built into your framework for you becase every model will need to be interacted with this way.




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