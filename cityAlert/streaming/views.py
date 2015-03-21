# Create your views here.
from django.http import HttpResponse,HttpResponseRedirect
from django.template.loader import get_template
from django.template import Context
from django.contrib.auth.models import User
from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.template.context import RequestContext
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm,  AuthenticationForm
from django.contrib.auth import login as auth_login, authenticate, logout 
from django.contrib.auth.decorators import login_required
from Usuarios.models import *
from Notificaciones.models import *
import datetime

@login_required(login_url='/ingresar')
def live(request):
	usuario= request.user
	getperfil=Perfil.objects.get(user=usuario.id)
	mensajes = Notificaciones.objects.filter(Estatus=False,Usuario=usuario.id).order_by("-Fecha")
	contador = Notificaciones.objects.filter(Estatus=False,Usuario=usuario.id).count()
	return render_to_response('streaming/streaming.html', context_instance=RequestContext(request,{'perfilUer':getperfil,'notificacion':mensajes,'numberRegister':contador,'login': usuario}))