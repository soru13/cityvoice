#BY JESUS EDUARDO MURRIETA ROSAS
#Reposiotrio en github del proyecto 
#github     https://github.com/soru13/GestionDeProyectos
from django.http import HttpResponse,HttpResponseRedirect,Http404
from django.views.decorators.csrf import csrf_exempt
from django.template.loader import get_template
from django.template import Context
from django.contrib.auth.models import User
from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.template.context import RequestContext
from django.contrib.auth.models import User
from django.conf import settings
from Notificaciones.models import Notificaciones
from django.contrib.auth.forms import UserCreationForm,  AuthenticationForm
from django.contrib.auth import login as auth_login, authenticate, logout 
from django.contrib.auth.decorators import login_required
import datetime
from django.db import connection, transaction
from API.models import *
from Usuarios.models import *
try: import simplejson as json
except ImportError: import json
fecha = str(datetime.date.today())
from Notificaciones.models import *
from .forms import UploadFileForm
import urllib

@login_required(login_url='/ingresar')
def CFDI(request):
	return render_to_response('CFDI/CFDI.html', context_instance=RequestContext(request,{}))

@login_required(login_url='/ingresar')
def desarrolladores(request):
	login=request.user
	getperfil=Perfil.objects.get(user=login.id)
	mensajes = Notificaciones.objects.filter(Estatus=False,Usuario=login.id).order_by("Fecha")
	contador = Notificaciones.objects.filter(Estatus=False,Usuario=login.id).count()
	return render_to_response('API/developer.html', context_instance=RequestContext(request,{'perfilUer':getperfil,'login':login,'notificacion':mensajes,'numberRegister':contador,}))

@csrf_exempt
def NotaAjax(request):
	cursor = connection.cursor()
	validarTabla=''
	try:
		exito = False
		errores = ''
		if request.POST['observacions'] and request.POST['Activar']:
			validarTabla='update montiendasgrupo set "ObservacionesX"=\''+request.POST['observacions']+'\',username=\''+request.POST['username']+'\', "FechaCapituloX"=\''+fecha+'\',"CapituloX"='+request.POST['Activar']+' where id='+request.POST['tienda']
		elif request.POST['observacions']:
			validarTabla='update montiendasgrupo set "ObservacionesX"=\''+request.POST['observacions']+'\',username=\''+request.POST['username']+'\', "FechaCapituloX"=\''+fecha+'\' where id='+request.POST['tienda']
		elif request.POST['Activar']:
			validarTabla='update montiendasgrupo set username=\''+request.POST['username']+'\',"FechaCapituloX"=\''+fecha+'\',"CapituloX"='+request.POST['Activar']+' where id='+request.POST['tienda']
		errores=validarTabla
		cursor.execute(validarTabla)
		transaction.commit_unless_managed()
		exito = True
	except Exception, e:
		errores = str(e)
		exito = validarTabla
		response = {'exito':exito,'errores':errores}
		return HttpResponse(json.dumps(response), mimetype="application/json")
	else:
		response = {'exito':exito,'errores':errores}
		return HttpResponse(json.dumps(response), mimetype="application/json")
	finally:
		cursor.close()

@csrf_exempt
def handle_uploaded_file(f):
    destination = open('/tmp/imagen.jpg', 'wb+')
    for chunk in f.chunks():
        destination.write(chunk)
    destination.close()

@csrf_exempt
def upload_file(request):
	try:
		if request.FILES['file']:
				handle_uploaded_file(request.FILES['file'])
	except Exception, e:
		response = {'exito':'False','errores':str(e)}
		return HttpResponse(json.dumps(response), mimetype="application/json")
	else:
		response = {'exito':'True'}
		return HttpResponse(json.dumps(response), mimetype="application/json")
		