angular.module('meanApp').controller('loginController', function($scope, $http, AuthenticationService, $location,$rootScope,$cookies) {

    $scope.LoginUser = function() {
        $rootScope.check=true;
        $rootScope.userCheck=true;
        $rootScope.adminCheck=true;
        AuthenticationService.Login($scope.User, function(response) {
            if (response.data.success === true && response.data.userDetail.Role=='Admin') {
                  console.log($rootScope.driverCheck);
                  $location.path('/admin');
                  $rootScope.check=false;
                  $rootScope.LoginName=$cookies.getObject('authUser');
                  console.log($rootScope.LoginName);
                  $rootScope.adminCheck=false;
                  }
                  if (response.data.success === true && response.data.userDetail.Role=='Driver') {
                    $location.path('/booking');
                    $rootScope.LoginName=$cookies.getObject('authUser');
                    $rootScope.check=false;
                    $rootScope.driverCheck=false;

                  }
                  if (response.data.success === true && response.data.userDetail.Role=='Customer') {
                    $location.path('/bookCab');
                    $rootScope.LoginName=$cookies.getObject('authUser');
                    $rootScope.check=false;
                    $rootScope.userCheck=false;
                  }
                  else {
                    console.log('Not authorized');
                  }
        });
    };

function init(){
    AuthenticationService.Logout();
    $rootScope.check=true;
    $rootScope.adminCheck=true;
    $rootScope.driverCheck=true;
    $rootScope.userCheck=true;
    };
    init();
})
