myApp.controller('dashCtrl', ['$filter', '$http', '$location', '$routeParams', 'queryService', 'authService', function ($filter, $http, $location, $routeParams, queryService, authService) {

//Creating reload function...
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

    //check if User is logged
    this.logged = () => {
        console.log("this is logged function");
        console.log(queryService.log);

        //Creating function to get cookie...
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
            $location.path(`/dashboard/${info}`);

        }
    }

    this.logged();

    this.userId = $routeParams.userId;
    const id = this.userId;

    //Get the name of the user
    this.getName = () => {
        //get user if logged in
        queryService.getUser(id)
            .then(function successCallBack(response) {
                main.user = response.data.data.name;
                queryService.log = 1;
            });
    }


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


//Get log records of User
    this.logRecords = () => {

        queryService.getUser(id)
            .then(function successCallBack(response) {
                main.user = response.data.data.name;

                //to get all the records of a user....
                main.logrecord = response.data.data.log_record;
                main.mssg = response.data.data.message;
                console.log(main.mssg);

            });

    }

//function to submit the log record of an user...
    this.submitlog = () => {

        queryService.logAttendence()
            .then(function successCallBack(response) {

                alert("Your Attendence has been Logged. Thank You!");
                location.reload();
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


    //logout
    this.logout = () => {
        // Removing a cookie
        document.cookie = 'info' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        authService.setToken();
        main.user = '';
        queryService.logged = 0;
        $location.path('/');
    }

}]);
