angular.module('meanApp').controller('tariffController', function($scope, $http,$location) 
{
      $scope.tariffData="";
    // $scope.tariffDataN="";
    $scope.getTariff="";
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
      $('#updateDiv').hide();   
  };
  $scope.init();    
   
    $scope.SaveTariff = function() {
      $scope.Tariff.StartPeakHour=$('#timepicker1').val();
  $scope.Tariff.EndPeakHour=$('#timepicker2').val();
        $http.post('/tapi/AddTariff', $scope.Tariff).then(function(response) {
            console.log('Tariff data saved');
        });
        alert('Tariff added successfully .');
        window.location.reload();
    }

$scope.getTariffById=function(tid){
  // console.log(tariff._id);
//  $('#editTariff').modal('show');
  $http.get('/tapi/getTariffById/'+tid).then(function (response) {
      $scope.getTariff=response.data;
        console.log($scope.getTariff);
  });
};

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

    $scope.UpdateTariff = function(t){
        $scope.getTariffById(t);
        $('#updateDiv').show();   
  }

  $scope.UpdateT=function()
  {
    console.log('updateT called .');
      $scope.getTariff.StartPeakHour=$('#timepicker1').val();
  $scope.getTariff.EndPeakHour=$('#timepicker2').val();
    $http.post('/tapi/UpdateTariff/'+$scope.getTariff._id+'/'+$scope.getTariff.CabType+'/'+$scope.getTariff.StartPeakHour+'/'+$scope.getTariff.EndPeakHour+'/'+$scope.getTariff.NormalRate+'/'+$scope.getTariff.PeakRate).then(function (response) 
      {alert('Data successfully updated !!!'); });
      console.log('Data updated for tariff .');
          $('#updateDiv').hide();   
  }
    $scope.init();


});
