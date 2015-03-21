var ajaxs=(function($){
	var nombre,pswd,ip;
	var arrayNames = {};
	//var websocketLive = io.connect('http://192.168.1.16:3636/');
  	function started(){
  		$("time.timeago").timeago();
  		//$("#contChat").hide();
		sendName();
		//Formulario para enviar un nuevo mensaje
		$("#formMsg").on("submit",function(e){
			e.preventDefault();
			sendMessage();
		});
		//Cerramos sesión
		$('#btnClosSes').on("click",function(){
			localStorage.removeItem("nombreChatUsuarioLive");
			location.reload(true);
		});	
		//Manejamos lo que el servidor nos manda
		websocketLive.on("newMessageLive",procesarMensaje);
		//recibimos los mensajes gusdados en mongodb
		websocketLive.on("DateMensajeLive",DateMensajeLive);

	};

	function sendName()
	{
		nombre = $("#userlogin").text();
		$('#setNombre').fadeOut();
		//Guardamos el nombre en localStorage
		if (localStorage)
		{
			localStorage.nombreChatUsuarioLive = nombre;
		};
		websocketLive.emit("enviarNombreLive",nombre);
	};
	//Enviar el mensaje
	function sendMessage()
	{
		var message = $("#msg").val();
		var text = message;
		var urlimg=$(".picture figure img").attr("src");
		var img='<figure class="usuarioIMGConectados" ><img src="'+urlimg+'" /><figcaption></figcaption></figure><span id="usuaMensaje">';
		//Verificamos que no tenga scripts
		if((message.indexOf("<") != -1))
		{
			alert("Mensaje incorrecto");
		}
		else if((message.indexOf(">") != -1))
		{
			alert("Mensaje incorrecto");	
		}
		else if((message.indexOf(";") != -1))
		{
			alert("Mensaje incorrecto");
		}
		else
		{
			//Limpiamos la caja del formulario		
			$("#msg").val("");
			//Enviamos un mensaje
			text = text.replace(/(:\)|:8|:D|:hat|:rare|:silent|:lol|:shame|:xD|:imp|:secret|:a|:XD:|:sor:|:\(|:O|:P|:cool:|:'\(|:\|)/g, '<span title="$1" class="emoticon"></span>');
			message = text;
			websocketLive.emit("enviarMensajeLive",message,img);	
		}
		
	};
	//Esta función procesa los msjs
	//var mentionSnd = new Audio('http://192.168.1.16/static/Chat/sound/mention.wav');
	var numero = 0;

	function procesarMensaje(data)
	{
		var d=new Date();
		var fecha= $.timeago(d.toISOString());
		$('#chatInsite').prepend($('<p class="messages">').append($('<article>').html( data[0]+ data[1]+"<small class='content'>"+data[2]+"</small>"+"<time class='timeago' datetime="+fecha+">"+fecha+"</time>")  ));
		mentionSnd.play();
		//$('#chat').animate({scrollTop: $("#chatInsite").height()}, 800);
	};
	function DateMensajeLive(data){

		$.each(data.Mensajes, function( index, value ) {
		var fecha= $.timeago(value.fecha); 
		  $('#chatInsite').prepend($('<p class="messages" title="'+fecha+'">').append($('<article>').html( value.mensaje[0]+ value.mensaje[1]+"<small class='content'>"+value.mensaje[2]+"</small>"+"<time class='timeago' datetime="+value.fecha+">"+fecha+"</time>")  ));
		});
	};
  return{
    inicio:started
  }

})(jQuery);
$(document).on('ready', ajaxs.inicio );


