var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId

var moonSchema = new mongoose.Schema({
    name: {type: String, required: true},

    //RELATIONSHIPS
    planetId: {type: ObjectId, ref: 'Moon', required: true, ref: 'Planet'}, //ref is an example of what the id will look like
    starId: {type: ObjectId, ref: 'Star', required: true, ref: 'Star'},
    galaxyId: {type:ObjectId, ref: 'Galaxy', required: true, ref: 'Galaxy'}
})

var Moon = mongoose.model('Moon', moonSchema);