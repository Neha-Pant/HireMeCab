angular.module('meanApp').controller('tariffController', function($scope, $http) {
    $scope.SaveTariff = function() {
        $http.post('/tapi/AddTariff', $scope.Tariff).then(function(response) {
            console.log('Tariff data saved');
        });
    }
});
