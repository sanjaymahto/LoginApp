myApp.config(['$routeProvider', $routeProvider => {

    $routeProvider
        .when('/', {
            templateUrl: 'views/index.html',
            controller: 'indexCtrl',
            controllerAs: 'index'
        })
        .when('/dashboard/:userId', {
            templateUrl: 'views/dashboard.html',
            controller: 'dashCtrl',
            controllerAs: 'dashboard'
        })
        .when('/create/:userId', {
            templateUrl: 'views/create.html',
            controller: 'createCtrl',
            controllerAs: 'create'
        })
        .otherwise({
            template: '<p></br><h2 class="well" style="margin: 10%;">404, page not found</br></h2></p>'
        });
}]);
