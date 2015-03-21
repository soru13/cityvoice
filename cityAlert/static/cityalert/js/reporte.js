var ajax=(function($){
    var markers = [];
    var map;
    var markerCenter;
    var circle;
    var boundsFind;
    var bounds;
    var marker;
    var _lat;
    var _lng;
    var _position;

    /*mensajes*/
    var _startComment;
    var _resource_uriPUT;
    var _typeComment;
    function started(){
        $.fn.raty.defaults.path = 'http://sa.dynns.com:8000/static/bower_components/raty/lib/images';
        $.fn.raty.defaults.hints= ['bad', 'poor', 'regular', 'good', 'gorgeous'];
        if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    locationSuccess,locationError,
                    {enableHighAccuracy: true });
        };

      
    }
          
 
    function locationSuccess(position){
        _lat = position.coords.latitude;                     
        _lng = position.coords.longitude;  
        _position = new google.maps.LatLng(_lat,_lng);
          $('#ratyStart').raty({ 
                target : '#hint',
                 click: function(score, evt) {
                    start=score;
                  }
            });
            var distancia = google.maps.geometry.spherical.computeDistanceBetween(_position, _positionComment);
            $("#distancia").text(" a "+distancia+" metros");
            var info_window = $('<span>').append(
                $('<img>').attr({'src':_img,'id':'imageComment'})).append(
                    $('<br>')).append(
                        $('<span>').attr('id','typeAlertComment').text(_typeAlert)).html();
        $('#map_canvas').gmap().bind('init', function(event, map) { 
            $('#map_canvas').gmap({ 'center': _position ,'zoom': 18,'disableDefaultUI': true });
            $('#map_canvas').gmap('addMarker', {'icon': {{MEDIA_URL}}{{Categoria.Marker}},'position': _position,'bounds': false}).click(function(){
                 $('#map_canvas').gmap('openInfoWindow', {'content': info_window}, this);
                 $('#map_canvas').gmap('getMap').panTo(_positionComment);
            });                                                                                                                                                                                                  
        });
    }
     function locationError(error) {    
          $.mobile.loading( 'show', {
                text: 'no es culpa tuya es nuestra intentalo conectado a internet',
                textVisible: true,
                theme: 'd'
            });
        $('#map-canvas').gmap({'zoom': 2});
    }
    // Sets the map on all markers in the array.
    function setAllMap(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }
    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
      setAllMap(null);
    }
  return{
    inicio:started,
  }
              
})(jQuery);

(function() {
   ajax.inicio();
}).call(this);