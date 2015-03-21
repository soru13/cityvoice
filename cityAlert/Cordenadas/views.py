from django.shortcuts import render_to_response, get_object_or_404
from django.http import HttpResponse
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from Cordenadas.models import *
from Usuarios.models import Perfil
try: import simplejson as json
except ImportError: import json
# Create your views here.
def cityalert(request):
	return render_to_response('cityalert/index.html',{}, context_instance=RequestContext(request))

def reporteAlert(request,tipo_reporte,id_reporte):
    calificaicionSuma=0
    Count=0
    promedio=0
    if tipo_reporte == 'reporte':
    	Reporte = reporte.objects.get(pk=id_reporte)
        user=User.objects.get(username=Reporte.Usuario)
        getperfil=Perfil.objects.get(user=user.id)
    	Categoria = categoria.objects.get(Categoria=Reporte.Categoria)
    	Subcategoria = subcategoria.objects.get(Subcategoria=Reporte.Subcategoria)
    	starts=start.objects.filter(Reporte=Reporte.id)
    	Count = start.objects.filter(Reporte=Reporte.id).count()
    	if Count != 0:
	    	for x in starts:
	    		calificaicionSuma = calificaicionSuma + x.Calificacion
	    	promedio = calificaicionSuma / Count
    	return render_to_response('cityalert/reporte.html', {'Subcategoria':Subcategoria,'promedio':promedio,'Categoria':Categoria,'tipo_reporte':tipo_reporte,'perfilUer':getperfil,'reporte':Reporte,'login':user}, context_instance=RequestContext(request))
    if tipo_reporte =='emergencia':
    	Emergencia = emergenciaReporte.objects.get(pk=id_reporte)
        user=User.objects.get(username=Emergencia.Usuario)
        getperfil=Perfil.objects.get(user=user.id)
    	Categoria = emergenciaCat.objects.get(Emergencia=Emergencia.Categoria)
    	starts=startEmrg.objects.filter(Reporte=Emergencia.id)
    	Count = startEmrg.objects.filter(Reporte=Emergencia.id).count()
    	if Count != 0:
    		for x in starts:
    			calificaicionSuma = calificaicionSuma + x.Calificacion
    		promedio = calificaicionSuma / Count
    	return render_to_response('cityalert/reporte.html', {'promedio':promedio,'Categoria':Categoria,'tipo_reporte':tipo_reporte,'perfilUer':getperfil,'emergencia':Emergencia,'login':user}, context_instance=RequestContext(request))
   

def cityalertAndroid(request):
    return render_to_response('cityalert/android.html',{}, context_instance=RequestContext(request))