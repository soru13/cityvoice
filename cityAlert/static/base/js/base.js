// Generated by CoffeeScript 1.4.0
/*JESUS EDUARDO MURRIETA ROSAS
#Reposiotrio en github del proyecto 
#github     https://github.com/soru13/GestionDeProyectos*/
var ajaxStarted=(function($){
	var nombre,pswd,ip,tokenSocked,UserLoginId;
	var arrayNames = {};
	var websocket;
	var _accion="";
	var websocket = io.connect('http://sa.dynns.com:3000/');
	var pathname ='';
	var isOpera
	var isFirefox
	var isSafari
	var isChrome
	var isIE
  	function started(){	
  		
  		

  		pathname = window.location.pathname;//obtenemos la url
  		$(".emoticon").click(function(e){
  			e.preventDefault();
  			title=$(this).attr("title");
  			if (pathname=='/live') {
  				mensaje=$("#msg").val();
  				$("#msg").val(mensaje+title);
  				$("#msg").focus();
  			}else{
	  			mensaje=$("#id_Mensaje").val();
	  			$("#id_Mensaje").val(mensaje+title);
	  			$("#id_Mensaje").focus();
  			};
  		});
  			$("#leido").on("click", function(){
		      $("#myModal").modal("show");
		      $.ajax({
		          async:true,
		              url: '/InBox/',
		              type: 'POST',
		              success: function(response) {
		                if (response.exito) {
		                  $("#leido").html('<img src="http://sa.dynns.com:8000/static/base/img/inbox-5-24.ico"/>0 Notificaciones');
		                  console.log("exito");
		                }
		              },
		        });
		    });
  		isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
		    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
		isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
		isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
		    // At least Safari 3+: "[object HTMLElementConstructor]"
		isChrome = !!window.chrome && !isOpera;              // Chrome 1+
		isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6
		if (isOpera) {
			console.log("isOpera "+isOpera);
			if (window.webkitNotifications.checkPermission()==0) {
  				$("#Notificacion").hide();
  			};
		}else if (isFirefox) {
			if ("Notification" in window && Notification.permission !== "denied") {//si es firefox
			Notification.requestPermission(function (status) {
				if (Notification.permission !== status)
					Notification.permission = status;
					$("#Notificacion").hide();
					console.log("isFirefox "+isFirefox);
				});
			}
		}else if (isSafari) {
			console.log("isSafari "+isSafari);
			if (window.webkitNotifications.checkPermission()==0) {
  				$("#Notificacion").hide();
  			};
		}else if (isChrome) {
			console.log("isChrome "+isChrome);
			if (window.webkitNotifications.checkPermission()==0) {
  				$("#Notificacion").hide();
  			}
			$("#Notificacion").click(function(){
	  			if (window.webkitNotifications.checkPermission() == 0) { // 0 is PERMISSION_ALLOWED
				    // function defined in step 2
				  } else {
				    window.webkitNotifications.requestPermission();
				   $("#Notificacion").hide();
				  }
	  		});
			
		}else if (isIE) {
			console.log("isIE "+isIE);
		};

		var nombre = $("#userlogin").text();
		var nombreID = $("#userlogin").attr('title');
		var token =$("input[type=hidden]").val();
		Username=nombre;
		userID=nombreID;
		urlimagen=$("#pictureUsuario").attr("src");
		console.log(urlimagen);
		$('#setNombre').fadeOut();
		//Guardamos el nombre en localStorage
		if (localStorage)
		{
			localStorage.nombreChatUsuario = Username;
		}
		websocket.emit("enviarNombre",Username,userID,urlimagen);
	
		_accion = $('#formulario').find('input[type=submit]').val();
		if (_accion=="Enviar Mensaje") {
			
			
		};
		//Cerramos sesión
		$('#btnClosSes').on("click",function(){
			localStorage.removeItem("nombreChatUsuario");
			location.reload(true);
		});	
		//Manejamos lo que el servidor nos manda
		websocket.on("mensaje",procesarUsuario);//Esta función se ejecuta cuando el servidor nos avisa que alguien se conectó
		websocket.on("newMessage",procesarMensaje);
		websocket.on("usuarioDesconectado",procesarUsuarios);
		websocket.on("errorName",repetirNombre);
		websocket.on('news', function (data) {
		    console.log(data.hello);
		});
	};

	//Enviamos nuestro nombre
	function sendName()
	{
		nombre = $("#name").val();
		$('#setNombre').fadeOut();
		//Guardamos el nombre en localStorage
		if (localStorage)
		{
			localStorage.nombreChatUsuario = nombre;
		}
		websocket.emit("enviarNombre",nombre);
	};
	//Enviar el mensaje
	function sendMessage(message,img)
	{
		console.log(img);
		tokenSocked=$("#SokedID").text();
		tokenSockedlocal=$("#SokedID").attr('title');
		//console.log(message+"  "+tokenSocked+"  "+tokenSockedlocal+"  "+img);
		//var msg = message;
		/*//Verificamos que no tenga scripts
		if((msg.indexOf("<") != -1))
		{
			alert("Mensaje incorrecto");
		}
		else if((msg.indexOf(">") != -1))
		{
			alert("Mensaje incorrecto");	
		}
		else if((msg.indexOf(";") != -1))
		{
			alert("Mensaje incorrecto");
		}
		else
		{
			//Limpiamos la caja del formulario		
			//$("#id_Mensaje").text("");
			//Enviamos un mensaje
			
			websocket.emit("enviarMensaje",msg);	
		}*/
		websocket.emit('enviarMensaje',message,tokenSocked,tokenSockedlocal,img);
	};
	function procesarUsuario(mensaje)
	{
		//Esta función se ejecuta cuando el servidor nos avisa
		//que alguien se conectó
		$("#ingresaNombre").hide();
		//Limpiamos el div de usuarios
		$('#users').empty(); 
		//Colocamos de nuevo los usuarios
			var User =$("#User").text();
			usuario = $("#userlogin").text();
			UserLoginId=$("#userlogin").attr('title');
			$("#SokedID").attr({'title':mensaje[3][UserLoginId]});//Quien lo envio
			//console.log(mensaje[3][UserLoginId]);
		for (i in mensaje[3])
		{	
			if (User==i) {
				//console.log(mensaje[3][i]);
		  		$("#SokedID").text(mensaje[3][i]);//al usuario que lo vas enviar por socket
			}
			
		}
		

		for (i in mensaje[1])
	  	{	
	  		if (mensaje[1][i]!=usuario) {
	  			console.log(mensaje[4][i]);
	  			$('#users').append(
		  			$('<li>').append(
		  				 $('<figure class="usuarioIMGConectados" >').append(
		  				 	$('<img>').attr({'id':'urlIMg'+mensaje[1][i],'src':mensaje[4][i],'title':mensaje[4][i]})
		  				 )
		  			).append(
		  				$('<a>').attr({'href':'http://sa.dynns.com:8000/Mensaje/'+mensaje[2][i],'style':'display: inline-block;','id':mensaje[1][i],'title':mensaje[2][i]}).html("&nbsp;"+mensaje[1][i])
		  			)
		  		);
		  		arrayNames[i] = mensaje[1][i];
		  	};
	  	}
	  	$('#users').addClass('usuarios');
	};
	//Esta función procesa los msjs
	var mentionSnd = new Audio('http://sa.dynns.com:8000/static/Chat/sound/mention.wav');
	var numero = 0;
	function procesarMensaje(data,tokenSockedlocal,nickname)
	{

		mentionSnd.play();
		numero = numero + 1;
		urlImagenSend=$("#urlIMg"+nickname).attr("src");
		idUsuario=$("#"+nickname).attr("title");
		tokenSocked=$("#SokedID").text();
		
		//console.log("tokenSocked: "+tokenSockedlocal+"tokenSocked local: "+tokenSocked);
		if (pathname!='/Mensaje/'+idUsuario) {
				$("#"+nickname).text(nickname+"("+numero+")");
				$("#titulo").text("("+numero+")"+nickname+" te mando un mensaje");
				$("#"+nickname).css('color','red');

				
					
				if ("Notification" in window && Notification.permission !== "denied") {//si es firefox
                    Notification.requestPermission(function (status) {
                        if (Notification.permission !== status)
                            Notification.permission = status;
                    });
                    var icon = urlImagenSend,
                        bodyMessage = "Te mando un mensaje "+nickname,
                        notification = new Notification("OYES TE MANDARON UN MENSAJE!!", { icon: icon, body: bodyMessage });
 
                    notification.onshow = function () {
                        setTimeout(function () {
                            notification.close();
                        }, 5000);
                    };
 
                    notification.onclose = function () {
                        console.log("notification.onclose fired");
                    };
 
                    notification.onerror = function () {
                        console.log("notification.onerror fired");
                    };
                     
 
                    notification.onclick = function () {
                    	window.open("http://sa.dynns.com:8000/Mensaje/"+idUsuario);
                    	 notification.close();
                    };
                };
		};
		if (tokenSockedlocal==tokenSocked) {
			$('#chatInsite').append($('<p>').append($('<article>').html(data)));			                      
			$('#chat').animate({scrollTop: $("#chatInsite").height()}, 800);
		}else{
			return false;
		}
		
	};
	function procesarUsuarios(data)
	{
		//Esta función se ejecuta cuando el servidor nos
		//avisa que alguien se desconectó
		$('#users').html("");
		for (i in data[0])
	  	{
	  		$('#users').append($('<p>').text(data[0][i]));
	  		arrayNames[i] = data[0][i];
	  	}
	};
	function repetirNombre()
	{
		if (parent.window.location == window.location)
	    {
	        window.open("","_self"); 
	        //window.close();
	    }
	    else 
	        window.open("","_self"); 
	        window.close();	    	
	};
  return{
  	enviarMensaje:sendMessage,
    inicio:started
  }

})(jQuery);
$(document).on('ready', ajaxStarted.inicio );
