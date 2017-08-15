// create log in, log out, register routes

let router = require('express').Router()
let Users = require('../models/user')

// register a new user. Note that this is not /api/register. We're locking everything behind /api
router.post('/register', (req, res) => {
    Users.create(req.body)
        .then((user) => {
            req.session.uid = user._id // Here we issue a JWT token. Store the user's id on the session. This allows you to add creator/deletedby/ and things like that to be able to keep track of who is manipulating data
            req.session.save()
            user.password = null
            delete user.password
            res.send({
                message: 'Successfully created user account',
                data: user
            })
        })
        .catch(err => {
            res.send({ error: err })
        })
})


router.post('/login', (req, res) => {
    Users.findOne({ email: req.body.email })
        .then(user => {
            user.validatePassword(req.body.password)  // this is a method provided by bcrypt that we are extending
                .then(valid => {  // if the validation succeeded, you get the response 'valid'
                    if (!valid) {
                        return res.send({ error: 'Invalid Email or Password' })
                    }
                    req.session.uid = user._id;
                    req.session.save()
                    user.password = null  // delete the password so that the user can't see the hashed password. doesn't actually delete it in the db
                    delete user.password
                    res.send({
                        message: 'successfully logged in',
                        data: user
                    })
                })
                .catch(err => {
                    res.send({ error: err || 'Invalid Email or Password' }) // no reason to let it pass through to the default error handler. Just send it back
                }) // make sure to be very generic with your error messages so you don't give hints to the user.
        })
        .catch(err => {
            res.send({
                error: err,
                message: 'Invalid Email or Password'
            })
        })
})

router.delete('/logout', (req, res) => {
    req.session.destroy()
    res.send({
        message: 'You have successfully been logged out. Please come back soon!'
    })
})

// this is a nice way to see if the user is logged in. Do the get request, and if a user comes back, you're good.
router.get('/authenticate', (req, res) => {
    Users.findById(req.session.uid).then(user => {
        return res.send({
            data: user
        })
    }).catch(err => {
        return res.send({
            error: err
        })
    })
})

module.exports = router