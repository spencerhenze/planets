var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId

var starSchema = new mongoose.Schema({
    name: {type: String, required: true},

    //Relationships:
    galaxyId: {type: ObjectId, ref: 'Galaxy', required: true, ref: 'Galaxy'}   //when you use this data type, mongo will know if the id matches the id of a Galaxy 
})

var Star = mongoose.model('Star', starSchema); 