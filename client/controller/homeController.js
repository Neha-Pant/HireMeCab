angular.module('meanApp').controller('homeController', function($scope, $http) {
    $http.get('/api/GetPeople').then(function(response) {
        $scope.PeopleData = response.data;
    });

    $scope.DeletePeople = function(people) {
        $http.delete('/api/DeletePeople/' + people._id).then(function(response) {
            console.log('Deleted');
        });
    }
});
