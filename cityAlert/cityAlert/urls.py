from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()
#api django 
from tastypie.api import Api
from API.api.resources import *

v1_api = Api()
v1_api.register(UserResource())
v1_api.register(UserPerfilResource())
v1_api.register(reporteResource())
v1_api.register(categoriaResource())
v1_api.register(subcategoriaResource())
v1_api.register(emergenciaCatResource())
v1_api.register(emergenciaReporteResource())
v1_api.register(commentResource())
v1_api.register(commentEmergenResource())
v1_api.register(denunciaOrGuardarResource())
v1_api.register(PollResource())
v1_api.register(ChoiceResource())
v1_api.register(CreateUserResource())
v1_api.register(startReporteResource())
v1_api.register(startEmergenciaResource())
v1_api.register(StatusTwitterResource())
v1_api.register(MisPuntosResource())
v1_api.register(sendEmailResource())








urlpatterns = patterns('',
	(r'^api/', include(v1_api.urls)),
    url(r'^oauth2/', include('provider.oauth2.urls', namespace = 'oauth2')),

    url(r'^Developers$', 'API.views.desarrolladores', name='desarrolladores'),
    url(r'^NotaAjax/$', 'API.views.NotaAjax', name='NotaAjax'),
    url(r'^cityalert/$', 'Cordenadas.views.cityalert', name='city laert'),
    url(r'^cityalert/(?P<tipo_reporte>[-\w]+)/(?P<id_reporte>\d+)$', 'Cordenadas.views.reporteAlert', name='reporte'),
    url(r'^cityalert/android$', 'Cordenadas.views.cityalertAndroid', name='cityalertAndroid'),
    url(r'^upload_file$', 'API.views.upload_file', name='upload_file'),







    # Examples:
    # url(r'^$', 'cityAlert.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    #estas url son de la gestion de usuarios"""
    url(r'^Usuarios$', 'Usuarios.views.usuarios', name='usuarios'),
    url(r'^NuevoUsuario$', 'Usuarios.views.NuevoUsuario', name='NuevoUsuario'),
    url(r'^NuevoUsuarioAjax/$', 'Usuarios.views.AgregarUsuarioAjax', name='NuevoUsuario'),
    url(r'^EditarPerfilLogin/$', 'Usuarios.views.EditarPerfilLogin', name='EditarPerfilLogin'),
    url(r'^EditarUsuario/(?P<id_usuario>\d+)$', 'Usuarios.views.EditarPerfil', name='editar'),
    url(r'^EditarUsuarioAjax/$', 'Usuarios.views.EditarUsuarioAjax', name='EditarUsuarioAjax'),
    url(r'^borrarUsuario/(?P<id_usuario>\d+)$', 'Usuarios.views.eliminar', name='eliminar'),
    url(r'^resetPassword$', 'Usuarios.views.resetPassword', name='resetPassword'),
    url(r'^ingresar$','Usuarios.views.ingresar'),
    url(r'^cerrar$', 'Usuarios.views.cerrar'),
    #Esto es de otra Cosa propiedad de jesus no tiene nada que ver con el proyecto RobotPython"""
    url(r'^$', 'Home.views.Principal', name='GestionarStuff'),
    url(r'^addActividades/(?P<id_Actividad>\d+)$', 'Home.views.addActividades'),
    url(r'^search/$', 'Home.views.search'),
    url(r'^InBox/$', 'Home.views.InBox', name='InBox'),
    url(r'^Tutorial/$', 'Home.views.Tutorial', name='Tutorial'),
    url(r'^Diapositiva/$', 'Home.views.Diapositiva', name='Diapositiva'),
    #estas url son de la gestion del Chat"""
    url(r'^leidos/$', 'Chat.views.leidos', name='leidos'),
    url(r'^Correo/$', 'Chat.views.Correo', name='Correo'),
    url(r'^NuevaNotificacion/(?P<id_Actividad>\d+)$', 'Chat.views.NuevaNotificacion', name='NuevaNotificacion'),
    url(r'^ResponderNotificacion/(?P<id_Actividad>\d+)/(?P<id_Usuario>\d+)$', 'Chat.views.ResponderNotificacion', name='ResponderNotificacion'),
    url(r'^Chat$', 'Chat.views.Chat', name='Chat'),
    url(r'^Mensaje/(?P<id_Usuario>\d+)$', 'Chat.views.Mensaje', name='Mensaje'),
    url(r'^MensajeAjax/$', 'Chat.views.MensajeAjax', name='MensajeAjax'),
    url(r'^Reporteria$', 'Reporteria.views.Reporteria', name='Reporteria'),

    url(r'^estadisticas$', 'statistics.views.statistics'),
    url(r'^filter/$', 'ControlActividades.views.filter'),
    url(r'^ControlActividades$', 'ControlActividades.views.ControlActividades', name='ControlActividades'),
    url(r'^AgregarProyecto$', 'ControlActividades.views.AgregarProyecto', name='AgregarProyecto'),
    url(r'^AgregarProyectoAjax/$', 'ControlActividades.views.AgregarProyectoAjax', name='AgregarProyectoAjax'),
    url(r'^GetDataProyectoJson/(?P<id_proyecto>\d+)$', 'ControlActividades.views.GetDataProyectoJson', name='Editar'),
    url(r'^GetDataProyectoJsonLast$', 'ControlActividades.views.GetDataProyectoJsonLast', name='GetDataProyectoJsonLast'),
    url(r'^EditarProyectoAjax/(?P<id_proyecto>\d+)$', 'ControlActividades.views.EditarProyectoAjax', name='EditarAjax'),
    url(r'^eliminarAjax/(?P<id_proyecto>\d+)$', 'ControlActividades.views.eliminarAjax', name='eliminarAjax'),
    url(r'^Actividades/(?P<id_proyecto>\d+)$', 'ControlActividades.views.Actividades', name='Avtividades'),
    url(r'^NuevaActividad/(?P<id_proyecto>\d+)$', 'ControlActividades.views.NuevaActividad', name='NuevaActividad'),
    url(r'^NuevaActividadAjax/$', 'ControlActividades.views.NuevaActividadAjax', name='AddAvtividadAjax'),
    url(r'^GetDataActividadJson/(?P<id_Actividad>\d+)$', 'ControlActividades.views.GetDataActividadJson', name='GetDataActividadJson'),
    url(r'^EditarAct/(?P<id_Actividad>\d+)/(?P<id_proyecto>\d+)$', 'ControlActividades.views.EditarAct', name='EditarAct'),
    url(r'^EditarActAjax/(?P<id_Actividad>\d+)$', 'ControlActividades.views.EditarActAjax', name='EditarActAjax'),
    url(r'^finalizarActAjax/(?P<id_Actividad>\d+)$', 'ControlActividades.views.finalizarActAjax', name='finalizarActAjax'),
    url(r'^EliminarActAjax/(?P<id_Actividad>\d+)$', 'ControlActividades.views.EliminarActAjax', name='EliminarActAjax'),
    url(r'^Avances/(?P<id_Actividad>\d+)/(?P<id_proyecto>\d+)$', 'ControlActividades.views.Historial', name='Historial'),
    url(r'^GetDataAvanceJsonLast/$', 'ControlActividades.views.GetDataAvanceJsonLast', name='GetDataAvanceJsonLast'),
    url(r'^AgregarAvanceAjax/$', 'ControlActividades.views.AgregarAvanceAjax', name='AddAAgregarAvance'),
    url(r'^live$', 'streaming.views.live', name='live'),
    url(r'^admin/', include(admin.site.urls)),
)
