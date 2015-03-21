#BY JESUS EDUARDO MURRIETA ROSAS
#Reposiotrio en github del proyecto 
#github     https://github.com/soru13/GestionDeProyectos
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Notificaciones(models.Model):
	Descripcion = models.CharField(max_length=200)
	Tipo = models.CharField(max_length=200)
	Fecha = models.DateTimeField(auto_now=True)
	Estatus = models.BooleanField(default=False)
	Usuario = models.ForeignKey(User)
	Envio = models.CharField(max_length=100)
	def __unicode__(self):
		return self.Descripcion