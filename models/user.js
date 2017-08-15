// this is where you bring in bcrypt
let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let bcrypt = require('bcryptjs')
const SALT_FACTOR = 10

let schema = new Schema({
    //here's the information you get to change as a user
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true },
    // this keeps track of when the user was created
    created: { type: Number, required: true, default: Date.now() }
})

//Never have to worry about changing. just copy and paste this stuff. These two methods make sure you don't screw up user data
schema.pre('save', function (next) {
    //tells the schema: if the user hasn't modified their password, go next. If they have, make sure user is still a valid user
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return next(err);
        } else {
            bcrypt.hash(user.password, salt, function (err, hash) {  //user.password comes from req.body
                user.password = hash;
                next();
            });
        }
    });
});

schema.methods.validatePassword = function (password) { // give me your password and I'll give you back a promise.
    return new Promise((resolve, reject) => {
        // have becrypt put the password through the hash process and see if it matches. 
        bcrypt.compare(password, this.password, function (err, isMatch) {
            if (err || !isMatch) {
                return reject(err);
            }
            return resolve(isMatch);
        });
    })
};

module.exports = mongoose.model('User', schema)