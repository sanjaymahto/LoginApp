//Including Mongoose model...
var mongoose = require('mongoose');

//creating object 
var Schema = mongoose.Schema;

//bcrypt-nodejs for hashing password for secure password storing in Database
var bcrypt = require('bcrypt-nodejs');

//Creating Schema for Tickets....
var userSchema = new Schema({
    user_type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    log_record: [{
        type: Date
    }],
    message: [{
        sender: String,
        mssg: String,
        createdAt: {
            type: Date,
            default: Date.now(),
            index: true
        }
            }],
    createdAt: {
        type: Date,
        default: Date.now(),
        index: true
    }
});

//generating hashed password
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
//method to compare hashed password and password entered by user
userSchema.methods.compareHash = function (password) {
    return bcrypt.compareSync(password, this.password);
};


//model for ticketSchema...
mongoose.model('User', userSchema);
