myApp.controller('createCtrl', ['$http', '$location', '$routeParams', 'queryService', 'authService', function ($http, $location, $routeParams, queryService, authService) {



    window.onload = () => {
        if (!window.location.hash) {
            window.location = `${window.location}#loaded`;
            window.location.reload();
        }
    }



    const main = this;

    this.logrecord = '';
    this.mssg = '';
    this.address = '';
    this.contact = '';
    this.email = '';
    this.userType = '';
    this.userdetails = '';

    //check if user is logged 
    this.logged = () => {
        console.log("this is logged function");
        console.log(queryService.log);

        function getCookie(name) {
            const re = new RegExp(`${name}=([^;]+)`);
            const value = re.exec(document.cookie);
            return (value != null) ? unescape(value[1]) : null;
        }

        const info = getCookie("info");
        console.log(info);
        if (info == 0 || info == null) {
            queryService.log = 0;
            main.logg = 0;
            $location.path('/');
        } else {
            main.logg = 1;
            queryService.log = 1;

        }
    }

    this.logged();

    this.userId = $routeParams.userId;
    const id = this.userId;

    //get current user
    this.getUser = () => {
        queryService.getUser(id)
            .then(function successCallBack(response) {
                main.user = response.data.data.name;
                main.contact = response.data.data.mobileNumber;
                main.address = response.data.data.address;
                main.email = response.data.data.email;
                main.userType = response.data.data.user_type;

            });
    }

    this.getUser();

    this.logRecords = () => {

        queryService.getUser(id)
            .then(function successCallBack(response) {
                main.user = response.data.data.name;

                //to get all the records of a user....
                main.logrecord = response.data.data.log_record;
                main.mssg = response.data.data.message;
                console.log(main.logrecord);
            });

    }

    this.userDetails = () => {

        queryService.getusers()
            .then(function successCallBack(response) {
                //to get all the records of a user....
                main.userdetails = response.data.data;
                console.log(main.userdetails);
            });

    }

//Function to submit the message to employee
    this.submitMessage = ID => {

        const data = {
            message: main.message
        };

        console.log(data);
        queryService.submitMessage(ID, data)
            .then(function successCallBack(response) {
                alert("your Message is submitted Successfully!!!")
                location.reload();
            });

    }



}]);
