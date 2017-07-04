var app = angular.module('meanApp', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: './views/home.html',
        controller: 'homeController'
    }).when('/createU', {
        templateUrl: './views/userCreate.html',
        controller: 'userController'
    }).when('/createD', {
        templateUrl: './views/driverCreate.html',
        controller: 'driverController'
    }).when('/createT', {
        templateUrl: './views/tariffCreate.html',
        controller: 'tariffController'
    });
});
