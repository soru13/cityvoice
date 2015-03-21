#BY JESUS EDUARDO MURRIETA ROSAS
#Reposiotrio en github del proyecto 
#github     https://github.com/soru13/GestionDeProyectos
from django.forms import ModelForm,widgets, Textarea
from django import forms
from Notificaciones.models import *
class NotificacionesForm(forms.ModelForm):
	class Meta:
		model = Notificaciones
		fields = ('Descripcion','Tipo','Usuario','Envio','Estatus')
		widgets = {
		'Descripcion': Textarea(attrs={"placeholder" : 'Por que?','style':'width:100%;','required':True}),
		'Tipo': widgets.HiddenInput(attrs={"placeholder" : 'Tipo','required':True,}),
		'Usuario': widgets.HiddenInput(attrs={'title':'Usuario','required':True,'disabled':True}),
		'Envio': widgets.HiddenInput(attrs={'title':'Actividad','required':True,'disabled':True}),
		'Estatus': widgets.HiddenInput(attrs={'required':True,'disabled':True}),
		}