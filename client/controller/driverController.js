angular.module('meanApp').controller('driverController', function($scope, $http,$cookies,$rootScope,$location) 
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



var num,n,car,carn,carnum,cart,DriverDetails;
  var socket = io();
  $(document).ready(function(){
  var name=$cookies.getObject('authUser');
  var drivername=$rootScope.LoginName.currentUser.userInfo.name;
  var drivermob=$rootScope.LoginName.currentUser.userInfo.phone;
  var email=$rootScope.LoginName.currentUser.userInfo.email;
  $http.get('/dapi/getDriverByPhone/'+drivermob).then(function (response) {
    if(response){
      $scope.getDriverCab=response.data;
      carnum=$scope.getDriverCab[0].RegNo;
      car=$scope.getDriverCab[0].Make;
      DriverDetails={
      driverName : drivername,
      mobi:drivermob,
      cart:car,
      carn:carnum
      };
      socket.emit('Driver', {
           All: DriverDetails
          });
    }
    else {
        console.log('sorry no response');
    }
  });

  $http.get('/bapi/GetAllBookings/'+drivermob).then(function (response) {
    if(response){
      console.log('inside GetAllBookings')
      $scope.GetAllBookings=response.data;
      console.log($scope.GetAllBookings);
        }
    else {
        console.log('sorry no response');
    }
  });
});
  socket = io.connect('http://localhost:3000', {reconnect: false});
    socket.on('MyBook', function(data) {
    console.log('connected');
    $scope.startLoc=data.msg.startP;
    $scope.EndLoc=data.msg.endP;
    $scope.mob=data.msg.mobi;
    $scope.customer=data.msg.cust;
    $scope.bookFare=data.msg.Fare;
    num=  $scope.bookFare;
    n = num.toFixed(2);

    console.log($scope.startLoc);
    console.log(n);
    });
    $(document).ready(function(){

        $("#myBtn").click(function(){
          $("#myDriverModal").modal();
          document.getElementById('fp').innerHTML=$scope.startLoc;
          document.getElementById('ep').innerHTML=$scope.EndLoc;
          document.getElementById('mo').innerHTML=$scope.mob;
          document.getElementById('cu').innerHTML=$scope.customer;
          document.getElementById('fa').innerHTML=n;
        });
    });
  
  function initialize() {
    if (navigator.geolocation)
            {
              navigator.geolocation.getCurrentPosition(success);
            }
      else {
          alert("Geo Location is not supported on your current browser!");
           }
        }initialize();

      function success(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        var myLatlng = new google.maps.LatLng(lat, long);
        geocoder = new google.maps.Geocoder();
        directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true
        });
        var myOptions = {
            zoom: 15,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
           }
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        directionsDisplay.setMap(map);
        marker=  new google.maps.Marker({
        position: myLatlng,
        map: map,
       // icon: '../public/Img/car_ic.png',
        draggable: true,
        animation:  google.maps.Animation.DROP,
        });


        var infoWindow = new google.maps.InfoWindow({map: map});
          infoWindow.setPosition(myLatlng);
          infoWindow.setContent('Location Found');
          map.setCenter(myLatlng);



          function init1()
          {
            geocoder.geocode({ 'latLng': myLatlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                      if (results[1]) {

                    dloc=results[1].formatted_address;
                    console.log(dloc);
                    socket.emit('MyMessage', {
                        message: dloc
                    });

                      }
                  }
            });
          }
          init1();

};


});

