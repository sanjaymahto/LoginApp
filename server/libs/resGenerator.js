exports.generate = function (error, message, status, data) {

//to create custom made response...
    var myResponse = {
        error: error,
        message: message,
        status: status,
        data: data
    }

    return myResponse;
}
