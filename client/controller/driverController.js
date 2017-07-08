angular.module('meanApp').controller('driverController', function($scope, $http) 
{
     $scope.driverData="";

    $scope.init = function(){
    $http.get('/dapi/GetDriver').success(function (response) {
      $scope.driverData=response;
    });
  };
  $scope.init();

    $scope.SaveDriver = function() {
        $http.post('/dapi/AddDriver', $scope.Driver).then(function(response) {
            console.log('Driver data saved');
        });
    }




});

