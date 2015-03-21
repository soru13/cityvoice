/*#BY JESUS EDUARDO MURRIETA ROSAS
#Reposiotrio en github del proyecto 
#github     https://github.com/soru13/GestionDeProyectos*/
var ajax=(function($){
  function started(){
    // agrega clase prettyprint a todos los bloques <pre> (tambien podemos agregar <code>)
    var prettify = false;
    $("pre").each(function() {
        $(this).addClass('prettyprint');
        prettify = true;
    });

    // si se encontro bloques de código se llama la función prettyPrint
    if ( prettify ) {
        $.getScript("http://192.168.1.10/static/base/vendor/bootstrap-wysihtml5_files/prettify.js", function() { prettyPrint() });
    }

  }
  return{
    inicio: started
  }

})(jQuery);
  $(document).on('ready', ajax.inicio );