myApp.factory('queryService', function queryFactory($http, authService, $q) {

    const queryArray = {};

    const baseUrl = "http://localhost:3000";

    queryArray.log = 1;
    queryArray.sign = 1;

    //sign up request
    queryArray.signUp = userData => $http.post(`${baseUrl}/user/signup`, userData)

    //login request
    queryArray.login = loginData => $http.post(`${baseUrl}/user/login`, loginData)

    //get logged in user
    queryArray.getUser = userId => {
        console.log(userId);
        if (authService.getToken()) {
            return $http.get(`${baseUrl}/routes/Users/${userId}?token=${authService.getToken()}`, null);
        } else {
            return $q.reject({
                data: "User not authorized..."
            });
        }
    }

    //get attendence of user
    queryArray.logAttendence = () => $http.get(`${baseUrl}/routes/log?token=${authService.getToken()}`, null)

    //get Information of user
    queryArray.getusers = () => $http.get(`${baseUrl}/routes/users?token=${authService.getToken()}`, null)


    //Create a new Message by Admin
    queryArray.submitMessage = (ID, data) => $http.post(`${baseUrl}/routes/createMessage/${ID}?token=${authService.getToken()}`, data)

    return queryArray;

}); //end query service
