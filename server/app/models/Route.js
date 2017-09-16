//Including Mongoose model...
var mongoose = require('mongoose');
//creating object 
var Schema = mongoose.Schema;

//Schema for user
var routeSchema = new Schema({

    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

//model for userschema
mongoose.model('Route', routeSchema);
