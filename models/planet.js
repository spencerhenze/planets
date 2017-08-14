var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId

var planetSchema = new mongoose.Schema({
    name: { type: String, required: true },

    //RELATIONSHIPS
    starId: {type: ObjectId, ref: 'Star', required: true},
    galaxyId: {type: ObjectId, ref: 'Galaxy', required: true}
})


var Planet = mongoose.model('Planet', planetSchema);