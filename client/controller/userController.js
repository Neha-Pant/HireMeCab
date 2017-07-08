angular.module('meanApp').controller('userController', function($scope, $http) 
{

     $scope.userData="";

    $scope.init = function(){
    $http.get('/uapi/GetPeople').success(function (response) {
      $scope.userData=response;
    });
  };
  $scope.init();    
    
    $scope.SaveUser = function() {
        $http.post('/uapi/AddPeople', $scope.User).then(function(response) {
            console.log('User data saved');
                  window.location.reload();
        });
    }

    $scope.DeleteUser = function(user){
    var x=confirm("Are you sure you want to delete ?");
    if(x){
      $http.delete('/uapi/DeletePeople/'+user._id).then(function (response) 
      {
          console.log('User data deleted .');
          alert('User deleted Successfully');
        });
    }
      window.location.reload();
  }
    $scope.init();


});
