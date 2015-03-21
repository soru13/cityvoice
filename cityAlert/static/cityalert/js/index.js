// Defaults to sessionStorage for storing the Facebook token
openFB.init({appId: '865520276797761'});
 function share() {
        openFB.api({
            method: 'POST',
            path: '/me/feed',
            params: {
                message:  'Testing Facebook APIs',
            },
            success: function() {
                console.log('the item was posted on Facebook');
            },
            error: errorHandler});
    }
    OAuth.initialize("zofYzXbvzcYTp4SyGOy8Qq6aHTw");

    $('#tw-connect').on('click', function() {
        OAuth.popup('twitter')
        .done(function (result) {
            // Perform API calls
        })
        .fail(function (error) {
            // Handle errors
        });
    });
var  tokenStoreTwitter = window.localStorage;
var ajax=(function($){
    var imagen;
    var Notificaciones;
    var imagendatail;
    var imagendatailID;
    var _positionComment;
    var _positiondetail;
    var _position;
    var latLngCenter;
    var latLngCMarker;
    var latLngA;
    var latLngB;
    var imgur_client_id = "52d4a6d76d21a4b";
    var _img;
    var _photo_uri;
    var link;
    var _idCategoria;
    var _Subcategoria='';
    var _idSub;
    var _idCat;
    var _idEmerg;
    var _imagecategory;
    var _typeAlert;
    var _lat;
    var _lng;
    var _idEmergencia;
    var _idReporte;
    var  tokenStore = window.localStorage;
    var _tipoComment;
    var _tipoDeSend;
    var start=0;
    var markers = [];
    var markersPunto = [];
    var map;
    var markerCenter;
    var circle;
    var boundsFind;
    var bounds;
    var marker;

    /*usuario datos*/
    var username;
    var userID;
    var _userID;
    var email;

    /*mensajes*/
    var _startComment;
    var _resource_uriPUT;
    var _typeComment;

    var _marker;
 var _url;
    function started(){
        $( document ).one( "pagecreate", ".demo", function() {
            // Initialize the external persistent header and footer
            $( "#header" ).toolbar({ theme: "b" });
            $( "#footer" ).toolbar({ theme: "b" });
            // Handler for navigating to the next page
            function navnext( next ) {
                $( ":mobile-pagecontainer" ).pagecontainer( "change", "#"+next, {
                    transition: "slide"
                });
            }
            // Handler for navigating to the previous page
            function navprev( prev ) {
                $( ":mobile-pagecontainer" ).pagecontainer( "change", "#"+prev, {
                    transition: "slide",
                    reverse: true
                });
            }
            // Navigate to the next page on swipeleft
            $( document ).on( "swipeleft", ".ui-page", function( event ) {
                // Get the filename of the next page. We stored that in the data-next
                // attribute in the original markup.
                var next = $( this ).jqmData( "next" );
                // Check if there is a next page and
                // swipes may also happen when the user highlights text, so ignore those.
                // We're only interested in swipes on the page.
                if ( next && ( event.target === $( this )[ 0 ] ) ) {
                    navnext( next );
                }
            });
            // The same for the navigating to the previous page
            $( document ).on( "swiperight", "#login", function( event ) {
                var prev = $( this ).jqmData( "prev" );
                if ( prev && ( event.target === $( this )[ 0 ] ) ) {
                    navprev( prev );
                }
            });
        });


        $.fn.raty.defaults.path = 'http://192.168.1.208:8000/static/bower_components/raty/lib/images';
        $.fn.raty.defaults.hints= ['bad', 'poor', 'regular', 'good', 'gorgeous'];
         if (localStorage.username) {
            console.log("e entrado");
            $.ajax({
                url: 'http://192.168.1.208:8000/api/v1/user/?username__exact='+localStorage.username+'&username=soru&api_key=13254601',
                type: 'GET',
                contentType: 'application/json',
                dataType: 'json',
                processData: false,
                statusCode: {
                    200: function(data) {
                        console.log(data);
                        console.log(data.objects[0].username);
                        console.log(data.objects[0].email);
                        username=data.objects[0].username;
                        userID="/api/v1/user/"+data.objects[0].id+"/";
                        _userID=data.objects[0].id;
                        email=data.objects[0].email;
                        $(".ResultSingin").text("");
                        $("#UsuarioApi").text(data.objects[0].username);
                        $("#emailApi").text(data.objects[0].email);
                        window.location.assign("#Notificaciones");
                    },
                    201: function(data) {
                        console.log(data);
                        
                    },
                    400: function(data) {  
                        console.log(data.responseJSON.errores);
                    },
                    404: function(data) {
                        console.log(data);
                    },
                    500: function(data) {
                        console.log(data);
                    }
                },
            });
        };
        $('#migrafica').on('click', function() {
                clearMarkers();
                markers = [];//esto si los boora los markets
                var boundbox = new google.maps.LatLngBounds();
               $.getJSON( "http://192.168.1.208:8000/api/v1/Cordenadas/?username=soru&api_key=13254601&limit=200", function(data) {
                            $.each(data['objects'], function(key, val) {

                                    boundbox.extend(new google.maps.LatLng(val['Lat'],val['Long']));
                                    latLngA = new google.maps.LatLng(val['Lat'],val['Long']);
                                        imagenIcon=val['Categoria'].Marker;
                                        var markerA = new google.maps.Marker({
                                                position: latLngA,
                                                title: 'Location',
                                                map: map,
                                                icon: imagenIcon,
                                                draggable: true
                                            });
                                        markers.push(markerA);
                                        var info_window = $('<span>').append(
                                                        $('<img>').attr({'src':val['Imagen'],"class":"ImgenMapa"})).append(
                                                            $('<br>')).append(
                                                                $('<a>').attr('href',val['Imagen']).text(val['Alert'])).html();
                                        var infoA = new google.maps.InfoWindow({
                                                content: info_window
                                            });
                                        google.maps.event.addListener(markerA, 'click', function() {
                                            infoA.open(map, markerA);
                                        });
                            });
                    }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
                    $.getJSON( "http://192.168.1.208:8000/api/v1/emergenciaReporte/?username=soru&api_key=13254601&limit=200", function(data) {
                            $.each(data['objects'], function(key, val) {
                                    boundbox.extend(new google.maps.LatLng(val['Lat'],val['Long']));
                                    latLngA = new google.maps.LatLng(val['Lat'],val['Long']);
                                        imagenIcon=val['Categoria'].Marker;
                                        var markerA = new google.maps.Marker({
                                                position: latLngA,
                                                title: 'Location',
                                                map: map,
                                                icon: imagenIcon,
                                                draggable: true
                                            });
                                        markers.push(markerA);
                                        var info_window = $('<span>').append(
                                                        $('<img>').attr({'src':val['Imagen'],"class":"ImgenMapa"})).append(
                                                            $('<br>')).append(
                                                                $('<a>').attr('href',val['Imagen']).text(val['Alert'])).html();
                                        var infoA = new google.maps.InfoWindow({
                                                content: info_window
                                            });
                                        google.maps.event.addListener(markerA, 'click', function() {
                                            infoA.open(map, markerA);
                                        });
                            });
                            map.setCenter(boundbox.getCenter());
                            map.fitBounds(boundbox);
                    }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
                
            });
        $('#loginForm').bind('submit', function(e) {
            e.preventDefault();
            localStorage.username = $("#Usuario").val();
            localStorage.Password = $("#PasswordLog").val();
            var data = JSON.stringify({
                    "username":$("#Usuario").val(),
                    "password":$("#PasswordLog").val(),
            });
            console.log(localStorage.username);
            $.ajax({
                url: 'http://192.168.1.208:8000/api/v1/user/?username__exact='+localStorage.username+'&username=soru&api_key=13254601',
                type: 'post',
                contentType: 'application/json',
                data: data,
                dataType: 'json',
                processData: false,
                statusCode: {
                    201: function(data) {
                        console.log(data);
                        username=data.code.username;
                        userID="/api/v1/user/"+data.code.id+"/";
                        _userID=data.code.id;
                        email=data.code.email;
                        $(".ResultSingin").text("");
                        $("#UsuarioApi").text(data.code.username);
                        $("#emailApi").text(data.code.email);
                        window.location.assign("#Notificaciones");
                    },
                    400: function(data) {
                        $(".ResultSingin").text(data.responseJSON.errores);
                        setTimeout(function(){$(".ResultSingin").text("")},3000);   
                        console.log(data.responseJSON.errores);
                    },
                    404: function(data) {
                        console.log(data);
                    },
                    500: function(data) {
                        console.log(data);
                    }
                },
            });

        }); 

        $('#signUpForm').bind('submit', function(e) {
            e.preventDefault();
              var emptyTest = $('#username').val().length < 1;
             var emptyTestEmail = $('#Email').val().length < 1;
             var emptyTestpassword = $('#password').val().length < 1;
            if(emptyTest) {  
                return false;
                console.log("te falta el usuario");
            };
            if (emptyTestEmail) {
                return false;
                console.log("te falta el email");

            }; 
            if (emptyTestpassword) {
                return false;
                console.log("te falta el password");
            };
            
            var data = JSON.stringify({
                    "username":$("#username").val(),
                    "email":$("#Email").val(),
                    "password": $("#password").val(),
                    "raw_password": $("#raw_password").val(),
                    "first_name": "",
                    "last_name": "",
                    "accessTokenTwitter": tokenStoreTwitter['fbtoken'] || 'no hay token aun',
                    "accessTokenTwittert_secret": tokenStoreTwitter['twtoken_secret'] || 'no hay token aun',
                    "accessTokenFacebook": tokenStore['fbtoken'] ||'no hay token aun',
            }); 
            console.log(data);
            CreateUser(data); 
        }); 
         $('#fb-connect').on('click', function() {
                login();
            });

         $("#checkbox-1").bind( "change", function(event, ui) {
           // var marcado = $("#checkbox-1").prop("checked") ? true : false;
            var marcado =$('#checkbox-1').is(':checked');

            window.location.assign("#photoPicture");
            console.log(marcado);
        });

        $( "#flip-mini" ).bind( "change", function(event, ui) {
            var valor = $( "#flip-mini" ).val();
          console.log(valor);
        });
        $( "#flip-mini2" ).bind( "change", function(event, ui) {
            var valor = $( "#flip-mini2" ).val();
          console.log(valor);
        });
        $("#getTwitterUrl").on("click",function(){
            _urltwitter=$("#emailApi").text();
            var ref = window.open('https://twitter.com/'+_urltwitter, '_blank', 'location=yes');
        });
        $("#getFacebookUrl").on("click",function(){
            var ref = window.open(_urlFacebook, '_blank', 'location=yes');
        });
        var pacInputWrap =(document.getElementById('pac-inputWrap'));
        var input =(document.getElementById('pac-input'));
        $("#Cancelar").on("click",function(){
            clearMarkersPunto();
            markersPunto = [];//esto si los boora los markets
            clearMarkers();
            markers = [];//esto si los boora los markets
            $("#pac-inputWrap").toggle();
             $.getJSON( "http://192.168.1.208:8000/api/v1/Cordenadas/?Usuario__username="+localStorage.username+"&username=soru&api_key=13254601&limit=200", function(data) {
                    $.each(data['objects'], function(key, val) {
                            //boundbox.extend(new google.maps.LatLng(val['Lat'],val['Long']));
                            latLngA = new google.maps.LatLng(val['Lat'],val['Long']);
                            console.log("bounds "+bounds.contains(latLngA));
                            if (bounds.contains(latLngA)==true) {
                                imagenIcon=val['Categoria'].Marker;
                                var markerA = new google.maps.Marker({
                                        position: latLngA,
                                        title: 'Location',
                                        map: map,
                                        icon: imagenIcon,
                                        draggable: true
                                    });
                                markers.push(markerA);
                                var infoA = new google.maps.InfoWindow();
                                infoA.setContent('<div><strong>'+val['Alert']+'</strong><br>');
                                // get some latLng object and Question if it's contained in the circle:
                                google.maps.event.addListener(markerCenter, 'dragend', function() {
                                    latLngCenter = new google.maps.LatLng(markerCenter.position.lat(), markerCenter.position.lng());
                                    bounds = circle.getBounds();
                                    console.log(bounds.contains(latLngA));
                                    if (bounds.contains(latLngA)==true) {

                                    }else{
                                       // markerA.setMap(null);
                                    }
                                });
                                google.maps.event.addListener(marker, 'dragend', function() {
                                    latLngCenter = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
                                    boundsFind = circleFind.getBounds();
                                    console.log(boundsFind.contains(latLngA));
                                });
                                google.maps.event.addListener(markerA, 'dragend', function() {
                                    latLngA = new google.maps.LatLng(markerA.position.lat(), markerA.position.lng());
                                        console.log(" boundsFind "+boundsFind.contains(latLngA));
                                    if (bounds.contains(latLngA)==true || boundsFind.contains(latLngA) == true) {

                                    }else{
                                        markerA.setMap(null);
                                    }
                                });
                                google.maps.event.addListener(markerA, 'click', function() {
                                    infoA.open(map, markerA);
                                });

                                google.maps.event.addListener(markerA, 'drag', function() {
                                    infoA.close();
                                });
                            };
                            

                    });
            }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
            $.getJSON( "http://192.168.1.208:8000/api/v1/emergenciaReporte/?Usuario__username="+localStorage.username+"&Usuario__username="+localStorage.username+"&username=soru&api_key=13254601&limit=200", function(data) {
                    $.each(data['objects'], function(key, val) {
                            //boundbox.extend(new google.maps.LatLng(val['Lat'],val['Long']));
                            latLngA = new google.maps.LatLng(val['Lat'],val['Long']);
                            console.log("bounds "+bounds.contains(latLngA));
                            if (bounds.contains(latLngA)==true || boundsFind.contains(latLngA)==true) {
                                imagenIcon=val['Categoria'].Marker;
                                var markerA = new google.maps.Marker({
                                        position: latLngA,
                                        title: 'Location',
                                        map: map,
                                        icon: imagenIcon,
                                        draggable: true
                                    });
                                markers.push(markerA);
                                var info_window = $('<span>').append(
                                                $('<img>').attr({'src':val['Imagen'],"class":"ImgenMapa"})).append(
                                                    $('<br>')).append(
                                                        $('<a>').attr('href',val['Imagen']).text(val['Alert'])).html();
                                var infoA = new google.maps.InfoWindow({
                                        content: info_window
                                    });
                                // get some latLng object and Question if it's contained in the circle:
                                google.maps.event.addListener(markerCenter, 'dragend', function() {
                                    latLngCenter = new google.maps.LatLng(markerCenter.position.lat(), markerCenter.position.lng());
                                    bounds = circle.getBounds();
                                    console.log(bounds.contains(latLngA));
                                    if (bounds.contains(latLngA)==true) {

                                    }else{
                                       // markerA.setMap(null);
                                    }
                                });
                                google.maps.event.addListener(marker, 'dragend', function() {
                                    latLngCenter = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
                                    boundsFind = circleFind.getBounds();
                                    console.log(boundsFind.contains(latLngA));
                                });
                                google.maps.event.addListener(markerA, 'dragend', function() {
                                    latLngA = new google.maps.LatLng(markerA.position.lat(), markerA.position.lng());
                                    if (bounds.contains(latLngA)==true || boundsFind.contains(latLngA) == true) {

                                    }else{
                                        markerA.setMap(null);
                                    }
                                });
                                google.maps.event.addListener(markerA, 'click', function() {
                                    infoA.open(map, markerA);
                                });

                                google.maps.event.addListener(markerA, 'drag', function() {
                                    infoA.close();
                                });
                            };
                    });
            }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
        });

        $("#AgregarShow").on("click",function(){
            $("#pac-input,#Agregar,#Cancelar,#MisPuntos,#Puntos").toggle();

        });


       $("#miPunto").on("click",function(){
            $("#Puntos").empty();
            $("#pac-inputWrap").toggle();
                clearMarkers();
                markers = [];//esto si los boora los markets
                var boundbox = new google.maps.LatLngBounds();
                 circleFind = new google.maps.Circle({
                    map: map,
                    clickable: false,
                    // metres
                    radius: 200,
                    fillColor: '#fff',
                    fillOpacity: .3,
                    strokeColor: '#313131',
                    strokeOpacity: .4,
                    strokeWeight: .8
                });
                $.getJSON( "http://192.168.1.208:8000/api/v1/MisPuntos/?username=soru&api_key=13254601&limit=200", function(data) {
                            $.each(data['objects'], function(key, val) {

                                $("#Puntos").append($('<li>').append($('<a>').attr({'id':"punto"+val['id'],'title':val['Lat']+","+val['Long'],'onclick':"ajax.panTo('"+val['id']+"','"+val['nombre']+"','"+val['Lat']+"','"+val['Long']+"');"}).text(val['nombre']))).html();
                               
                                    boundbox.extend(new google.maps.LatLng(val['Lat'],val['Long']));
                                    latLngA = new google.maps.LatLng(val['Lat'],val['Long']);
                                        var marker = new google.maps.Marker({
                                                position: latLngA,
                                                title: 'Location',
                                                map: map,
                                                icon: "http://192.168.1.208:8000/static/cityalert/diseno/categorias/miPunto.png",
                                            });
                                        markers.push(marker);
                                        var info_window = '<div><strong>'+val['nombre']+'</strong>';
                                        var infoA = new google.maps.InfoWindow({
                                                content: info_window
                                            });
                                        google.maps.event.addListener(marker, 'click', function() {
                                            infoA.open(map, marker);
                                            map.setZoom(18);                    
                                            map.setCenter(marker.getPosition());
                                            circleFind.bindTo('center', marker, 'position');
                                            boundsFind = circleFind.getBounds(); 
                                            $.getJSON( "http://192.168.1.208:8000/api/v1/Cordenadas/?username=soru&api_key=13254601&limit=200", function(data) {
                                                $.each(data['objects'], function(key, val) {
                                                        //boundbox.extend(new google.maps.LatLng(val['Lat'],val['Long']));
                                                        latLngA = new google.maps.LatLng(val['Lat'],val['Long']);
                                                        if (boundsFind.contains(latLngA)==true) {
                                                            imagenIcon=val['Categoria'].Marker;
                                                            var markerA = new google.maps.Marker({
                                                                    position: latLngA,
                                                                    title: 'Location',
                                                                    map: map,
                                                                    icon: imagenIcon,
                                                                });
                                                            markers.push(markerA);
                                                            var infoA = new google.maps.InfoWindow();
                                                            infoA.setContent('<div><strong>'+val['Alert']+'</strong><br>');
                                                            google.maps.event.addListener(markerA, 'click', function() {
                                                                infoA.open(map, markerA);
                                                            });
                                                        };
                                                        

                                                });
                                            }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
                                            $.getJSON( "http://192.168.1.208:8000/api/v1/emergenciaReporte/?Usuario__username="+localStorage.username+"&username=soru&api_key=13254601&limit=200", function(data) {
                                                    $.each(data['objects'], function(key, val) {
                                                            //boundbox.extend(new google.maps.LatLng(val['Lat'],val['Long']));
                                                            latLngA = new google.maps.LatLng(val['Lat'],val['Long']);
                                                            console.log("bounds "+bounds.contains(latLngA));
                                                            if (boundsFind.contains(latLngA)==true) {
                                                                imagenIcon=val['Categoria'].Marker;
                                                                var markerA = new google.maps.Marker({
                                                                        position: latLngA,
                                                                        title: 'Location',
                                                                        map: map,
                                                                        icon: imagenIcon,
                                                                    });
                                                                markers.push(markerA);
                                                                var info_window = $('<span>').append(
                                                                                $('<img>').attr({'src':val['Imagen'],"class":"ImgenMapa"})).append(
                                                                                    $('<br>')).append(
                                                                                        $('<a>').attr('href',val['Imagen']).text(val['Alert'])).html();
                                                                var infoA = new google.maps.InfoWindow({
                                                                        content: info_window
                                                                    });

                                                                google.maps.event.addListener(markerA, 'click', function() {
                                                                    infoA.open(map, markerA);
                                                                });
                                                            };
                                                    });
                                            }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
                                            
                                        });
                            });
                            $("#Puntos").listview("refresh");
                            map.setCenter(boundbox.getCenter());
                            map.fitBounds(boundbox);
                    }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
        });
        if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    locationSuccess,locationError,
                    {enableHighAccuracy: true });
        };
        

         $( "#jaja,#jaja2" ).bind({
               popupafterclose: function(event, ui) {
                    refreshPage();
                    window.location.assign("#Notificaciones");
                }
            });
        $("#bar,#Reportar,#ListaReporte,#Detail,#map-page,#Emergencia,#ReportarEmergencia,#Comment").on("pageshow", function() {
            $(".result-count").text(" ");
            //$(".pic").attr("src","");
            //$(".pic").hide();
            $("#subcategoria").hide();
        });
       
        $("#alertaMenos").click(function(){
            $( "#alertas" ).toggle("slow",function(){
                var visible = $("#alertas").is(':visible');
                if (visible) {
                    $("#alertaMenos img").next().next().attr("src","http://192.168.1.208:8000/static/cityalert/diseno/categorias/boton-.png");
                }else{
                    $("#alertaMenos img").next().next().attr("src","http://192.168.1.208:8000/static/cityalert/diseno/categorias/boton+.png");
                }
            });
        });
        $("#reporteMenos").click(function(){
            $( "#reportes" ).toggle("slow",function(){
                var visible = $("#reportes").is(':visible');
                if (visible) {
                    $("#reporteMenos img").next().next().attr("src","http://192.168.1.208:8000/static/cityalert/diseno/categorias/boton-.png");
                }else{
                    $("#reporteMenos img").next().next().attr("src","http://192.168.1.208:8000/static/cityalert/diseno/categorias/boton+.png");
                }
            });
        });

        $( '#Notificaciones' ).on( 'pageshow',function(event){
            $("#reportes,#alertas,#iconCatego,#iconCategoMapCanvas").empty();
            $(".result-countAlertas").text("Carando ..."); 
            $(".result-countReportes").text("Carando ..."); 
            $(".result-countCategorias").text("Carando ...");

            $.getJSON( "http://192.168.1.208:8000/api/v1/categoria/?username=soru&api_key=13254601&limit=200", function(data) {
                var incremento;
                incremento=data.meta.total_count*43;
                $("#iconCatego").css("width",incremento);
                $.each(data['objects'], function(key, val) {
                    $("#iconCatego").append("<a href='#' onclick=javascript:ajax.filtering('"+val['Categoria']+"');><li ><img class='foto' src='"+val['avatar']+"'></li></a>");
                    $("#iconCategoMapCanvas").append("<a href='#' onclick=javascript:ajax.filteringCanvasMAp('"+val['Categoria']+"');><li ><img class='foto' src='"+val['avatar']+"'></li></a>");
                });
                //$("#iconCatego").append('<li id=""><img class="menArriba" src="http://192.168.1.208:8000/static/cityalert/diseno/categorias/Flecha-derecha.png" alt="Flecha-derecha"></li>');
                $("#iconCatego").trigger("create");
                if (data.meta.total_count) {
                    $(".result-countCategorias").text("");
                }else{
                    $(".result-countCategorias").text("No hay categorias por el momento");
                }
            }).fail(function() { $(".result-countAlertas").text("Acupa Estar Conectado a Internet "); });
            $.getJSON( "http://192.168.1.208:8000/api/v1/emergenciaReporte/?username=soru&api_key=13254601&limit=200", function(data) {
                $.each(data['objects'], function(key, val) {
                            var startemerg;
                            var calificacionEmerg;

                             $.getJSON( "http://192.168.1.208:8000/api/v1/startEmergencia/?Reporte__id="+val['id']+"&username=soru&api_key=13254601&limit=200", function(datas) {
                                startemerg=datas.meta.total_count;
                            if (startemerg==0) {
                                    promedioEmerg=0;
                            }else{
                                calificacionEmerg=0;
                                $.each(datas['objects'], function(key, valor) {
                                    console.log(valor['Calificacion']);
                                    calificacionEmerg=parseInt(calificacionEmerg)+parseInt(valor['Calificacion']);
                                    console.log("califi emergencia id "+val['Alert']+" "+val['id'] +" "+calificacionEmerg);
                                });
                                var promedioEmerg=calificacionEmerg / startemerg;
                            }
                                var positioFinal = new google.maps.LatLng(val['Lat'],val['Long']);
                                var distancia = google.maps.geometry.spherical.computeDistanceBetween(_position, positioFinal);
                                distancia=distancia.toFixed(0);


                                if (val['Imagen']==" ") {
                                    val['Imagen']="none";
                                };
                            $("#alertas").append("<li><a href='#Comment' data-href='#Comment' id='CommentEmerg"+val['id']+"' title='"+val['Categoria'].Emergencia+"' onclick=javascript:ajax.Comment('"+val['id']+"','"+val['Imagen']+"','EMERGENCIA','"+val['Lat']+"','"+val['Long']+"','"+val['Categoria'].Marker+"');><img src='"+val['Categoria'].avatar+"' class='ui-li-thumb'/><div class='tipoCategoria'>"+val['Categoria'].Emergencia+"</div><h3 class='ui-li-heading'>"+val['Alert']+"</h3><p class='ui-li-desc'><span><time class='timeago' datetime='"+val['Fecha']+"'></time></span><span class='puntuacionStar' id='ratyStartNotifiEmer"+val['id']+"'></span><span>("+promedioEmerg+")</span><img  class='puntuacion' src='http://192.168.1.208:8000/static/cityalert/diseno/categorias/comentarios.png' alt='puntuacion'><span></span><span class='distancia'>a "+distancia+" mts</span></p></a></li>");
                            $("#alertas").listview("refresh");
                            $("#ratyStartNotifiEmer"+val['id']).raty({ readOnly: true, score: promedioEmerg });
                            $("time.timeago").timeago();
                            }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });

                });
                if (data.meta.total_count) {
                    $(".result-countAlertas").text("");
                }else{
                    $(".result-countAlertas").text("No hay emergencias por el momento");
                }
            }).fail(function() { $(".result-countAlertas").text("Acupa Estar Conectado a Internet "); });

            $.getJSON( "http://192.168.1.208:8000/api/v1/Cordenadas/?username=soru&api_key=13254601&limit=200", function(data) {
                $.each(data['objects'], function(key, val) {
                    var start;
                    var calificacion;
                     $.getJSON( "http://192.168.1.208:8000/api/v1/startReporte/?Reporte__id="+val['id']+"&username=soru&api_key=13254601&limit=200", function(datas) {
                         start=datas.meta.total_count;
                   if (start==0) {
                        promedio=0;
                    }else{
                        calificacion=0;
                        $.each(datas['objects'], function(key, valor) {
                            console.log(valor['Calificacion']);

                            calificacion=parseInt(calificacion)+parseInt(valor['Calificacion']);

                            console.log("califi id "+val['id'] +" "+calificacion);
                        });
                        var promedio=calificacion / start;
                        promedio=promedio.toFixed(1);
                    }
                        var positioFinal = new google.maps.LatLng(val['Lat'],val['Long']);
                        var distancia = google.maps.geometry.spherical.computeDistanceBetween(_position, positioFinal);
                         distancia=distancia.toFixed(0);
                    $("#reportes").append("<li><a href='#Comment' data-href='#Comment' id='CommentReport"+val['id']+"' title='"+val['Categoria'].Categoria+"' onclick=javascript:ajax.Comment('"+val['id']+"','"+val['Imagen']+"','REPORTES','"+val['Lat']+"','"+val['Long']+"','"+val['Subcategoria'].Marker+"');><img src='"+val['Subcategoria'].avatar+"' class='ui-li-thumb'/><div class='tipoCategoria'>"+val['Categoria'].Categoria+"</div><h3 class='ui-li-heading'>"+val['Alert']+"</h3><p class='ui-li-desc'><span><time class='timeago' datetime='"+val['Fecha']+"'></time></span><span class='puntuacionStar' id='ratyStartNotifi"+val['id']+"'></span><span>("+promedio+")</span><img  class='puntuacion' src='http://192.168.1.208:8000/static/cityalert/diseno/categorias/comentarios.png' alt='puntuacion'><span>("+start+")</span><span class='distancia'>a "+distancia+" mts</span></p></a></li>");

                    $("#ratyStartNotifi"+val['id']).raty({ readOnly: true, score: promedio });
                    $("#reportes").listview("refresh");
                    $("time.timeago").timeago();
                    }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
                });
                if (data.meta.total_count) {
                    $(".result-countReportes").text("");
                }else{
                    $(".result-countReportes").text("No hay reportes por el momento");
                }
            }).fail(function() { $(".result-countReportes").text("Acupa Estar Conectado a Internet "); });
        });



        $( '#MisReportes' ).on( 'pageshow',function(event, ui){
                $("#misReportesforme").empty();
                $(".result-count").text("Carando ...");
                $.getJSON( "http://192.168.1.208:8000/api/v1/emergenciaReporte/?Usuario__username="+localStorage.username+"&username=soru&api_key=13254601&limit=200", function(data) {
                        $.each(data['objects'], function(key, val) {
                            var startemerg;
                            var calificacionEmerg;
                             $.getJSON( "http://192.168.1.208:8000/api/v1/startEmergencia/?Reporte__id="+val['id']+"&username=soru&api_key=13254601&limit=200", function(datas) {
                                 startemerg=datas.meta.total_count;
                                calificacionEmerg=0;
                                $.each(datas['objects'], function(key, valor) {
                                    console.log(valor['Calificacion']);

                                    calificacionEmerg=parseInt(calificacionEmerg)+parseInt(valor['Calificacion']);

                                    console.log("califi emergencia id "+val['id'] +" "+calificacionEmerg);
                                });
                                var promedioEmerg=calificacionEmerg / startemerg;
                                var positioFinal = new google.maps.LatLng(val['Lat'],val['Long']);
                                var distancia = google.maps.geometry.spherical.computeDistanceBetween(_position, positioFinal);
                            $("#misReportesforme").append("<li><a href='#detail' data-href='#detail' id='detailEmerg"+val['id']+"' title='"+val['Categoria'].Emergencia+"' onclick=javascript:ajax.detail('"+val['id']+"','"+val['Imagen']+"','EMERGENCIA','"+val['Lat']+"','"+val['Long']+"','"+promedioEmerg+"');><img src='"+val['Categoria'].avatar+"' class='ui-li-thumb'/><div class='tipoCategoria'>"+val['Categoria'].Emergencia+"</div><h3 class='ui-li-heading'>"+val['Alert']+"</h3><p class='ui-li-desc'><span><time class='timeago' datetime='"+val['Fecha']+"'></time></span><span class='puntuacionStar' id='ratyStartDetailEmer"+val['id']+"'></span><span>("+promedioEmerg+")</span><img  class='puntuacion' src='http://192.168.1.208:8000/static/cityalert/diseno/categorias/comentarios.png' alt='puntuacion'><span>("+startemerg+")</span><span class='distancia'>a "+distancia+" mts</span></p></a></li>");         
                            $("#misReportesforme").listview("refresh");
                            $("#ratyStartDetailEmer"+val['id']).raty({ readOnly: true, score: promedioEmerg });
                            $("time.timeago").timeago();
                            }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
                        });
                    
                    if (data.meta.total_count) {
                        $(".result-count").text("");
                    }else{
                        $(".result-count").text("No tienes por el momento");
                    }
                }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });

                $.getJSON( "http://192.168.1.208:8000/api/v1/Cordenadas/?Usuario__username="+localStorage.username+"&username=soru&api_key=13254601&limit=200", function(data) {
                    $.each(data['objects'], function(key, val) {
                        var start;
                        var calificacion;
                         $.getJSON( "http://192.168.1.208:8000/api/v1/startReporte/?Reporte__id="+val['id']+"&username=soru&api_key=13254601&limit=200", function(datas) {
                             start=datas.meta.total_count;
                        if (start==0) {
                            promedio=0;
                        }else{
                            calificacion=0;
                            $.each(datas['objects'], function(key, valor) {
                                console.log(valor['Calificacion']);

                                calificacion=parseInt(calificacion)+parseInt(valor['Calificacion']);

                                console.log("califi id "+val['id'] +" "+calificacion);
                            });
                            var promedio=calificacion / start;
                        }
                            var positioFinal = new google.maps.LatLng(val['Lat'],val['Long']);
                            var distancia = google.maps.geometry.spherical.computeDistanceBetween(_position, positioFinal);
                        $("#misReportesforme").append("<li><a href='#detail' data-href='#detail' id='detailReport"+val['id']+"' title='"+val['Categoria'].Categoria+"' onclick=javascript:ajax.detail('"+val['id']+"','"+val['Imagen']+"','REPORTES','"+val['Lat']+"','"+val['Long']+"','"+promedio+"');><img src='"+val['Subcategoria'].avatar+"' class='ui-li-thumb'/><div class='tipoCategoria'>"+val['Categoria'].Categoria+"</div><h3 class='ui-li-heading'>"+val['Alert']+"</h3><p class='ui-li-desc'><span><time class='timeago' datetime='"+val['Fecha']+"'></time></span><span class='puntuacionStar' id='ratyStartDetail"+val['id']+"'></span><span>("+promedio+")</span><img  class='puntuacion' src='http://192.168.1.208:8000/static/cityalert/diseno/categorias/comentarios.png' alt='puntuacion'><span>("+start+")</span><span class='distancia'>a "+distancia+" mts</span></p></a></li>");           
                        $("#misReportesforme").listview("refresh");
                        $("#ratyStartDetail"+val['id']).raty({ readOnly: true, score: promedio });
                        $("time.timeago").timeago();
                        }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
                    });
                    if (data.meta.total_count) {
                    $(".result-count").text("");
                    }else{
                        $(".result-count").text("No tienes por el momento");
                    }
                }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
            });

        $( '#Emergencia' ).on( 'pageshow',function(event, ui){
            $("#groupEmergencia").empty();
            $(".result-count").text("Carando ...");
            $.getJSON( "http://192.168.1.208:8000/api/v1/emergenciaCat/?username=soru&api_key=13254601&limit=200", function(data) {
                $.each(data['objects'], function(key, val) {
                    $("#groupEmergencia").append("<a href='#ReportarEmergencia' id='typeEmerg"+val['id']+"' onclick=javascript:ajax.emergenciaCat('"+val['id']+"');><img class='emergenciaimg' src='"+val['avatar']+"' alt='"+val['Emergencia']+"'><p>"+val['Emergencia']+"</p></a>");
                });
                $(".result-count").text("");
                $("#groupEmergencia").trigger("create");
            }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
        });
        

        $("#Reportar").on("pagecreate", function(event, ui) {  
            $("#categoria").empty();
            $.mobile.loading( 'show', {
                text: 'cargando...',
                textVisible: true,
                theme: 'b',
            });

            $.getJSON( "http://192.168.1.208:8000/api/v1/categoria/?username=soru&api_key=13254601&limit=200", function(data) {
                    $.each(data['objects'], function(key, val) {
                        $("#categoria").append("<a href='#' class='grouṕcate' id='cat"+val['id']+"' onclick=javascript:ajax.categoria('"+val['id']+"');><img class='iconCategoria separacion'  src='"+val['avatar']+"'  alt='"+val['Categoria']+"'></a>");
                    });
                $(".result-count").text("");
                $("#categoria").listview("refresh");
            }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
            $.mobile.loading('hide');
        });
        $("#Reportar,#Emergencia,#ReportarEmergencia").on("pageshow",function(event, ui){
            var origin = new google.maps.LatLng(_lat, _lng);
            var destination = new google.maps.LatLng(_lat, _lng);
            var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix(
              {
                origins: [origin],
                destinations: [destination],
                travelMode: google.maps.TravelMode.DRIVING,
                avoidHighways: false,
                avoidTolls: false
              }, callback);

            function callback(response, status) {
              // See Parsing the Results for
              console.log(response);
               $('.directions').text(response.originAddresses[0]);
              // the basics of a callback function.
            }
                info_window="aqui estas";
                $('#map_canvas').gmap({ 'center': _position, 'zoom': 18,'disableDefaultUI': true});
                $('#map_canvas').gmap('addMarker', {'position': _position}).click(function(){
                             $('#map_canvas').gmap('openInfoWindow', {'content': info_window}, this);
                             $('#map_canvas').gmap('getMap').panTo(_position);
                        });

        });
        
       
   
        $("#detail,#Comment,#map-page").on("pagehide",function(event, ui){
            $('#map_detail').gmap('destroy');
            $('#map_Comment').gmap('destroy');
            $('#map-canvas').gmap('destroy');
            $("#formMensaje").get(0).reset();
             markers = [];
        });
        
        $("#Comment").on("pageshow",function(event){
            $('#ratyStart').raty({ 
                target : '#hint',
                 click: function(score, evt) {
                    start=score;
                  }
            });
            var distancia = google.maps.geometry.spherical.computeDistanceBetween(_position, _positionComment);
            $("#distancia").text(" a "+distancia+" metros");
            if (_img!='none') {
                var info_window = $('<span>').append(
                $('<img>').attr({'src':_img,'id':'imageComment'})).append(
                    $('<br>')).append(
                        $('<span>').attr('id','typeAlertComment').text(_typeAlert)).html();
            };
            var info_window = $('<span>').append(
                $('<img>').attr({'src':_img,'id':'imageComment'})).append(
                    $('<br>')).append(
                        $('<span>').attr('id','typeAlertComment').text(_typeAlert)).html();

            $('#map_Comment').gmap({ 'center': _positionComment ,'zoom': 18,'disableDefaultUI': true });
            $('#map_Comment').gmap('addMarker', {'position': _positionComment,'bounds': false}).click(function(){
                 $('#map_Comment').gmap('openInfoWindow', {'content': info_window}, this);
                 $('#map_Comment').gmap('getMap').panTo(_positionComment);
            });
            //cargando comentarios para este reporte
            $("#comentarios").empty();
            if (_tipoComment=="EMERGENCIA") {
                var url="http://192.168.1.208:8000/api/v1/commentEmerg/?Reporte="+_idReporte+"&username=soru&api_key=13254601&limit=200";
                console.log("dentro de emergencia "+_tipoComment);

                console.log("esta es su url "+url);

            };
            if (_tipoComment=="REPORTES") {
                var url="http://192.168.1.208:8000/api/v1/comment/?Reporte="+_idReporte+"&username=soru&api_key=13254601&limit=200";
                console.log("dentro de emergencia "+_tipoComment);
                console.log("esta es su url "+url);
            };
            $(".result-count").text("Cargando...");

            $.getJSON( url , function(data) {
              _resource_uriPUT='';

                    $.each(data['objects'], function(key, val) {
                        var text = val['Comment'].replace(/(:\)|:8|:D|:hat|:rare|:silent|:lol|:shame|:xD|:imp|:secret|:a|:XD:|:sor:|:\(|:O|:P|:cool:|:'\(|:\|)/g, '<span title="$1" class="emoticon"></span>');
                        $("#comentarios").append("<article id='user"+val['Usuario'].id+"'><span>"+val['Usuario'].username+"</span> "+text+"</article>");
                        if (localStorage.username==val['Usuario'].username) {
                            _resource_uriPUT=val['resource_uri'];
                            console.log(localStorage.username);
                            console.log(val['Usuario'].username);
                            console.log(_resource_uriPUT);

                            if (_tipoComment=="EMERGENCIA") {
                                _url="http://192.168.1.208:8000/api/v1/startEmergencia/?Reporte__id="+_idReporte+"&Usuario__id="+_userID+"&username=soru&api_key=13254601";
                                $.getJSON( _url , function(datas) {
                                        $.each(datas['objects'], function(key, val) {
                                            _resource_uriPUT=val['resource_uri'];
                                            console.log(_resource_uriPUT);
                                            if (localStorage.username==val['Usuario'].username) {
                                                _urlPUTEmerG="http://192.168.1.208:8000"+_resource_uriPUT+"?username=soru&api_key=13254601";
                                            };
                                        });
                                }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
                            };
                            if (_tipoComment=="REPORTES") {
                                _url="http://192.168.1.208:8000/api/v1/startReporte/?Reporte__id="+_idReporte+"&Usuario__id="+_userID+"&username=soru&api_key=13254601";
                                $.getJSON( _url , function(datas) {
                                        $.each(datas['objects'], function(key, val) {
                                            _resource_uriPUT=val['resource_uri'];
                                            console.log(_resource_uriPUT);
                                            if (localStorage.username==val['Usuario'].username) {
                                            _urlPUTReporT="http://192.168.1.208:8000"+_resource_uriPUT+"?username=soru&api_key=13254601";
                                            };
                                        });
                                }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
                            };
                        };
                    });

                $(".result-count").text(" ");
            }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
            $.mobile.loading('hide');
        });
        $("#Denunciar").click(function(){
            _tipoDeSend="/api/v1/denunciaOrGuardar/3/";
        });
        $("#Guardar").click(function(){
            _tipoDeSend="/api/v1/denunciaOrGuardar/2/";
        });      
        $('#formMensaje').bind('submit', function(e) {
            e.preventDefault();
            if (start==0) {
                alert("porfavor da una calificacion");
                return false;  
            };
             var emptyTest = $('#id_mensaje').val().length < 1;
           
           

            
            $(".result-count").text("enviando mensaje...");
            mensaje=$("#id_mensaje").val();
            var text = mensaje.replace(/(:\)|:8|:D|:hat|:rare|:silent|:lol|:shame|:xD|:imp|:secret|:a|:XD:|:sor:|:\(|:O|:P|:cool:|:'\(|:\|)/g, '<span title="$1" class="emoticon"></span>');
           if(emptyTest) {
                if (_tipoComment=="EMERGENCIA") {
                    var ReporteUrl="/api/v1/emergenciaReporte/"+_idReporte+"/";
                   if (_resource_uriPUT) {
                        _typeComment='PUT';
                        var url="http://192.168.1.208:8000/api/v1/startEmergencia/?Reporte__id="+_idReporte+"&Usuario__id="+_userID+"&username=soru&api_key=13254601";
                        $.getJSON( url , function(data) {
                        _resource_uriPUT='';
                            $.each(data['objects'], function(key, val) {
                                if (localStorage.username==val['Usuario'].username) {
                                    _resource_uriPUT=val['resource_uri'];
                                    url="http://192.168.1.208:8000"+_resource_uriPUT+"?username=soru&api_key=13254601";
                                };
                            });
                        }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
                     }else{
                        _typeComment='POST';
                        var url="http://192.168.1.208:8000/api/v1/startEmergencia/?username=soru&api_key=13254601";
                    }
                };
                if (_tipoComment=="REPORTES") {
                    var ReporteUrl="/api/v1/Cordenadas/"+_idReporte+"/";
                    if (_resource_uriPUT) {
                        _typeComment='PUT';
                        var url="http://192.168.1.208:8000/api/v1/startReporte/?Reporte__id="+_idReporte+"&Usuario__id="+_userID+"&username=soru&api_key=13254601";
                    }else{
                     _typeComment='POST';
                        var url="http://192.168.1.208:8000/api/v1/startReporte/?username=soru&api_key=13254601";

                    }
                };


                var data = JSON.stringify({
                  "Reporte":ReporteUrl,
                  "Usuario": userID,
                  "Calificacion": start,
                });

            }else{
                if (_tipoComment=="EMERGENCIA") {
                    var ReporteUrl="/api/v1/emergenciaReporte/"+_idReporte+"/";
                   /*if (_resource_uriPUT) {
                        _typeComment='PUT';
                        var url="http://192.168.1.208:8000"+_resource_uriPUT+"?username=soru&api_key=13254601";
                     }else{
                        _typeComment='POST';
                        var url="http://192.168.1.208:8000/api/v1/commentEmerg/?username=soru&api_key=13254601&limit=200";
                    }*/
                    _typeComment='POST';
                    var url="http://192.168.1.208:8000/api/v1/commentEmerg/?username=soru&api_key=13254601&limit=200";
                };
                if (_tipoComment=="REPORTES") {
                    var ReporteUrl="/api/v1/Cordenadas/"+_idReporte+"/";
                    /*if (_resource_uriPUT) {
                        _typeComment='PUT';
                        var url="http://192.168.1.208:8000"+_resource_uriPUT+"?username=soru&api_key=13254601&limit=200";
                    }else{
                     _typeComment='POST';
                        var url="http://192.168.1.208:8000/api/v1/comment/?username=soru&api_key=13254601&limit=200";
                    }*/
                    _typeComment='POST';
                    var url="http://192.168.1.208:8000/api/v1/comment/?username=soru&api_key=13254601&limit=200";
                };
                var data = JSON.stringify({
                  "Comment": mensaje,
                  "Reporte":ReporteUrl,
                  "Usuario": userID,
                  "Tipo": _tipoDeSend,
                  "Starts": start,
                  "_idReporte":_idReporte,
                  "_userID":_userID,
                });

            };
            console.log(_typeComment);
            console.log(url);
            console.log(JSON.stringify(data));
            $.ajax({
                url: url,
                type: _typeComment,
                contentType: 'application/json',
                data: data,
                dataType: 'json',
                processData: false,
                statusCode: {
                    200: function(data) {
                        console.log(data);
                        console.log(data.Usuario.username+" "+data.Usuario.id);
                        _startComment=data.Starts;
                        _resource_uriPUT=data.resource_uri;
                        $("#formMensaje").get(0).reset();

                        $("#user"+data.Usuario.id).html("<span>"+data.Usuario.username+"</span>  "+text+"</article>");
                        $(".result-count").html("listo <span title=':)' class='emoticon'></span>");
                        setTimeout(function(){$(".result-count").text("")},3000);
                    },
                    201: function(data) {
                        console.log(data);
                        _startComment=data.Starts;
                        _resource_uriPUT=data.resource_uri;
                        console.log(_startComment+" "+_resource_uriPUT);
                        $("#formMensaje").get(0).reset();
                        $("#comentarios").append("<article id='user"+data.Usuario.id+"'><span>"+data.Usuario.username+"</span>  "+text+"</article>");
                        $(".result-count").html("listo <span title=':)' class='emoticon'></span>");
                        setTimeout(function(){$(".result-count").text("")},3000)
                    },
                    404: function(data) {
                        $(".result-count").html("no se pudo enviar <span title=':(' class='emoticon'></span>");
                        setTimeout(function(){$(".result-count").text("")},3000)
                        
                    },
                    500: function(data) {
                        $(".result-count").html("no es culpa tuya es nuestra <span title=':(' class='emoticon'></span>");
                        setTimeout(function(){$(".result-count").text("")},3000)
                    }
                  },
            });
        });
        $("#detail").on("pageshow",function(event){
            var distancia = google.maps.geometry.spherical.computeDistanceBetween(_position, _positiondetail);
            $("#distanciaMIO").text(" a "+distancia+" metros");
            var info_window = $('<span>').append(
                $('<img>').attr({'src':_img,'id':'imageDetail'})).append(
                    $('<br>')).append(
                        $('<span>').attr('id','typeAlert').text(_typeAlert)).html(); 
            $('#map_detail').gmap({ 'center': _positiondetail ,'zoom': 18,'disableDefaultUI': true });
            $('#map_detail').gmap('addMarker', {'position': _positiondetail,'bounds': false}).click(function(){
                 $('#map_detail').gmap('openInfoWindow', {'content': info_window}, this);
                 $('#map_detail').gmap('getMap').panTo(_positiondetail);
            });
            //cargando comentarios para este reporte
            $("#comentariosMios").empty();
            if (_tipoComment=="EMERGENCIA") {
                var url="http://192.168.1.208:8000/api/v1/commentEmerg/?Reporte__id="+_idReporte+"&username=soru&api_key=13254601&limit=200";
            };
            if (_tipoComment=="REPORTES") {
                var url="http://192.168.1.208:8000/api/v1/comment/?Reporte__id="+_idReporte+"&username=soru&api_key=13254601&limit=200";
            };
            $(".result-count").text("Cargando...");

            $.getJSON( url , function(data) {
                $.each(data['objects'], function(key, val) {
                    var text = val['Comment'].replace(/(:\)|:8|:D|:hat|:rare|:silent|:lol|:shame|:xD|:imp|:secret|:a|:XD:|:sor:|:\(|:O|:P|:cool:|:'\(|:\|)/g, '<span title="$1" class="emoticon"></span>');
                    $("#comentariosMios").append("<div id='ratyStartDetail"+val['id']+"'></div><article><img class='puntuacion' src='http://192.168.1.208:8000/static/cityalert/diseno/categorias/comentarios.png' alt='puntuacion'><span>"+val['Usuario'].username+"</span> "+text+"</article>");
                    $("#ratyStartDetail"+val['id']).raty({ readOnly: true, score: val['Starts'] });
                });
                $(".result-count").text(" ");
            }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
         
        });

        $("#map-page").on("pageshow", function(event, ui) {
            $("#Agregar").click(function(event){
                var data = JSON.stringify({
                                          "nombre": $("#pac-input").val(),
                                          "Lat":_lat,
                                          "Long":_lng,
                                          "Usuario": userID,
                                        });
                $.ajax({
                    url: 'http://192.168.1.208:8000/api/v1/MisPuntos/?username=soru&api_key=13254601',
                    type: 'POST',
                    contentType: 'application/json',
                    data: data,
                    dataType: 'json',
                    processData: false,
                    statusCode: {
                        201: function(data) {
                            console.log(JSON.stringify(data));
                            $("#pac-input").val("");              
                        },
                        400: function(data) {
                            console.log(data);
                            $(".ResultSingup").text(data.responseJSON.errores);
                        },
                        404: function(data) {
                            console.log(data);
                        },
                        500: function(data) {
                            console.log(data);
                        }
                    },
                });
            });
            map = new google.maps.Map(document.getElementById('map-canvas'), {
                zoom: 17,
                center: latLngCenter,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false
            });
              map.controls[google.maps.ControlPosition.TOP_RIGHT].push(pacInputWrap);

              var autocomplete = new google.maps.places.Autocomplete(input);
              autocomplete.bindTo('bounds', map);

              var infowindow = new google.maps.InfoWindow();
              marker = new google.maps.Marker({
                map: map,
                draggable: true,
                anchorPoint: new google.maps.Point(0, -29)
              });
            markerCenter = new google.maps.Marker({
                position: latLngCenter,
                title: 'Location',
                map: map,
                draggable: true,
                anchorPoint: new google.maps.Point(0, -29)
            });
            circle = new google.maps.Circle({
                map: map,
                clickable: false,
                // metres
                radius: 200,
                fillColor: '#fff',
                fillOpacity: .3,
                strokeColor: '#313131',
                strokeOpacity: .4,
                strokeWeight: .8
            });
            circleFind = new google.maps.Circle({
                map: map,
                clickable: false,
                // metres
                radius: 200,
                fillColor: '#fff',
                fillOpacity: .3,
                strokeColor: '#313131',
                strokeOpacity: .4,
                strokeWeight: .8
            });
            // attach circle to marker
            circle.bindTo('center', markerCenter, 'position');
            bounds = circle.getBounds();
            var infoYO = new google.maps.InfoWindow();
                infoYO.setContent('<div><strong>yo estoy aqui </strong><br>');
                infoYO.open(map, markerCenter);

            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                infowindow.close();
                marker.setVisible(false);
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                  return;
                }

                // If the place has a geometry, then present it on a map.
                if (place.geometry.viewport) {
                  map.fitBounds(place.geometry.viewport);
                } else {
                  map.setCenter(place.geometry.location);
                  map.setZoom(17);  // Why 17? Because it looks good.
                }
                marker.setIcon(/** @type {google.maps.Icon} */({
                  url: place.icon,
                  size: new google.maps.Size(71, 71),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
                  scaledSize: new google.maps.Size(35, 35)
                }));
                marker.setPosition(place.geometry.location);
                marker.setVisible(true);

                var address = '';
                if (place.address_components) {
                  address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                  ].join(' ');
                }

                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
                infowindow.open(map, marker);
                // attach circle to marker
                circleFind.bindTo('center', marker, 'position');
                boundsFind = circleFind.getBounds();   
                clearMarkers();
                markers = [];//esto si los boora los markets
                $.getJSON( "http://192.168.1.208:8000/api/v1/Cordenadas/?Usuario__username="+localStorage.username+"&username=soru&api_key=13254601&limit=200", function(data) {
                    $.each(data['objects'], function(key, val) {
                            //boundbox.extend(new google.maps.LatLng(val['Lat'],val['Long']));
                            latLngA = new google.maps.LatLng(val['Lat'],val['Long']);
                            if (bounds.contains(latLngA)==true || boundsFind.contains(latLngA)==true) {
                                imagenIcon=val['Categoria'].Marker;
                                var markerA = new google.maps.Marker({
                                        position: latLngA,
                                        title: 'Location',
                                        map: map,
                                        icon: imagenIcon,
                                        draggable: true
                                    });
                                markers.push(markerA);
                                var infoA = new google.maps.InfoWindow();
                                infoA.setContent('<div><strong>'+val['Alert']+'</strong><br>');

                                google.maps.event.addListener(markerA, 'click', function() {
                                    infoA.open(map, markerA);
                                });
                            };
                            

                    });
                }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
                $.getJSON( "http://192.168.1.208:8000/api/v1/emergenciaReporte/?Usuario__username="+localStorage.username+"&Usuario__username="+localStorage.username+"&username=soru&api_key=13254601&limit=200", function(data) {
                        $.each(data['objects'], function(key, val) {
                                //boundbox.extend(new google.maps.LatLng(val['Lat'],val['Long']));
                                latLngA = new google.maps.LatLng(val['Lat'],val['Long']);
                                console.log("bounds "+bounds.contains(latLngA));
                                if (bounds.contains(latLngA)==true || boundsFind.contains(latLngA)==true) {
                                    imagenIcon=val['Categoria'].Marker;
                                    var markerA = new google.maps.Marker({
                                            position: latLngA,
                                            title: 'Location',
                                            map: map,
                                            icon: imagenIcon,
                                        });
                                    markers.push(markerA);
                                    var info_window = $('<span>').append(
                                                    $('<img>').attr({'src':val['Imagen'],"class":"ImgenMapa"})).append(
                                                        $('<br>')).append(
                                                            $('<a>').attr('href',val['Imagen']).text(val['Alert'])).html();
                                    var infoA = new google.maps.InfoWindow({
                                            content: info_window
                                        });

                                    google.maps.event.addListener(markerA, 'click', function() {
                                        infoA.open(map, markerA);
                                    });
                                };
                        });
                }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
            });    
                
            //var boundbox = new google.maps.LatLngBounds();
            $.getJSON( "http://192.168.1.208:8000/api/v1/Cordenadas/?Usuario__username="+localStorage.username+"&username=soru&api_key=13254601&limit=200", function(data) {
                    $.each(data['objects'], function(key, val) {
                            //boundbox.extend(new google.maps.LatLng(val['Lat'],val['Long']));
                            latLngA = new google.maps.LatLng(val['Lat'],val['Long']);
                            console.log("bounds "+bounds.contains(latLngA));
                            if (bounds.contains(latLngA)==true || boundsFind.contains(latLngA)==true) {
                                imagenIcon=val['Categoria'].Marker;
                                var markerA = new google.maps.Marker({
                                        position: latLngA,
                                        title: 'Location',
                                        map: map,
                                        icon: imagenIcon,
                                        draggable: true
                                    });
                                markers.push(markerA);
                                /*var info_window = $('<span>').append(
                                                $('<img>').attr({'src':val['Imagen'],"class":"ImgenMapa"})).append(
                                                    $('<br>')).append(
                                                        $('<a>').attr('href',val['Imagen']).text(val['Alert'])).html();*/
                                /*var infoA = new google.maps.InfoWindow({
                                        content: info_window
                                    });*/
                                var infoA = new google.maps.InfoWindow();
                                infoA.setContent('<div><strong>'+val['Alert']+'</strong><br>');
                                // get some latLng object and Question if it's contained in the circle:
                                google.maps.event.addListener(markerCenter, 'dragend', function() {
                                    latLngCenter = new google.maps.LatLng(markerCenter.position.lat(), markerCenter.position.lng());
                                    bounds = circle.getBounds();
                                    console.log(bounds.contains(latLngA));
                                    if (bounds.contains(latLngA)==true) {

                                    }else{
                                       // markerA.setMap(null);
                                    }
                                });
                                google.maps.event.addListener(marker, 'dragend', function() {
                                    latLngCenter = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
                                    boundsFind = circleFind.getBounds();
                                    console.log(boundsFind.contains(latLngA));
                                });
                                google.maps.event.addListener(markerA, 'dragend', function() {
                                    latLngA = new google.maps.LatLng(markerA.position.lat(), markerA.position.lng());
                                        console.log(" boundsFind "+boundsFind.contains(latLngA));
                                    if (bounds.contains(latLngA)==true || boundsFind.contains(latLngA) == true) {

                                    }else{
                                        markerA.setMap(null);
                                    }
                                });
                                google.maps.event.addListener(markerA, 'click', function() {
                                    infoA.open(map, markerA);
                                });

                                google.maps.event.addListener(markerA, 'drag', function() {
                                    infoA.close();
                                });
                            };
                            

                    });
                    console.log(markers);
                    //map.setCenter(boundbox.getCenter());
                    //map.fitBounds(boundbox);
            }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
            $.getJSON( "http://192.168.1.208:8000/api/v1/emergenciaReporte/?Usuario__username="+localStorage.username+"&Usuario__username="+localStorage.username+"&username=soru&api_key=13254601&limit=200", function(data) {
                    $.each(data['objects'], function(key, val) {
                            //boundbox.extend(new google.maps.LatLng(val['Lat'],val['Long']));
                            latLngA = new google.maps.LatLng(val['Lat'],val['Long']);
                            console.log("bounds "+bounds.contains(latLngA));
                            if (bounds.contains(latLngA)==true || boundsFind.contains(latLngA)==true) {
                                imagenIcon=val['Categoria'].Marker;
                                var markerA = new google.maps.Marker({
                                        position: latLngA,
                                        title: 'Location',
                                        map: map,
                                        icon: imagenIcon,
                                        draggable: true
                                    });
                                markers.push(markerA);
                                var info_window = $('<span>').append(
                                                $('<img>').attr({'src':val['Imagen'],"class":"ImgenMapa"})).append(
                                                    $('<br>')).append(
                                                        $('<a>').attr('href',val['Imagen']).text(val['Alert'])).html();
                                var infoA = new google.maps.InfoWindow({
                                        content: info_window
                                    });
                                // get some latLng object and Question if it's contained in the circle:
                                google.maps.event.addListener(markerCenter, 'dragend', function() {
                                    latLngCenter = new google.maps.LatLng(markerCenter.position.lat(), markerCenter.position.lng());
                                    bounds = circle.getBounds();
                                    console.log(bounds.contains(latLngA));
                                    if (bounds.contains(latLngA)==true) {

                                    }else{
                                       // markerA.setMap(null);
                                    }
                                });
                                google.maps.event.addListener(marker, 'dragend', function() {
                                    latLngCenter = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
                                    boundsFind = circleFind.getBounds();
                                    console.log(boundsFind.contains(latLngA));
                                });
                                google.maps.event.addListener(markerA, 'dragend', function() {
                                    latLngA = new google.maps.LatLng(markerA.position.lat(), markerA.position.lng());
                                    if (bounds.contains(latLngA)==true || boundsFind.contains(latLngA) == true) {

                                    }else{
                                        markerA.setMap(null);
                                    }
                                });
                                google.maps.event.addListener(markerA, 'click', function() {
                                    infoA.open(map, markerA);
                                });

                                google.maps.event.addListener(markerA, 'drag', function() {
                                    infoA.close();
                                });
                            };
                    });
            }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
        });      
        $("#photoPicture").on("pageshow",function(event, ui){
            console.log("_position++++++++++++++"+_position);
            var iconMarket = $("#grouṕSubcate").attr("title");
            $('#imagemapa').gmap({ 'center': _position ,'zoom': 18,'disableDefaultUI': true });
                $('#imagemapa').gmap('addMarker', {'icon': iconMarket,'position': _position,'bounds': false}).click(function(){
                $('#imagemapa').gmap('getMap').panTo(_position);
            }); 
            $('#photoPictureForm').bind('submit', function(e) {
                e.preventDefault();
                $("#photoPictureForm").hide();

            }); 
        });
        $('#formLinea').bind('submit', function(e) {
            e.preventDefault();
            var emptyTest = $('#id_Alert').val().length < 1;
            if(emptyTest) {  
                alert("hey tienes que escribir algo antes de enviar");  
                window.location.assign("#map_canvas");

                return false;  
            };
            if ($("#id_Alert").val().length < 5) {  
                alert("disculpa pero debe tener como minimo 5 caracteres");  
                window.location.assign("#map_canvas");
                return false;  
            };
            if (!(_idCat)) {
                alert("selecciona una categoria");  
                window.location.assign("#id_Alert");
                return false;  
            }else if (!(_idSub)) {
                alert("selecciona una subcategoria");
                window.location.assign("#id_Alert");
                return false;  
            };
            $.mobile.loading( 'show', {
                text: 'espere enviando...',
                textVisible: true,
                theme: 'b',
            });
            if (_photo_uri) {
                var opts = new FileUploadOptions();
                  opts.fileKey  = "image";
                  opts.fileName = _photo_uri.substr(_photo_uri.lastIndexOf('/')+1);
                  opts.mimeType = "image/jpeg";
                  opts.params   = {"type":"file",'key': '52d4a6d76d21a4b'};
                  var headers={'Authorization': 'Client-ID 52d4a6d76d21a4b'};
                  opts.headers = headers;
                  var ft = new FileTransfer();
                  ft.upload(_photo_uri, "https://api.imgur.com/3/image",
                                  function(resp) {                              
                                    link = jQuery.parseJSON(resp.response).data.link;
                                    //$(".result-count").html($("<a>").attr({"href":link}).text("imagen publicada en " + link));
                                     var data = JSON.stringify({
                                          "Alert": $("#id_Alert").val(),
                                          "Categoria":"/api/v1/categoria/"+_idCat+"/",
                                          'Imagen':link,
                                          "Lat":_lat,
                                          "Long":_lng,
                                          "Subcategoria":"/api/v1/subcategoria/"+_idSub+"/",
                                          "Usuario": "/api/v1/user/1/",
                                        });
                                        $.ajax({
                                            url: 'http://192.168.1.208:8000/api/v1/Cordenadas/?username=soru&api_key=13254601',
                                            type: 'POST',
                                            contentType: 'application/json',
                                            data: data,
                                            dataType: 'json',
                                            processData: false,
                                            statusCode: {
                                                201: function(data) {
                                                    $("#formLinea").get(0).reset();
                                                    $("#subcategoria").hide();
                                                    $(".pic").attr("src","");
                                                    $(".pic").hide();
                                                    _photo_uri="";
                                                    _idCat="";
                                                    _idSub="";
                                                    $.mobile.loading('hide');
                                                    $("#reportes,#alertas,#iconCatego").empty();
                                                    $( "#jaja" ).popup({ history: false });
                                                    var marcado = $("#checkbox-1").prop("checked") ? true : false;
                                                    console.log(marcado);
                                                    $("#jaja").popup( "open" );
                                                },
                                                404: function(data) {
                                                    $.mobile.loading('hide');
                                                    $("#jaja").find("h3").text("losiento no pude notificar <span title=':(' class='emoticon'></span>");
                                                    $("#reportes,#alertas,#iconCatego").empty();
                                                    $( "#jaja" ).popup({ history: false });
                                                    $("#jaja").popup( "open" );
                                                },
                                                500: function(data) {
                                                    $.mobile.loading('hide');
                                                    $("#jaja").find("h3").text("no es culpa tuya es nuestra <span title=':(' class='emoticon'></span>");
                                                    $("#reportes,#alertas,#iconCatego").empty();
                                                    $( "#jaja" ).popup({ history: false });
                                                    $("#jaja").popup( "open" );
                                                }
                                              },
                                        });
                                  },            
                                 function(error) {
                                    $.mobile.loading('hide');
                                    $(".result-count").html("no fue posible publicar " + error.code);
                                  }, opts);
            }else{
                var data = JSON.stringify({
                  "Alert": $("#id_Alert").val(),
                  "Categoria":"/api/v1/categoria/"+_idCat+"/",
                  'Imagen':' ',
                  "Lat":_lat,
                  "Long":_lng,
                  "Subcategoria":"/api/v1/subcategoria/"+_idSub+"/",
                  "Usuario": userID,
                });
                $.ajax({
                    url: 'http://192.168.1.208:8000/api/v1/Cordenadas/?username=soru&api_key=13254601',
                    type: 'POST',
                    contentType: 'application/json',
                    data: data,
                    dataType: 'json',
                    processData: false,
                    statusCode: {
                        201: function(data) {
                            $("#formLinea").get(0).reset();
                            $("#subcategoria").hide();
                            _idCat="";
                            _idSub="";
                            $.mobile.loading('hide');
                            $("#reportes,#alertas,#iconCatego").empty();
                            $( "#jaja" ).popup({ history: false });
                            $("#jaja").popup( "open" );
                        },
                        404: function(data) {
                            $.mobile.loading('hide');
                            $("#jaja").find("h3").html("losiento no pude notificar <span title=':(' class='emoticon'></span>");
                            $("#reportes,#alertas,#iconCatego").empty();
                            $( "#jaja" ).popup({ history: false });
                            $("#jaja").popup( "open" );
                        },
                        500: function(data) {
                            $.mobile.loading('hide');
                            $("#jaja").find("h3").html("no es culpa tuya es nuestra <span title=':(' class='emoticon'></span>");
                            $("#reportes,#alertas,#iconCatego").empty();
                            $( "#jaja" ).popup({ history: false });
                            $("#jaja").popup( "open" );
                        }
                    },
                });

            }    
        });
        $('#formemergencia').bind('submit', function(e) {
            e.preventDefault();
             var data = JSON.stringify({
                                  "message": 'niño niño',
                                  "link": 'http://192.168.1.208:8000/cityalert/reporte/',
                                  "fbtoken":tokenStore['fbtoken'],
                                  "oauth_token": tokenStoreTwitter['twtoken'],
                                  "oauth_token_secret":tokenStoreTwitter['twtoken_secret'],
                                  "lat":_lat,
                                  "longitude":_lng,
                                  "pathImage":'',
                                });
                                console.log("datos enviados al api------------> "+JSON.stringify(data));
                                $.ajax({
                                    url: 'http://192.168.1.208:8000/api/v1/StatusTwitterFacebook/?username=soru&api_key=13254601',
                                    type: 'POST',
                                    contentType: 'application/json',
                                    data: data,
                                    dataType: 'json',
                                    processData: false,
                                    statusCode: {
                                        201: function(data) {
                                            console.log("201 "+JSON.stringify(data));
                                        },
                                        404: function(data) {
                                            console.log("404 "+JSON.stringify(data));
                                        },
                                        500: function(data) {
                                            console.log("500 "+JSON.stringify(data));
                                        }
                                    },
                                });
            var emptyTest = $('#id_Emerg').val().length < 1;
            if(emptyTest) {  
                alert("hey tienes que escribir algo antes de enviar");  
                return false;  
            };
            if($("#id_Emerg").val().length < 5) {  
                alert("disculpa pero debe tener como minimo 5 caracteres");  
                return false;  
            };

            $(".result-count").text("espere porfavor");
            $.mobile.loading( 'show', {
                text: 'espere enviando...',
                textVisible: true,
                theme: 'b',
            });
            if (_photo_uri) {
              var opts = new FileUploadOptions();
              opts.fileKey  = "image";
              opts.fileName = _photo_uri.substr(_photo_uri.lastIndexOf('/')+1);
              opts.mimeType = "image/jpeg";
              opts.params   = {"type":"file",'key': '52d4a6d76d21a4b'};
              var headers={'Authorization': 'Client-ID 52d4a6d76d21a4b'};
              opts.headers = headers;
              var ft = new FileTransfer();
              ft.upload(_photo_uri, "https://api.imgur.com/3/image",
                              function(resp) {                              
                                link = jQuery.parseJSON(resp.response).data.link;
                                //$(".result-count").html($("<a>").attr({"href":link}).text("imagen publicada en " + link));
                                 var data = JSON.stringify({
                                      "Alert": $("#id_Emerg").val(),
                                      'Imagen':link,
                                      "Lat":_lat,
                                      "Long":_lng,
                                      "Usuario": "/api/v1/user/1/",
                                      "Categoria":"/api/v1/emergenciaCat/"+_idEmerg+"/",
                                    });
                                    $.ajax({
                                        url: 'http://192.168.1.208:8000/api/v1/emergenciaReporte/?username=soru&api_key=13254601',
                                        type: 'POST',
                                        contentType: 'application/json',
                                        data: data,
                                        dataType: 'json',
                                        processData: false,
                                        statusCode: {
                                            201: function(data) {
                                                $("#formemergencia").get(0).reset();
                                                $(".pic").attr("src","");
                                                $(".pic").hide();
                                                _photo_uri="";
                                                _idEmerg="";
                                                $.mobile.loading('hide');
                                                $("#reportes,#alertas,#iconCatego").empty();
                                                $( "#jaja2" ).popup({ history: false });
                                                $("#jaja2").popup( "open" );
                                            },
                                            404: function(data) {
                                                $.mobile.loading('hide');
                                                $("#jaja2").find("h3").text("losiento no pude notificar <span title=':(' class='emoticon'></span>");
                                                $("#reportes,#alertas,#iconCatego").empty();
                                                $( "#jaja2" ).popup({ history: false });
                                                $("#jaja2").popup( "open" );
                                            },
                                            500: function(data) {
                                                $.mobile.loading('hide');
                                                $("#jaja2").find("h3").html("no es culpa tuya es nuestra <span title=':(' class='emoticon'></span>");
                                                $("#reportes,#alertas,#iconCatego").empty();
                                                $( "#jaja2" ).popup({ history: false });
                                                $("#jaja2").popup( "open" );
                                            }
                                        },
                                    });
                              },            
                             function(error) {
                                $.mobile.loading('hide');
                                $("#jaja2").find("h3").text("losiento no pude notificar <span title=':(' class='emoticon'></span>");
                                $( "#jaja2" ).popup({ history: false });
                                $("#jaja2").popup( "open" );
                              }, opts);
            }else{
                var data = JSON.stringify({
                  "Alert": $("#id_Emerg").val(),
                  'Imagen':' ',
                  "Lat":_lat,
                  "Long":_lng,
                  "Usuario": "/api/v1/user/1/",
                  "Categoria":"/api/v1/emergenciaCat/"+_idEmerg+"/",
                });
                $.ajax({
                    url: 'http://192.168.1.208:8000/api/v1/emergenciaReporte/?username=soru&api_key=13254601',
                    type: 'POST',
                    contentType: 'application/json',
                    data: data,
                    dataType: 'json',
                    processData: false,
                    statusCode: {
                        201: function(data) {
                            
                            $("#formemergencia").get(0).reset();
                            $.mobile.loading('hide');
                            $("#reportes,#alertas,#iconCatego").empty();
                            $( "#jaja2" ).popup({ history: false });
                            $("#jaja2").popup( "open" );
                        },
                        404: function(data) {
                            $.mobile.loading('hide');
                            $("#jaja2").find("h3").html("losiento no pude notificar <span title=':(' class='emoticon'></span>");
                            $("#reportes,#alertas,#iconCatego").empty();
                            $( "#jaja2" ).popup({ history: false });
                            $("#jaja2").popup( "open" );
                        },
                        500: function(data) {
                            $.mobile.loading('hide');
                            $("#jaja2").find("h3").html("no es culpa tuya es nuestra <span title=':(' class='emoticon'></span>");
                            $("#reportes,#alertas,#iconCatego").empty();
                            $( "#jaja2" ).popup({ history: false });
                            $("#jaja2").popup( "open" );
                        }
                    },
                });
            } 
        }); 
    }
    function refreshPage() {
      $.mobile.changePage(
        window.location.href,
        {
          allowSamePageTransition : true,
          transition              : 'none',
          showLoadMsg             : true,
          reloadPage              : true
        }
      );
    }
    function takePhoto(event) {
        var opts = { 
            quality : 50,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 500, 
            targetHeight: 500, 
            destinationType : Camera.DestinationType.FILE_URI
        }
        navigator.camera.getPicture(function(imageURI) {
                                        _photo_uri = imageURI;
                                        $(".pic").attr("src",_photo_uri);
                                        $(".pic").show();
                                    }, 
                                    function(error){
                                            $(".result-count").html("error " + error.code);
                                    }, opts)
    }              
 
    function locationSuccess(position){
        _lat = position.coords.latitude;                     
        _lng = position.coords.longitude;  

        _position = new google.maps.LatLng(_lat,_lng);
        latLngCenter = new google.maps.LatLng(_lat, _lng);
        latLngCMarker = new google.maps.LatLng(_lat, _lng);   
    }
     function locationError(error) {    
          $.mobile.loading( 'show', {
                text: 'no es culpa tuya es nuestra intentalo conectado a internet',
                textVisible: true,
                theme: 'd'
            });
        $('#map-canvas').gmap({'zoom': 2});
    }
    function detalleFoto(id,imagen){
        $("#imagen").empty();
        $("#imagen").append($('<img>').attr({'src':imagen,'class':'imagenchoque'}));
    }
    function Categoria(id){
        if (_idCat) {
            $( "#cat"+_idCat+" img" ).removeClass( "activar" );
        }
        _idCat=id;
        $( "#cat"+id+" img" ).addClass( "activar");
        $("#subcategoria").empty();
        $(".result-count").text("Carando ...");
        $.mobile.loading( 'show', {
                text: 'espere cargando...',
                textVisible: true,
                theme: 'b',
            });
        $("#subcategoria").show();
        $.getJSON( "http://192.168.1.208:8000/api/v1/subcategoria/?Categoria="+id+"&username=soru&api_key=13254601&limit=200", function(data) {
            $.each(data['objects'], function(key, val) {
                $("#subcategoria").append("<div class='grouṕSubcate' ><a href='#' class='radio' id='sub"+val['id']+"' onclick=javascript:ajax.subcategoria('"+val['id']+"','"+val['Marker']+"');><img class='iconCategoria' src='"+val['avatar']+"' alt='"+val['Subcategoria']+"'></a><p>"+val['Subcategoria']+"</p><span style='display:none'>vigencia una semana</span></div>");                            
            });
            $(".result-count").text("");
            $("#subcategoria").listview("refresh");
        }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
        $.mobile.loading('hide');
    }
    function Subcategoria(id,marker){
        _marker=marker;
        console.log(_marker);
        _Subcategoria=$("#sub"+id).next().text();
        if (_idSub) {
            $( "#sub"+_idSub+" img" ).removeClass( "activar" );
            $( "#sub"+_idSub).next().removeClass( "tamaño" );
        }
        _idSub=id;
        $( "#sub"+id+" img" ).addClass( "activar");
        $( "#sub"+id).next().addClass( "tamaño" );
        $( "#sub"+id).next().next().show().addClass("caducacion");
         $(".grouṕSubcate").hide();
        $( "#sub"+id).parents().show();
        $( ".grouṕSubcate").removeClass("grouṕSubcate");
    }
    function emergenciaCat(id,img){
        var imgUrl=$("#typeEmerg"+id+" img").attr("src");
        _idEmerg=id;
        $("#imagenEmergencia").attr("src",imgUrl);
    }
    function detail(id,img,tipo,lat,lng,start){
        if (tipo=="EMERGENCIA") {
            var time=$("#detailEmerg"+id).find("time").attr("datetime");
            $("#grouṕSubcateMIO").html('<span><time class="timeago" id="timeago" datetime="'+time+'"></time></span><span id="distanciaMIO"></span>');
            $(".timeago").timeago();
            _idReporte=id;
            _tipoComment=tipo;
            _typeAlert=$("#detailEmerg"+id).find("h3").text();
            var categoria=$("#detailEmerg"+id).attr("title");
            _positiondetail = new google.maps.LatLng(lat,lng);
            _img=img;
            var urlcategoria=$("#detailEmerg"+id).find("img").attr("src");
            $("#startEnd").raty({ readOnly: true, score: start });
            $("#tituloDetail").text("Emergencia");
            $("#iconCategoriaMIO").attr("src",urlcategoria);
            $("#iconCategoriaMIO").next().text(categoria);
            $("#grouṕcateMIO").text(_typeAlert);
        };
        if (tipo=="REPORTES") {
            var time=$("#detailReport"+id).find("time").attr("datetime");
            $("#grouṕSubcateMIO").html('<span><time class="timeago" id="timeago" datetime="'+time+'"></time></span><span id="distanciaMIO"></span>');
            $(".timeago").timeago();
            _idReporte=id;
            _tipoComment=tipo;
            _typeAlert=$("#detailReport"+id).find("h3").text();
            var categoria=$("#detailReport"+id).attr("title");
            _positiondetail = new google.maps.LatLng(lat,lng);
            _img=img;
            var urlcategoria=$("#detailReport"+id).find("img").attr("src");
            $("#startEnd").raty({ readOnly: true, score: start });
            $("#tituloDetail").text("Emergencia");
            $("#iconCategoriaMIO").attr("src",urlcategoria);
            $("#iconCategoriaMIO").next().text(categoria);
            $("#grouṕcateMIO").text(_typeAlert);
        }
        
    }
    function Comment(id,img,tipo,lat,lng,marker){
        if (tipo=="EMERGENCIA") {
            var time=$("#CommentEmerg"+id).find("time").attr("datetime");
            $("#grouṕSubcate").html('<span><time class="timeago" id="timeago" datetime="'+time+'"></time></span><span id="distancia"></span>');
            $("#timeago").timeago();
            _idReporte=id;
            _tipoComment=tipo;
            _typeAlert=$("#CommentEmerg"+id).find("h3").text();
            var categoria=$("#CommentEmerg"+id).attr("title");
            _positionComment = new google.maps.LatLng(lat,lng);
            _img=img;
            var urlcategoria=$("#CommentEmerg"+id).find("img").attr("src");
            $("#iconCategoria").attr("src",urlcategoria);
            $("#titulocomment").text("Emergencia");
            $("#iconCategoria").next().text(categoria);
            $("#grouṕcate").text(_typeAlert);
        };
        if (tipo=="REPORTES") {
            var time=$("#CommentReport"+id).find("time").attr("datetime");
            $("#grouṕSubcate").html('<span><time class="timeago" id="timeago" datetime="'+time+'"></time></span><span id="distancia">a 100 mts</span>');
            $("#timeago").timeago();
            _idReporte=id;
            _tipoComment=tipo;
            _typeAlert=$("#CommentReport"+id).find("h3").text();
            var categoria=$("#CommentReport"+id).attr("title");
            _positionComment = new google.maps.LatLng(lat,lng);
            _img=img;
            var urlcategoria=$("#CommentReport"+id).find("img").attr("src");
            $("#titulocomment").text("Reporte");
            $("#iconCategoria").attr("src",urlcategoria);
            $("#iconCategoria").next().text(categoria);
            $("#grouṕcate").text(_typeAlert); 
        }
    }
    function CreateUser(data){
        $.ajax({
            url: 'http://192.168.1.208:8000/api/v1/create_user/?username=soru&api_key=13254601',
            type: 'POST',
            contentType: 'application/json',
            data: data,
            dataType: 'json',
            processData: false,
            statusCode: {
                201: function(data) {
                    console.log(data);
                    $(".ResultSingup").text("registrado con exito");
                    localStorage.username = data.code.username;
                    localStorage.Password = data.code.password;
                    username=data.code.username;
                    userID="/api/v1/user/"+data.code.id+"/";
                    _userID=data.code.id;
                    email=data.code.email;
                    $("#UsuarioApi").text(data.code.username);
                    $("#emailApi").text(data.code.email);                    
                    setTimeout(function(){window.location.assign("#Notificaciones");$(".ResultSingup").text("")},3000)   
                },
                400: function(data) {
                    console.log(data);
                    $(".ResultSingup").text(data.responseJSON.errores);
                },
                404: function(data) {
                    console.log(data);
                },
                500: function(data) {
                    console.log(data);
                }
            },
        });
    }
    function filtering(categoria){
        $("#reportes").empty();
        console.log(categoria);
        $.getJSON( "http://192.168.1.208:8000/api/v1/Cordenadas/?Categoria__Categoria="+categoria+"&username=soru&api_key=13254601&limit=200", function(data) {
                $.each(data['objects'], function(key, val) {
                    $("#reportes").append("<li><a href='#Comment' data-href='#Comment' id='CommentReport"+val['id']+"' title='"+val['Categoria'].Categoria+"' onclick=javascript:ajax.Comment('"+val['id']+"','"+val['Imagen']+"','REPORTES','"+val['Lat']+"','"+val['Long']+"');><img src='"+val['Categoria'].avatar+"' class='ui-li-thumb'/><div class='tipoCategoria'>"+val['Categoria'].Categoria+"</div><h3 class='ui-li-heading'>"+val['Alert']+"</h3><p class='ui-li-desc'><span><time class='timeago' datetime='"+val['Fecha']+"'></time></span><img class='puntuacion' src='http://192.168.1.208:8000/static/cityalert/diseno/categorias/estrellita.png' alt='puntuacion'><img class='puntuacion' src='http://192.168.1.208:8000/static/cityalert/diseno/categorias/estrellita.png' alt='puntuacion'><img class='puntuacion' src='http://192.168.1.208:8000/static/cityalert/diseno/categorias/estrellita.png' alt='puntuacion'><span>(5)</span><img  class='puntuacion' src='http://192.168.1.208:8000/static/cityalert/diseno/categorias/comentarios.png' alt='puntuacion'><span>(5)</span><span class='distancia'>a 100 mts</span></p></a></li>");
                });
                $("#reportes").listview("refresh");
                $("time.timeago").timeago();

                if (data.meta.total_count) {
                    $(".result-countReportes").text("");
                }else{
                    $(".result-countReportes").text("No hay reportes por el momento de la categoria "+categoria);
                }
        }).fail(function() { $(".result-countReportes").text("Acupa Estar Conectado a Internet "); });
    }
    function filteringCanvasMAp(categoria){
        console.log(categoria);
        clearMarkers();
        markers = [];//esto si los boora los markets
       $.getJSON( "http://192.168.1.208:8000/api/v1/Cordenadas/?Categoria__Categoria="+categoria+"&Usuario__username="+localStorage.username+"&Usuario__username="+localStorage.username+"&username=soru&api_key=13254601&limit=200", function(data) {
                    $.each(data['objects'], function(key, val) {
                            //boundbox.extend(new google.maps.LatLng(val['Lat'],val['Long']));
                            latLngA = new google.maps.LatLng(val['Lat'],val['Long']);
                            console.log("boundsFindPunto  "+boundsFindPunto.contains(latLngA));
                            if (bounds.contains(latLngA)==true || boundsFind.contains(latLngA)==true) {
                                imagenIcon=val['Categoria'].Marker;
                                var markerA = new google.maps.Marker({
                                        position: latLngA,
                                        title: 'Location',
                                        map: map,
                                        icon: imagenIcon,
                                        draggable: true
                                    });
                                markers.push(markerA);
                                var info_window = $('<span>').append(
                                                $('<img>').attr({'src':val['Imagen'],"class":"ImgenMapa"})).append(
                                                    $('<br>')).append(
                                                        $('<a>').attr('href',val['Imagen']).text(val['Alert'])).html();
                                var infoA = new google.maps.InfoWindow({
                                        content: info_window
                                    });
                                // get some latLng object and Question if it's contained in the circle:
                                google.maps.event.addListener(markerCenter, 'dragend', function() {
                                    latLngCenter = new google.maps.LatLng(markerCenter.position.lat(), markerCenter.position.lng());
                                    bounds = circle.getBounds();
                                    console.log(bounds.contains(latLngA));
                                    if (bounds.contains(latLngA)==true) {

                                    }else{
                                       // markerA.setMap(null);
                                    }
                                });
                                google.maps.event.addListener(marker, 'dragend', function() {
                                    latLngCenter = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
                                    boundsFind = circleFind.getBounds();
                                    console.log(boundsFind.contains(latLngA));
                                });
                                google.maps.event.addListener(markerA, 'dragend', function() {
                                    latLngA = new google.maps.LatLng(markerA.position.lat(), markerA.position.lng());
                                    if (bounds.contains(latLngA)==true || boundsFind.contains(latLngA) == true) {

                                    }else{
                                        markerA.setMap(null);
                                    }
                                });
                                google.maps.event.addListener(markerA, 'click', function() {
                                    infoA.open(map, markerA);
                                });

                                google.maps.event.addListener(markerA, 'drag', function() {
                                    infoA.close();
                                });
                            };
                            

                    });
            }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
            $.getJSON( "http://192.168.1.208:8000/api/v1/emergenciaReporte/?Usuario__username="+localStorage.username+"&Usuario__username="+localStorage.username+"&username=soru&api_key=13254601&limit=200", function(data) {
                    $.each(data['objects'], function(key, val) {
                            //boundbox.extend(new google.maps.LatLng(val['Lat'],val['Long']));
                            latLngA = new google.maps.LatLng(val['Lat'],val['Long']);
                            console.log("bounds "+bounds.contains(latLngA));
                            if (bounds.contains(latLngA)==true || boundsFind.contains(latLngA)==true) {
                                imagenIcon=val['Categoria'].Marker;
                                var markerA = new google.maps.Marker({
                                        position: latLngA,
                                        title: 'Location',
                                        map: map,
                                        icon: imagenIcon,
                                        draggable: true
                                    });
                                markers.push(markerA);
                                var info_window = $('<span>').append(
                                                $('<img>').attr({'src':val['Imagen'],"class":"ImgenMapa"})).append(
                                                    $('<br>')).append(
                                                        $('<a>').attr('href',val['Imagen']).text(val['Alert'])).html();
                                var infoA = new google.maps.InfoWindow({
                                        content: info_window
                                    });
                                // get some latLng object and Question if it's contained in the circle:
                                google.maps.event.addListener(markerCenter, 'dragend', function() {
                                    latLngCenter = new google.maps.LatLng(markerCenter.position.lat(), markerCenter.position.lng());
                                    bounds = circle.getBounds();
                                    console.log(bounds.contains(latLngA));
                                    if (bounds.contains(latLngA)==true) {

                                    }else{
                                       // markerA.setMap(null);
                                    }
                                });
                                google.maps.event.addListener(marker, 'dragend', function() {
                                    latLngCenter = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
                                    boundsFind = circleFind.getBounds();
                                    console.log(boundsFind.contains(latLngA));
                                });
                                google.maps.event.addListener(markerA, 'dragend', function() {
                                    latLngA = new google.maps.LatLng(markerA.position.lat(), markerA.position.lng());
                                    if (bounds.contains(latLngA)==true || boundsFind.contains(latLngA) == true) {

                                    }else{
                                        markerA.setMap(null);
                                    }
                                });
                                google.maps.event.addListener(markerA, 'click', function() {
                                    infoA.open(map, markerA);
                                });

                                google.maps.event.addListener(markerA, 'drag', function() {
                                    infoA.close();
                                });
                            };
                    });
            }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
       
    }
    // Sets the map on all markers in the array.
    function setAllMap(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }
    function setAllMapPunto(map) {
      for (var i = 0; i < markersPunto.length; i++) {
        markersPunto[i].setMap(map);
      }
    }
    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
        setAllMap(null);
    }
    function clearMarkersPunto(){
        setAllMapPunto(null);
    }
    function panTo(id,nombre,lat,Long){
        $("#pac-inputWrap").hide();
        clearMarkers();
        markers = [];//esto si los boora los markets
        latLngA = new google.maps.LatLng(lat,Long);
        var marker = new google.maps.Marker({
            position: latLngA,
            title: 'Location',
            map: map,
            icon: "http://192.168.1.208:8000/static/cityalert/diseno/categorias/miPunto.png",
        });
        var info_window = '<div><strong>'+nombre+'</strong>';
        var infoA = new google.maps.InfoWindow({
                content: info_window
            });
        infoA.open(map, marker);
        map.setCenter(marker.getPosition());
        map.setZoom(18);                    
        circleFind.bindTo('center', marker, 'position');
        boundsFind = circleFind.getBounds(); 
        $.getJSON( "http://192.168.1.208:8000/api/v1/Cordenadas/?username=soru&api_key=13254601&limit=200", function(data) {
            $.each(data['objects'], function(key, val) {
                    //boundbox.extend(new google.maps.LatLng(val['Lat'],val['Long']));
                    latLngA = new google.maps.LatLng(val['Lat'],val['Long']);
                    if (boundsFind.contains(latLngA)==true) {
                        imagenIcon=val['Categoria'].Marker;
                        var markerA = new google.maps.Marker({
                                position: latLngA,
                                title: 'Location',
                                map: map,
                                icon: imagenIcon,
                            });
                        markers.push(markerA);
                        var infoA = new google.maps.InfoWindow();
                        infoA.setContent('<div><strong>'+val['Alert']+'</strong><br>');
                        google.maps.event.addListener(markerA, 'click', function() {
                            infoA.open(map, markerA);
                        });
                    };
                    

            });
        }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
        $.getJSON( "http://192.168.1.208:8000/api/v1/emergenciaReporte/?Usuario__username="+localStorage.username+"&username=soru&api_key=13254601&limit=200", function(data) {
                $.each(data['objects'], function(key, val) {
                        //boundbox.extend(new google.maps.LatLng(val['Lat'],val['Long']));
                        latLngA = new google.maps.LatLng(val['Lat'],val['Long']);
                        console.log("bounds "+bounds.contains(latLngA));
                        if (boundsFind.contains(latLngA)==true) {
                            imagenIcon=val['Categoria'].Marker;
                            var markerA = new google.maps.Marker({
                                    position: latLngA,
                                    title: 'Location',
                                    map: map,
                                    icon: imagenIcon,
                                });
                            markers.push(markerA);
                            var info_window = $('<span>').append(
                                            $('<img>').attr({'src':val['Imagen'],"class":"ImgenMapa"})).append(
                                                $('<br>')).append(
                                                    $('<a>').attr('href',val['Imagen']).text(val['Alert'])).html();
                            var infoA = new google.maps.InfoWindow({
                                    content: info_window
                                });

                            google.maps.event.addListener(markerA, 'click', function() {
                                infoA.open(map, markerA);
                            });
                        };
                });
        }).fail(function() { $(".result-count").text("Acupa Estar Conectado a Internet "); });
            

    }
  return{
    inicio:started,
    takePhoto:takePhoto,
    detalle:detalleFoto,
    categoria:Categoria,
    subcategoria:Subcategoria,
    emergenciaCat:emergenciaCat,
    detail:detail,
    Comment:Comment,
    CreateUser:CreateUser,
    filtering:filtering,
    filteringCanvasMAp:filteringCanvasMAp,
    setAllMap:setAllMap,
    panTo:panTo,
  }
              
})(jQuery);

(function() {
   ajax.inicio();
}).call(this);