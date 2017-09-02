angular.module('meanApp').controller('userController', function($scope, $http,$location) 
{

    //  $scope.userData="";

  //   $scope.init = function(){
  //   $http.get('/uapi/GetPeople').success(function (response) {
  //     $scope.userData=response;
  //   });
  // };
  // $scope.init();    
    
    $scope.SaveUser = function() {
        $http.post('/uapi/AddPeople',$scope.User).then(function(response) {
            console.log('User data saved');
                  window.location.reload();
        });
        alert("Registration done !!!");
      $scope.User='';
      $location.path('/login');
    }

  $scope.ChangePassword= function(){

      $http.put('/uapi/updatePassword/'+$scope.User.Email+'/'+$scope.User.NPassword).then(function (response) {
        if(response)
        {
          alert('Password changed Successfully!');
          // $scope.usr='';
        }
        $location.path('/login');
      });
  };



  //   $scope.DeleteUser = function(user){
  //   var x=confirm("Are you sure you want to delete ?");
  //   if(x){
  //     $http.delete('/uapi/DeletePeople/'+user._id).then(function (response) 
  //     {
  //         console.log('User data deleted .');
  //         alert('User deleted Successfully');
  //       });
  //   }
  //     window.location.reload();
  // }
  //   $scope.init();

  // $scope.UpdateUser = function(user,t){
  //     $http.post('/uapi/UpdatePeople/'+t._id+'/'+user.Name+'/'+user.City+'/'+user.Email).then(function (response) 
  //     { });
  //       window.location.reload();  
  // }
  //   $scope.init();


});
