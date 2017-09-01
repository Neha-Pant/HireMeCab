angular.module('meanApp').controller('tariffController', function($scope, $http) 
{
      $scope.tariffData="";

$(document).ready(function(){
  // $(".hr-time-picker").hrTimePicker();
  $('#timepicker1').timepicki();
  $('#timepicker2').timepicki();
  // $('#timepicker3').timepicki();
  // $('#timepicker4').timepicki();
  });



    $scope.init = function(){
    $http.get('/tapi/GetTariff').success(function (response) {
      $scope.tariffData=response;
    });
  };
  $scope.init();    
   
    $scope.SaveTariff = function() {
      $scope.Tariff.StartPeakHour=$('#timepicker1').val();
  $scope.Tariff.EndPeakHour=$('#timepicker2').val();
        $http.post('/tapi/AddTariff', $scope.Tariff).then(function(response) {
            console.log('Tariff data saved');
        });
        window.location.reload();
    }

     $scope.DeleteTariff = function(tariff){
    var x=confirm("Are you sure you want to delete ?");
    if(x){
      $http.delete('/tapi/DeleteTariff/'+tariff._id).then(function (response) 
      {
          console.log('Tariff data deleted .');
          alert('Tariff deleted Successfully');
        });
    }
      window.location.reload();
  }
    $scope.init();

    $scope.UpdateTariff = function(tariff,t){
      $http.post('/tapi/UpdateTariff/'+t._id+'/'+tariff.CabType+'/'+tariff.StartPeakHour+'/'+tariff.EndPeakHour+'/'+tariff.NormalRate+'/'+tariff.PeakRate).then(function (response) 
      { });
        window.location.reload();  
  }
    $scope.init();


});
