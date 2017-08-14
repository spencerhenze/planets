var mongoose = require('mongoose');

var galaxySchema = new mongoose.Schema({
    name: {type: String, required: true}
})

var Galaxy = mongoose.model('Glalaxy', galaxySchema);

// When you require the galaxy model from other places, you're only going to have access to the exports (encapsulation)
module.exports = Galaxy;