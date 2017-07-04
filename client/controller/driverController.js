angular.module('meanApp').controller('driverController', function($scope, $http) {
    $scope.SaveDriver = function() {
        $http.post('/dapi/AddDriver', $scope.Driver).then(function(response) {
            console.log('Driver data saved');
        });
    }
});
