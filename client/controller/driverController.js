angular.module('meanApp').controller('driverController', function($scope, $http) 
{
     $scope.driverData="";
    //  $scope.driverUData="";
     $scope.getDriver="";
    //  $scope.getCDriver="";
    //  $scope.getUDriver="";

    $scope.init = function(){
    // $http.get('/dapi/GetDriver').success(function (response) {
    //   $scope.driverData=response;
    // });
    // $http.get('/uapi/GetDriver').success(function (response) {
    //   $scope.driverData=response;
    // });
    $http.get('/dapi/GetAllDrivers').success(function (response) {
      $scope.driverData=response;
    });
  
    // $http.get('/uapi/GetAllDrivers').success(function (response) {
    //   $scope.driverUData=response;
    // });
    $('#updateDiv1').hide();   
  };
  $scope.init();

    $scope.SaveDriver = function() {
        $http.post('/dapi/AddDriver', $scope.Driver).then(function(response) {
            console.log('Drivers cab data saved');
        });
        $http.post('/uapi/AddDriver',$scope.Driver).then(function(response) {
            console.log('Drivers user data saved');
          alert('Driver added Successfully');
                  window.location.reload();
        });
    }

    $scope.getDriverByPhone=function(did){
  $http.get('/dapi/getDriverByPhone/'+did).then(function (response) {
      // $scope.getCDriver=response.data;
      $scope.getDriver=response.data;
        console.log($scope.getDriver);
  });
// $http.get('/uapi/getDriverByPhone/'+did).then(function (response) {
//       $scope.getUDriver=response.data;
//         console.log($scope.getUDriver);
//   });  
};

$scope.UpdateDriver = function(t){
      $scope.getDriverByPhone(t);
        $('#updateDiv1').show(); 
}

 $scope.UpdateD=function()
  {
      $http.post('/dapi/UpdateDriver/'+$scope.getDriver[0]._id+'/'+$scope.getDriver[0].RegNo+'/'+$scope.getDriver[0].LicenseNo+'/'+$scope.getDriver[0].Address+'/'+$scope.getDriver[0].Phone+'/'+$scope.getDriver[0].Model+'/'+$scope.getDriver[0].CabType+'/'+$scope.getDriver[0].Make).then(function (response) 
      { 
        console.log('Data of cab for driver saved !!!');
      });
            console.log('Data updated for driver .');
                  alert('Data updated for driver .');
        window.location.reload();
  }
    $scope.init();

 $scope.DeleteDriver = function(Driver){
    var x=confirm("Are you sure you want to delete ?");
    if(x){
      $http.delete('/dapi/DeleteDriver/'+Driver.Phone).then(function (response) 
      {
          console.log('Drivers cab data deleted .');
          //alert('Driver deleted Successfully');
        });

       $http.delete('/uapi/DeleteUserD/'+Driver.Phone).then(function (response) 
      {
          console.log('Drivers user data deleted .');
          //alert('Driver deleted Successfully');
        });  
      $http.get('/dapi/GetAllDrivers').success(function (response) {
      $scope.driverData=response;
    });
    }
      window.location.reload();
  }


});

