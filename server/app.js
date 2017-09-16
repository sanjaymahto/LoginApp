//Including Express Module....
var express = require('express');

//creating an Instance of Express Module...
var app = express();

//Including Mongoose for databse connectivity...
var mongoose = require('mongoose');

//Including body-parser to parse the header
var bodyParser = require('body-parser');

//Including cookie-parser to parse the cookie...
var cookieParser = require('cookie-parser');

//Create a session middleware....
var session = require('express-session');

//Including path module to include static files...
var path = require('path');

//Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources (e.g. fonts) on a web page to be 
//requested from another domain outside the domain from which the first resource was served.
var cors = require('cors');

//HTTP request logger middleware for node.js
var logger = require('morgan');

//including compression modules
var compression = require('compression')
app.use(compression())

//using cors for cross origin file sharing
app.use(cors());

//parsing  and cookie middlewares
app.use(bodyParser.json({
    limit: '10mb',
    extended: true
}));

app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}));

app.use(cookieParser());

//public folder as static
app.use(express.static(path.resolve(__dirname, './../public')));

//Including Employee model and Admin Model
var userModel = require('./app/models/User');
var routeModel = require('./app/models/Route');

//including controller files
var UserRoute = require('./app/controllers/user');
app.use('/user', UserRoute);

//Including Ticket files
var allRoute = require('./app/controllers/routes');
app.use('/routes', allRoute);

//Setting port to 3000..
var port = 3000;

//to log HTTP Requests..
app.use(logger('dev'));

//Data Base Connection
var dbPath = "mongodb://localhost/LoginAppDatabase";
mongoose.connect(dbPath);
mongoose.connection.once('open', function () {
    console.log("Database Connection Established Successfully...");
});

//handling 404 error.
app.use(function (req, res, next) {
    res.status(404);
    // respond with json
    if (req.accepts('json')) {
        res.send({
            error: 'Not found'
        });
        return;
    }
    res.send('Not found');
});

//Listening on port 3000
app.listen(port, function () {
    console.log("Application is Running on port:" + port);
});
