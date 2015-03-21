#BY JESUS EDUARDO MURRIETA ROSAS
#Reposiotrio en github del proyecto 
#github     https://github.com/soru13/GestionDeProyectos
from ControlActividades.models import Proyectos, Actividad, Avances
from django.contrib import admin

admin.site.register(Proyectos)
admin.site.register(Actividad)
admin.site.register(Avances)
