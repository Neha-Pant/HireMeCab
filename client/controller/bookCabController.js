angular.module('meanApp').controller('bookCabController',function($scope, $http,$rootScope,$location)
{
 
 $(document).ready(function()
 {
           // $("#dt").datepick({minDate: new Date(),dateFormat:'dd/mm/yy',maxDate:new Date()+"+1D +0M +0Y"});
//$(selector).datepick({dateFormat: 'yyyy-mm-dd'});

    $("#dt1").datepicker( { minDate: new Date(),dateFormat: 'dd/mm/yy', maxDate: new Date()+"+2D +0M +0Y" });
//new Date(2017, 7,18)
 
});
 
  //  // instantiate google map objects for directions
  // var directionsDisplay = new google.maps.DirectionsRenderer();
  // var directionsService = new google.maps.DirectionsService();
  // var geocoder = new google.maps.Geocoder();


  // function initialize() {
  //   if (navigator.geolocation)
  //           {
  //             navigator.geolocation.getCurrentPosition(success);
  //           }
  //     else {
  //         alert("Geo Location is not supported on your current browser!");
  //          }
  //       }initialize();

  //     function success(position) {
  //       var lat = position.coords.latitude;
  //       var long = position.coords.longitude;
  //       var myLatlng = new google.maps.LatLng(lat, long);
  //       geocoder = new google.maps.Geocoder();
  //       directionsService = new google.maps.DirectionsService();
  //       directionsDisplay = new google.maps.DirectionsRenderer({
  //       suppressMarkers: true
  //       });
  //       var myOptions = {
  //           zoom: 15,
  //           center: myLatlng,
  //           mapTypeId: google.maps.MapTypeId.ROADMAP
  //          }
  //       map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  //       directionsDisplay.setMap(map);
  //       marker=  new google.maps.Marker({
  //       position: myLatlng,
  //       map: map,
  //       // icon: '../public/images/cab.jpg',
  //       draggable: true,
  //       animation:  google.maps.Animation.DROP,
  //       });


  //       var infoWindow = new google.maps.InfoWindow({map: map});
  //         infoWindow.setPosition(myLatlng);
  //         infoWindow.setContent('Location Found');
  //         map.setCenter(myLatlng);

         

  //         function init()
  //         {

  //               // map object
  //             $scope.map = {
  //               control: {},
  //               center: {
  //               latitude: -37.812150,
  //               longitude: 144.971008
  //               },
  //               zoom: 14
  //               };

  //               autocomplete = new google.maps.places.Autocomplete(
  //               /** @type {!HTMLInputElement} */(document.getElementById('origin')),
  //               {types: ['geocode']});

  //       autocomplete1 = new google.maps.places.Autocomplete(
  //               /** @type {!HTMLInputElement} */(document.getElementById('destination')),
  //               {types: ['geocode']});

  //           geocoder.geocode({ 'latLng': myLatlng }, function (results, status) {
  //               if (status == google.maps.GeocoderStatus.OK) {
  //                     if (results[1]) {

  //                   dloc=results[1].formatted_address;
  //                   console.log(dloc);
                    
  //                     }
  //                 }
  //           });

  //         }
  //         init();

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
         myLatlng = new google.maps.LatLng(lat, long);
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
       // icon: '../public/Img/mapmark.png',
        draggable: true,
        animation:  google.maps.Animation.BOUNCE,
        });

        autocomplete = new google.maps.places.Autocomplete(
                /** @type {!HTMLInputElement} */(document.getElementById('origin')),
                {types: ['geocode']});

        autocomplete1 = new google.maps.places.Autocomplete(
                /** @type {!HTMLInputElement} */(document.getElementById('destination')),
                {types: ['geocode']});

        google.maps.event.addListener(marker, 'dragend', function() {
        res=marker.getPosition();
        geocoder.geocode({ 'latLng': res }, function (results, status) {
             if (status == google.maps.GeocoderStatus.OK) {
                   if (results[1]) {
                      start=results[1].formatted_address;
                      document.getElementById("origin").value=start;
                   }
               }
          });
        });

      $scope.getEstimate=function(){
  var start = document.getElementById("routeStart").value;
  var end = document.getElementById("routeEnd").value;
  if ((start.length!=0) && (end.length!=0)) {
   console.log('Button Clicked');
           var start = $('#routeStart').val();
           var end = $('#routeEnd').val();
         calcRoute(start, end);
         calculateDistances(start,end);
         $('#showDur').show();

  }
}





$scope.calcFare=function()
{
 $scope.type=document.getElementById("type");
 console.log("Type : "+$scope.type); 
  $http.get('/tapi/GetSTariff/'+$scope.type).success(function(response){
// $scope.ratecount=0;
//      var count=0;
//     var i;
//    try
//    {
// for(i=0;i<=response.length;i++)
// {count+=parseInt(response[i].Rating);}
// }
//  catch(e){}
//  if(count>0)
//  {$scope.ratecount=Math.round(count*100/(i*5));}
//  // alert('rating : '+$scope.ratecount);
//  document.getElementById("rate").innerHTML=$scope.ratecount;
$scope.t=document.getElementById("timeR").value; 
$scope.d=document.getElementById("dt1").value; 
console.log("Date : "+$scope.d);
console.log("Time : "+$scope.t);
$scope.tarrifS=response;
if(($scope.t>=$scope.tarrifS.StartPeakHour) && ($scope.t<=$scope.tarrifS.EndPeakHour))
{
  $scope.fare=$scope.tarrifS.PeakRate;
  console.log("Peak Fare : "+$scope.tarrifS.PeakRate);
}
else
{
  $scope.fare=$scope.tarrifS.NormalRate;
  console.log("Normal Fare : "+$scope.tarrifS.NormalRate);
}
});

}


  // get directions using google maps api
  $scope.getDirections = function () {
    // var request = {
    //   origin: $scope.directions.origin,
    //   destination: $scope.directions.destination,
    //   travelMode: google.maps.DirectionsTravelMode.DRIVING
    // };
    // directionsService.route(request, function (response, status) {
    //   if (status === google.maps.DirectionsStatus.OK) {
    //     directionsDisplay.setDirections(response);

    //       console.log(response);

    //     directionsDisplay.setMap($scope.map.control.getGMap());
    //     directionsDisplay.setPanel(document.getElementById('directionsList'));
    //     $scope.directions.showList = true;
    //     //});
    //   } else {
    //     alert('Google route unsuccesfull!');
    //   }
    // });

var start = document.getElementById('origin').value;
  var end = document.getElementById('destination').value;
  //var distanceInput = document.getElementById("distanceKm");
  $scope.distance=0;
  var price = document.getElementById("totalFare");
  var request = {
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
      console.log(result);
        directionsDisplay.setPanel(document.getElementById('directionsList'));
       $scope.distance = result.routes[0].legs[0].distance.value / 1000;                 
        $scope.directions.showList = true;
        console.log('Distance : '+result.routes[0].legs[0].distance.value / 1000);
        //$scope.distance = result.routes[0].legs[0].distance.value / 1000;                 
               
              //  price.value = distanceInput.value * 30;
    }
    else {
        alert('Google route unsuccesfull!');
      }
  });
  }


};



});
