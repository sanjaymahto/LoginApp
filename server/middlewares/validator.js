// validator for Login Form
exports.login = function (req, res, next) {

    if (!req.body.email || !req.body.password) {

        res.status(400).end("Please Enter a Valid Email and Password...");

    } else {
        next();
    }
}

//Validator For Signup form
exports.signup = function (req, res, next) {

    if (!req.body.name || !req.body.email || !req.body.mobileNumber || !req.body.password || !req.body.address || !req.body.user_type) {

        res.status(400).end("please Enter all the Signup Credentials...");

    } else {
        if ((req.body.user_type).toLowerCase() == 'admin' || (req.body.user_type).toLowerCase() == 'employee') {
            next();
        } else {

            res.status(400).end("please enter user type as admin or employee");

        }
    }
}
