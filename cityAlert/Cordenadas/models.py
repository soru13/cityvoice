from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class categoria(models.Model):
	Categoria = models.CharField(max_length=50,unique=True,null=False,blank=False)
	Usuario = models.ForeignKey(User)
	avatar = models.ImageField(upload_to='categoria')
	Fecha = models.DateTimeField(auto_now=True)
	Marker = models.ImageField(upload_to='marketCategoria')
	def __unicode__(self):
		return self.Categoria

class emergenciaCat(models.Model):
	Emergencia= models.CharField(max_length=50,unique=True,null=False,blank=False)
	avatar = models.ImageField(upload_to='emergencia')
	Usuario = models.ForeignKey(User)
	Fecha = models.DateTimeField(auto_now=True)
	Marker = models.ImageField(upload_to='marketemergencia')
	def __unicode__(self):
		return self.Emergencia

class emergenciaReporte(models.Model):
	Alert = models.CharField(max_length=50,null=False,blank=False)
	Lat = models.CharField(max_length=50)
	Long = models.CharField(max_length=50)
	Usuario = models.ForeignKey(User)
	Categoria = models.ForeignKey(emergenciaCat)
	Fecha = models.DateTimeField(auto_now=True)
	Imagen = models.CharField(max_length=200)
	Estatus = models.BooleanField(default=True)
	def __unicode__(self):
		return self.Alert

class subcategoria(models.Model):
	Subcategoria = models.CharField(max_length=50,unique=True,null=False,blank=False)
	Categoria =  models.ForeignKey(categoria)
	Usuario = models.ForeignKey(User)
	avatar = models.ImageField(upload_to='subcategoria')
	Fecha = models.DateTimeField(auto_now=True)
	Marker = models.ImageField(upload_to='marketSubcategoria')
	def __unicode__(self):
		return self.Subcategoria

class reporte(models.Model):
	Alert = models.CharField(max_length=250,null=False,blank=False)
	Lat = models.CharField(max_length=50)
	Long = models.CharField(max_length=50)
	Usuario = models.ForeignKey(User)
	Fecha = models.DateTimeField(auto_now=True)
	Imagen = models.CharField(max_length=200)
	Estatus = models.BooleanField(default=True)
	Categoria =  models.ForeignKey(categoria)
	Subcategoria =  models.ForeignKey(subcategoria)
	def __unicode__(self):
		return self.Alert

class denunciaOrGuardar(models.Model):
	tipo = models.CharField(max_length=50,null=False,blank=False)
	Usuario = models.ForeignKey(User)
	Fecha = models.DateTimeField(auto_now=True)
	Estatus = models.BooleanField(default=True)
	def __unicode__(self):
		return self.tipo

class comment(models.Model):
	Comment = models.CharField(max_length=250,null=False,blank=False)
	Usuario = models.ForeignKey(User)
	Fecha = models.DateTimeField(auto_now=True)
	Estatus = models.BooleanField(default=True)
	Reporte =  models.ForeignKey(reporte)
	Tipo =  models.ForeignKey(denunciaOrGuardar)
	Starts = models.IntegerField(max_length=250,null=False,blank=False)
	def __unicode__(self):
		return self.Comment

class commentEmergen(models.Model):
	Comment = models.CharField(max_length=250,null=False,blank=False)
	Usuario = models.ForeignKey(User)
	Fecha = models.DateTimeField(auto_now=True)
	Estatus = models.BooleanField(default=True)
	Reporte =  models.ForeignKey(emergenciaReporte)
	Tipo =  models.ForeignKey(denunciaOrGuardar)
	Starts = models.IntegerField()
	def __unicode__(self):
		return self.Comment

class start(models.Model):
	Calificacion = models.FloatField()
	Reporte =  models.ForeignKey(reporte)
	Usuario = models.ForeignKey(User)
	Fecha = models.DateTimeField(auto_now=True)

class startEmrg(models.Model):
	Calificacion = models.FloatField()
	Reporte =  models.ForeignKey(emergenciaReporte)
	Usuario = models.ForeignKey(User)
	Fecha = models.DateTimeField(auto_now=True)

class MisPuntos(models.Model):
	nombre= models.CharField(max_length=250,null=False,blank=False)
	Lat = models.CharField(max_length=50)
	Long = models.CharField(max_length=50)
	Direccion= models.CharField(max_length=500,null=False,blank=False)
	Usuario = models.ForeignKey(User)
	Fecha = models.DateTimeField(auto_now=True)
	def __unicode__(self):
		return self.nombre


