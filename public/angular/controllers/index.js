myApp.controller('indexCtrl', ['$http', '$location', 'queryService', 'authService', function ($http, $location, queryService, authService) {

    const main = this;

    queryService.log = 0;
    queryService.sign = 0;

    //check if user is logged...
    this.logged = () => {
       // console.log("this is logged function");
        //console.log(queryService.log);

        //Function To get Cookie By name...
        function getCookie(name) {
            const re = new RegExp(`${name}=([^;]+)`);
            const value = re.exec(document.cookie);
            return (value != null) ? unescape(value[1]) : null;
        }

        const info = getCookie("info");
        //console.log(info);
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

    //Get the name of the user
    this.getName = () => {
        //get user if logged in
        queryService.getUser()
            .then(function successCallBack(response) {
                main.user = response.data.data.name;
                queryService.log = 1;
            });
    }

    //function to process login
    this.submitLog = () => {

        const data = {
            email: main.email,
            password: main.password
        };

        queryService.login(data)
            .then(function successCallBack(response) {
                if (response.data.error === true) {
                    alert(response.data.message);
                } else {
                    let userId;
                    const data = response.data.data;

                    //hide login/signup modal
                    angular.element('#loginModal').modal('hide');

                    //set logged status  
                    queryService.log = 1;

                   // console.log(response.data.token);

                    //Set token for authentication
                    authService.setToken(response.data.token);

                    // Put cookie
                  //  console.log(response.data.data._id)
                    const cookievalue = response.data.data._id;
                    document.cookie = `info = ${cookievalue}`;

                    $location.path(`/dashboard/${data._id}`);
                }
            }, function errorCallBack(response) {
                //console.log(response);
                alert("Error!! Check console");
            });
    } //end submitLog

    //function to process signup
    this.submitSign = () => {

        const data = {
            user_type: main.user_type,
            name: main.name,
            email: main.email,
            password: main.password,
            mobileNumber: main.mobileNumber,
            address: main.address
        };
        queryService.signUp(data)
            .then(function successCallBack(response) {
                //console.log(response);
                if (response.data.error === true) {
                    alert(response.data.message)
                } else {
                    //hide signup modal
                    angular.element('#signupModal').modal('hide');

                    //set logged status  
                    queryService.log = 1;

                   // console.log(response.data.token);
                    //Set token for authentication
                    authService.setToken(response.data.token);

                    // Put cookie
                    //console.log(response.data.data._id)
                    const cookievalue = response.data.data._id;
                    document.cookie = `info = ${cookievalue}`;

                    $location.path(`/dashboard/${data._id}`);
                }
            }, function errorCallBack(response) {
                //console.log(response);
                if (response.status === 400) {
                    alert(response.data);
                } else {
                    alert(response.data.message);
                }
            });

    } //end submitSign

}]);
