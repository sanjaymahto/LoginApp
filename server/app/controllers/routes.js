//Including Mongoose file for database Connectivity...
var mongoose = require('mongoose');

//Including Express Module...
var express = require('express');
var app = express();

//Including body-parser to parse the header
var bodyParser = require('body-parser');

//defining router...
var Router = express.Router();

//Including Models...
var User = mongoose.model('User');
var Route = mongoose.model('Route');

//response generating utility
var resGenerator = require('./../../libs/resGenerator');

//nodemailer for sending mail notifications
var nodemailer = require('nodemailer');

//creating new instance of event emitter for using node event emitter
var events = require('events');
var eventEmitter = new events.EventEmitter();

//requiring jwt authentication to check whether the user is authenticated or not...
var jwt = require('jsonwebtoken');

//defining decodeing Token Variable
var decodedToken;

var auth = function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret key and checks Whether its Expired or not.
        jwt.verify(token, "97hw9a73hr2q@#$#@mo8afjoeidha0e8doh", function (err, decoded) {

            if (err) {

                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });

            } else {

                // if everything is good, save to request for use in other routes
                decodedToken = decoded;

                console.log("Decoded Token");
                console.log(decodedToken);
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
}


//Sending new Mail whenever there is a new message from Admin.
eventEmitter.on('message', function (data) {

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {

            user: "smarthealthcaresystem@gmail.com",
            pass: "Aditya@123"

        }
    });


    var mailOptions = {
        from: 'Login App <support@loginApp.com>',
        to: data.email,
        subject: 'Message Notifications',
        html: "<h1>Hello! " + data.name + "</h1><br><h2> Admin: " + data.admin + " has sent you a New Message. Please Login to your Account to see the message.... </h2>"
    }

    transporter.sendMail(mailOptions, function (error, info) {

        if (error) {
            console.log(error);
        } else {
            console.log(data);
            console.log("Mail Sent : " + info.response);
        }
    });

}); //end sendMail event

/**********************************************************************************************************************/

//Start of get all users Route...
Router.get('/Users/:userId', auth, function (req, res) {

    User.findOne({
        "_id": req.params.userId
    }, function (error, user) {

        console.log("user : " + user);

        if (error) {

            var err = resGenerator.generate(true, "Something is not working : " + error, 500, null);

            res.json(err);

        } else if (user == null || user == undefined) {

            var response = resGenerator.generate(true, "No user found!!!", 400, null);

            res.json(response);

        } else {

            var response = resGenerator.generate(false, "Successfully fetched the users!!!", 200, user);
            res.json(response);

        }

    });

});
// end to get all users...
/*********************************************************************************************************************/

//route to show all log records of user
Router.get('/logRecords', auth, function (req, res) {

    console.log("This is Router to get all the log Records of an User.");

    User.findOne({

            $and: [{
                "email": decodedToken.email
            }, {
                "user_type": "employee"
            }]
        }

        ,
        function (error, result) {

            if (error) {

                var err = resGenerator.generate(true, "Something is not working, error : " + error, 500, null);
                res.send(err);

            } else if (result == null || result == undefined || result == [] || result == '') {

                var err = resGenerator.generate(true, "No Records Found Or You are not Employee", 204, null);
                res.send(err);

            } else {

                var response = resGenerator.generate(false, "All queries fetched successfully", 200, result);
                console.log(result);
                res.send(result);

            }
        });

});
//end get all  the Log records...
/**********************************************************************************************************************/

//route to show all  the Messages...
Router.get('/messages', auth, function (req, res) {

    console.log("This is Router to get all messages of an User.");

    User.findOne({

            $and: [{
                "email": decodedToken.email
            }, {
                "user_type": "employee"
            }]
        }

        ,
        function (error, result) {

            if (error) {

                var err = resGenerator.generate(true, "Something is not working, error : " + error, 500, null);
                res.send(err);

            } else if (result === null || result === undefined || result === [] || result === '') {

                var err = resGenerator.generate(true, "No Records Found Or You are not Employee", 204, null);
                res.send(err);

            } else {

                var response = resGenerator.generate(false, "All queries fetched successfully", 200, result);
                console.log(result);
                res.send(result);

            }
        });

});
//end get all The Messages...

/*****************************************************************************************************************************/

//route to Log Record...
Router.get('/log', auth, function (req, res) {

    console.log("This is Router to log the Record of an User.");

    User.findOne({

            $and: [{
                "email": decodedToken.email
            }, {
                "user_type": "employee"
            }]
        }

        ,
        function (error, result) {

            if (error) {

                var err = resGenerator.generate(true, "Something is not working, error : " + error, 500, null);
                res.send(err);

            } else if (result == null || result == undefined || result == [] || result == '') {

                var err = resGenerator.generate(true, "No Records Found Or You are not Employee", 204, null);
                res.send(err);

            } else {

                var date = new Date();
                result.log_record.push(date);
                result.save(function (error) {
                    if (error) {
                        console.log(error);
                        res.end(error)
                    } else {

                        var response = resGenerator.generate(false, "User Logged successfully", 200, result);
                        res.send(response);
                    }
                });

            }
        });

});
//end to log record...

/*****************************************************************************************************************************/

//route to create a message by Admin
Router.post('/createMessage/:userId', auth, function (req, res) {

    User.findOne({

        $and: [{
            "_id": req.params.userId
        }, {
            "user_type": "employee"
        }]

    }, function (error, result) {

        if (error) {

            var err = resGenerator.generate(true, "Some error occured : " + error, 500, null);
            res.send(err);

        } else if (result == null || result == undefined || result == [] || result == '') {

            var err = resGenerator.generate(true, "No Records Found Or user is not Employee", 204, null);
            res.send(err);

        } else {
            console.log(result);

            var mssg = req.body.message;

            var newMessage = {
                sender: "Admin: " + decodedToken.name,
                mssg: mssg
            }

            console.log(newMessage);

            result.message.push(newMessage);
            result.save(function (error) {
                if (error) {
                    // console.log(error);
                    res.end(error)
                } else {
                    var name = result.name;
                    var email = result.email;
                    eventEmitter.emit('message', {
                        name: name,
                        email: email,
                        admin: decodedToken.name
                    });
                    var response = resGenerator.generate(false, "New chat Message created successfully", 200, result);
                    res.send(response);
                }
            });

        }
    });

}); //end of route to create message

/********************************************************************************************************************/

//route to Log Record...
Router.get('/users', auth, function (req, res) {

    console.log("This is Router to get all the Users.");

    User.find(

        {
            "user_type": "employee"
        }

        ,
        function (error, result) {

            if (error) {

                var err = resGenerator.generate(true, "Something is not working, error : " + error, 500, null);
                res.send(err);

            } else if (result == null || result == undefined || result == [] || result == '') {

                var err = resGenerator.generate(true, "No Records Found!!!", 204, null);
                res.send(err);

            } else {

                var response = resGenerator.generate(false, "users are fetched successfully!!!", 200, result);
                res.send(response);

            }
        });

});
//end to route to get all users...

/**********************************************************************************************************************************/

//export Router
module.exports = Router;
