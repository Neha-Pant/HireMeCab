var app = angular.module('meanApp', ['ngRoute','ngCookies', 'ngStorage']);
app.config(function($routeProvider,$locationProvider) {
      $locationProvider.hashPrefix('');
    $routeProvider.when('/', {
        templateUrl: './views/home.html',
        // controller: 'homeController'
    }).when('/login', {
        templateUrl: './views/login.html',
        controller: 'loginController'
    }).when('/user', {
        templateUrl: './views/userCreate.html',
        controller: 'userController'
    }).when('/admin', {
        templateUrl: './views/admin.html'
        // controller: 'adminController'
    }).when('/driver', {
        templateUrl: './views/driverCreate.html',
        controller: 'driverController'
    }).when('/tariff', {
        templateUrl: './views/tariffCreate.html',
        controller: 'tariffController'
    }).when('/bookCab', {
        templateUrl: './views/bookCab.html',
         controller: 'bookCabController'
    }).when('/error', {
        templateUrl: './views/error.html',
    }).otherwise({
  redirectTo: '/',
});
});


app.run(function($rootScope, $http, $location, $sessionStorage, $cookies) {
    if ($sessionStorage.tokenDetails ) {
        $http.defaults.headers.common.Authorization = $sessionStorage.tokenDetails.token;
    }

    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        var publicPages = ['/','/login','/user','/error'];

        var authUser = $cookies.getObject('authUser');
        if (authUser != undefined) {
            var loggedInUser = authUser.currentUser.userInfo;
        }
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$sessionStorage.tokenDetails && $location.path() != '') {
            $location.path('/');
        }
              if (restrictedPage && loggedInUser.role!='Admin' && $location.path()=='/admin') {
              $location.path('/error');
        }

        if (restrictedPage && loggedInUser.role!='Driver' && $location.path()=='/driver') {
        $location.path('/error');
      }

        if (restrictedPage && loggedInUser.role!='Customer' && $location.path()=='/user') {
        $location.path('/error');
  }
        console.log('RestrictedPage '+restrictedPage);
        console.log($sessionStorage.tokenDetails);
    });
});
