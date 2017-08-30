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
            console.log('Drivers cab data saved');
        });
        $http.post('/uapi/AddDriver',$scope.Driver).then(function(response) {
            console.log('Drivers user data saved');
                  window.location.reload();
        });
    }

$scope.UpdateDriver = function(user,t){
      $http.post('/dapi/UpdateDriver/'+t._id+'/'+user.RegNo+'/'+user.LicenseNo+'/'+user.Address+'/'+user.Phone+'/'+user.Photo+'/'+user.Model+'/'+user.CabType+'/'+user.Make).then(function (response) 
      { 
        console.log('Data of cab for driver saved !!!');
      });
        window.location.reload();  
  }
    $scope.init();



});

