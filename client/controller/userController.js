angular.module('meanApp').controller('createController', function($scope, $http) {
    $scope.SavePeople = function() {
        $http.post('/uapi/AddPeople', $scope.User).then(function(response) {
            console.log('User data saved');
        });
    }
});
