$(document).ready(function(){

  if ($("#map").length > 0){
    initMap();
  }

  if ($("#office_map").length > 0){
    initOfficeMap();
  }

  if ($("#customer_map").length > 0){
    initCustomerMap();
  }

  if ($("#nearby_services_map").length > 0){
    initNearByServicesMap();
  }

  $(document).on("click", "#confirm_property_location", function(){
    $(".target_latitude").val($("#temp_target_latitude").val());
    $(".target_longitude").val($("#temp_target_longitude").val());
    $('.modal').modal('hide');
  });

});

function initMap(can_call_neaby_service_map = false, map_id = 'map') {
  var address = $("#property_search_address").val();// + 'Yrjönkatu 31, 00100 Helsinki, Finland';

  var map = new google.maps.Map(document.getElementById(map_id), {
    zoom: 16
  });

  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({
    'address': address
  }, 
  function(results, status) {
    if(status == google.maps.GeocoderStatus.OK) {
      marker = new google.maps.Marker({
        position: results[0].geometry.location,
        map: map,
        draggable: true
      });

      if ($(".target_latitude").val() == '' && $(".target_longitude").val() == ''){
        $(".target_latitude").val(results[0].geometry.location.lat());
        $(".target_longitude").val(results[0].geometry.location.lng());
      }

      google.maps.event.addListener(marker, 'dragend', function(){
        geocodePosition(marker.getPosition());
      });

      google.maps.event.trigger(map, 'resize');

      map.setCenter(results[0].geometry.location);

      if (can_call_neaby_service_map == true){
        initNearByServicesMap();
      }
    }
    else{
      if ($("#property_search_post_city_address").val() != ''){
        $("#property_search_address").val($("#property_search_post_city_address").val())
        $("#property_search_post_city_address").val('')
        initMap(can_call_neaby_service_map, map_id);
      }
      else if ($("#property_search_default_address").val() != ''){
        $("#property_search_address").val($("#property_search_default_address").val())
        $("#property_search_default_address").val('')
        initMap(can_call_neaby_service_map, map_id);
      }
    }
  });
}

function initCustomerMap(can_call_neaby_service_map = false, map_id = 'customer_map') {
  var latlng = new google.maps.LatLng( $("#temp_target_latitude").val(),$("#temp_target_longitude").val());
  var map = new google.maps.Map(document.getElementById(map_id), {
    zoom: 16
  });

  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    'location': latlng
  }, 
  function(results, status) {
    if(status == google.maps.GeocoderStatus.OK) {
      marker = new google.maps.Marker({
        position: latlng,
        map: map,
        draggable: false,
      });
      var office_name = $("#office_name").val();
      var office_address = $("#office_address").val();
      var office_post_number = $("#office_post_number").val();
      var office_city = $("#office_city").val();
      var office_website = $("#office_website").val();

      var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h3 id="firstHeading" class="firstHeading">'+office_name+'</h3>'+
            '<div id="bodyContent">'+
            '<div>'+office_address+'</div>'+
            '<div>'+office_post_number+
            ', '+office_city+'</div><p></p>'+
            '<div><p><a href=https://'+office_website+'>'+office_website+'</a></p></div>'

            '</div>'+
            '</div>';

      infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      marker.addListener('click', function() {
        infowindow.open(map, marker);  
      });

      google.maps.event.addListener(marker, 'dragend', function(){
        geocodePosition(marker.getPosition());
      });

      google.maps.event.trigger(map, 'resize');

      map.setCenter(results[0].geometry.location);
    }
    else{
      if ($("#property_search_post_city_address").val() != ''){
        $("#property_search_address").val($("#property_search_post_city_address").val())
        $("#property_search_post_city_address").val('')
        GetLocation()
        initMap(can_call_neaby_service_map, map_id);
      }
      else if ($("#property_search_default_address").val() != ''){
        $("#property_search_address").val($("#property_search_default_address").val())
        $("#property_search_default_address").val('')
        GetLocation()
        initMap(can_call_neaby_service_map, map_id);
      }
    }
  });
}


function initOfficeMap(can_call_neaby_service_map = false, map_id = 'office_map') {

  // if ((!$("#temp_target_latitude").val() == "") && (!$("#temp_target_longitude").val() == "")){
  //   var position = new google.maps.LatLng( $("#temp_target_latitude").val(),$("#temp_target_longitude").val())
  // }

  var latlng = new google.maps.LatLng( $("#temp_target_latitude").val(),$("#temp_target_longitude").val());
  var map = new google.maps.Map(document.getElementById(map_id), {
    zoom: 16
  });

  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    // 'address': address,
    'location': latlng
  }, 
  function(results, status) {
    if(status == google.maps.GeocoderStatus.OK) {
      marker = new google.maps.Marker({
        position: latlng,
        map: map,
        draggable: true,
      });

      if ($("#customer").length > 0){
        var office_name = $("#office_name").val();
        var office_address = $("#office_address").val();
        var office_post_number = $("#office_post_number").val();
        var office_city = $("#office_city").val();
        var office_website = $("#office_website").val();

        var contentString = '<div id="content">'+
              '<div id="siteNotice">'+
              '</div>'+
              '<h3 id="firstHeading" class="firstHeading">'+office_name+'</h3>'+
              '<div id="bodyContent">'+
              '<div>'+office_address+'</div>'+
              '<div>'+office_post_number+
              ', '+office_city+'</div><p></p>'+
              '<div><p>'+office_website+'</p></div>'+
              '</div>'+
              '</div>';

        infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        marker.addListener('click', function() {
          infowindow.open(map, marker);  
        });
        geocodePosition(marker.getPosition());
      }


      if ($(".target_latitude").val() == '' && $(".target_longitude").val() == ''){
        $(".target_latitude").val(results[0].geometry.location.lat());
        $(".target_longitude").val(results[0].geometry.location.lng());
      }

      google.maps.event.addListener(marker, 'dragend', function(){
        geocodePosition(marker.getPosition());
      });

      google.maps.event.trigger(map, 'resize');

      map.setCenter(results[0].geometry.location);
    }
    else{
      if ($("#property_search_post_city_address").val() != ''){
        $("#property_search_address").val($("#property_search_post_city_address").val())
        $("#property_search_post_city_address").val('')
        GetLocation()
        initMap(can_call_neaby_service_map, map_id);
      }
      else if ($("#property_search_default_address").val() != ''){
        $("#property_search_address").val($("#property_search_default_address").val())
        $("#property_search_default_address").val('')
        GetLocation()
        initMap(can_call_neaby_service_map, map_id);
      }
    }
  });
}

function GetLocation() {
  var geocoder = new google.maps.Geocoder();
  var address = $("#property_search_address").val();
  geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();
          $("#temp_target_latitude").val(latitude);
          $("#temp_target_longitude").val(longitude);
      } else {
          //alert("Request failed.")
      }
  });
};

var local_services_map;
var service;
var infowindow;
var pyrmont;
function initNearByServicesMap(can_call_init_map = false){

  if ($('.target_latitude').val() == '' && $('.target_longitude').val() == '' && can_call_init_map){
    initMap(true, 'nearby_services_map');
  }

  var pyrmont = new google.maps.LatLng($('.target_latitude').val(), $('.target_longitude').val());

  local_services_map = new google.maps.Map(document.getElementById('nearby_services_map'), {
    center: pyrmont,
    zoom: 11
  });

  marker = new google.maps.Marker({
    position: pyrmont,
    map: local_services_map,
    draggable:false
  });

  ["local_services", "schools", "daycare_services", "transport_services", "other_local_services"].forEach(function(search_type) {
    service = new google.maps.places.PlacesService(local_services_map);
    if (search_type == "transport_services"){
      var places = [];
      var service_ele = $('.localServices').find('.' + search_type);
      if ($(service_ele).val() == ''){
        ["bus","railway", "metro", "airports", "tram stations"].forEach(function(query) {
          var request = {
            location: pyrmont,
            radius: '50000',
            query: query
          };
          service.textSearch(request, function(results, status){
            if (status == google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; (i < results.length && i < 1); i++) {
                places.push(results[i])
                createMarker(results[i], search_type);
              }
            }
            if (places.length > 0){
              place_info = [];
              all_distances = [];
              places.forEach(function(place) {
                distance_from_property = calcDistance(place.geometry.location, pyrmont);
                all_distances.push(parseFloat(distance_from_property));
                if(place.name.indexOf("Museum") == -1){
                  place_info.push(place.name+': '+ distance_from_property + ' km')
                }
              });
              $('.localServices').find('.service_distance_' + search_type).val(Math.min.apply(null, all_distances));
              $(service_ele).val(place_info.join(', '));
            }
          });
        });
      }
    }
    else{
      var request = {
        location: pyrmont,
        radius: '50000',
        query: searchMapSpecs(search_type).search_term
      };

      service.textSearch(request, function(results, status){
        local_services_map_callback(results, status, search_type, pyrmont);
      });

    }
    
  });

  google.maps.event.trigger(local_services_map, 'resize');
  local_services_map.setCenter(pyrmont);

}

function geocodePosition(pos){
  $("#temp_target_latitude").val(pos.lat());
  $("#temp_target_longitude").val(pos.lng());
}

function local_services_map_callback(results, status, search_type, map_center) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    var places = [];
    for (var i = 0; (i < results.length && i < 2); i++) {
      var place = results[i];
      places.push(place)
      createMarker(results[i], search_type);
    }
    fillPlacesToForm(places, search_type, map_center);
  }
}

function createMarker(place, search_type) {
  var placeLoc = place.geometry.location;
  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: local_services_map,
    position: place.geometry.location,
    icon: searchMapSpecs(search_type).icon
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                          place.formatted_address + '</div>');
    infowindow.open(local_services_map, this);
  });
}

function searchMapSpecs(search_type){
  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  if (search_type == "local_services"){
    return {search_term: "grocery stores", icon: {scaledSize: new google.maps.Size(30, 30), origin: new google.maps.Point(0, 0), anchor: new google.maps.Point(0, 32), url: iconBase + 'shopping.png'}};
  }
  else if(search_type == "schools"){
    return {search_term: 'schools', icon: {scaledSize: new google.maps.Size(30, 30), origin: new google.maps.Point(0, 0), anchor: new google.maps.Point(0, 32), url: iconBase + 'schools.png'}};
  }
  else if(search_type == "daycare_services"){
    return {search_term: "daycare", icon: {scaledSize: new google.maps.Size(30, 30), origin: new google.maps.Point(0, 0), anchor: new google.maps.Point(0, 32), url: iconBase + 'info-i_maps.png'}};
  }
  else if(search_type == "transport_services"){
    return {search_term: 'bus stops, railway stations, metro, airports, buses, trams', icon: {scaledSize: new google.maps.Size(30, 30), origin: new google.maps.Point(0, 0), anchor: new google.maps.Point(0, 32), url: iconBase + 'bus.png'}};
  }
  else if(search_type == "other_local_services"){
    return {search_term: 'hospitals', icon: {scaledSize: new google.maps.Size(30, 30), origin: new google.maps.Point(0, 0), anchor: new google.maps.Point(0, 32), url: iconBase + 'hospitals.png'}};
  }
  else{
    return {search_term: 'grocery stores', icon: {scaledSize: new google.maps.Size(30, 30), origin: new google.maps.Point(0, 0), anchor: new google.maps.Point(0, 32), url: iconBase + 'info-i_maps.png'}};
  }
}

function fillPlacesToForm(places, search_type, map_center){
  var service_ele = $('.localServices').find('.' + search_type);
  if ($(service_ele).val() == '' && places.length > 0){
    place_info = [];
    all_distances = [];
    places.forEach(function(place) {
      distance_from_property = calcDistance(place.geometry.location, map_center);
      all_distances.push(parseFloat(distance_from_property));
      place_info.push(place.name+': '+ distance_from_property + ' km')
    });
    $('.localServices').find('.service_distance_' + search_type).val(Math.min.apply(null, all_distances));
    $(service_ele).val(place_info.join(', '));
  }
}

function calcDistance(p1, p2) {
  return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
}