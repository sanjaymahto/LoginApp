//Authorization Factory to manage token
myApp.factory('authService', ['$window', $window => {

    const authToken = {};

    //accesing local storage through $window service
    const store = $window.localStorage;
    const key = 'auth-token';

    //function to get token from local storage
    authToken.getToken = () => //console.log(store.getItem(key));
    store.getItem(key)

    //function to set token to local storage
    authToken.setToken = token => {
        if (token) {
            store.setItem(key, token);
        } else {
            store.removeItem(key);
        }
    }

    return authToken;


}]);
