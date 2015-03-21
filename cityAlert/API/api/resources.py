#BY JESUS EDUARDO MURRIETA ROSAS
#Reposiotrio en github del proyecto 
#github     https://github.com/soru13/GestionDeProyectos
import datetime
from django.contrib.auth.models import User
from tastypie.authentication import BasicAuthentication, ApiKeyAuthentication, MultiAuthentication
from tastypie.authorization import DjangoAuthorization
from tastypie.authentication import Authentication
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from tastypie.serializers import Serializer
from tastypie import fields
from Usuarios.models import *
from Cordenadas.models import *
from .exceptions import CustomBadRequest,ExitoRequest,failRequest,faillogin
from django.contrib.auth import login as auth_login, authenticate
from tastypie.http import HttpBadRequest,HttpCreated
try: import simplejson as json
except ImportError: import json
try:
    import lxml
    from lxml.etree import parse as parse_xml
    from lxml.etree import Element, tostring
except ImportError:
    lxml = None
try:
    import yaml
    from django.core.serializers import pyyaml
except ImportError:
    yaml = None

from tastypie.resources import ModelResource
from API.models import Poll, Choice
from tastypie import fields
from API.authentication import OAuth20Authentication
from twython import Twython, TwythonError
import urllib
import facebook
from pyshorteners.shorteners  import Shortener
APP_KEY = 'aeWywjaXxnsdQLzd2LRAxs4xm'
APP_SECRET = 'mv17abxqlYwsyCLyBVn01BOi3CVEAub1ip2zmPlrDS2YYVX3aH'
"""
twitter = Twython(APP_KEY, APP_SECRET)
auth = twitter.get_authentication_tokens()

OAUTH_TOKEN = auth['oauth_token']
OAUTH_TOKEN_SECRET = auth['oauth_token_secret']

twitter = Twython(APP_KEY, APP_SECRET, OAUTH_TOKEN, OAUTH_TOKEN_SECRET)

### This is the part you're missing ###
oauth_verifier_url = auth['auth_url']
oauth_verifier = requests.get(oauth_verifier_url)

# Getting the FINAL authentication tokens
final_step = twitter.get_authorized_tokens(oauth_verifier)

OAUTH_TOKEN = final_step['oauth_token']
OAUTH_TOKEN_SECRET = auth['oauth_token_secret']


### Up until this line ###

try:
    twitter.update_status(status='See how easy this was?')
except TwythonError as e:
    print e"""
class StatusTwitterResource(ModelResource):
    class Meta:
        allowed_methods = ['post']
        always_return_data = True
        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()
        resource_name = 'StatusTwitterFacebook'

    def hydrate(self, bundle):
        REQUIRED_USER_FIELDS = ("oauth_token","oauth_token_secret","lat","longitude","pathImage","message","link","fbtoken")
        for field in REQUIRED_USER_FIELDS:
            if field not in bundle.data:
                raise CustomBadRequest(code="missing_key",message="Must provide {missing_key} when creating a user.".format(missing_key=field))
        return bundle
        
    def obj_create(self, bundle,  **kwargs):
        OAUTH_TOKEN = bundle.data['oauth_token']
        OAUTH_TOKEN_SECRET = bundle.data['oauth_token_secret']
        linkshortener=bundle.data['link']
        url = linkshortener
        shortener = Shortener('GoogleShortener')
        linkshortener=format(shortener.short(url))
        lat = bundle.data['lat']
        longitude = bundle.data['longitude']
        mensaje=bundle.data['message']+" "+linkshortener
        fbtoken=bundle.data['fbtoken']
        if not bundle.data['pathImage']:
            if bundle.data['CompartirTwitter']=='true':
                twitter = Twython(APP_KEY, APP_SECRET, OAUTH_TOKEN, OAUTH_TOKEN_SECRET)
                twitter.update_status(status=mensaje)
            elif bundle.data['CompartirFacebook']=='true':
                graph = facebook.GraphAPI(fbtoken)
                graph.put_object("me", "feed", message=mensaje.encode('utf-8'))
        else:
            #pathImage=bundle.data['pathImage']
            #urllib.urlretrieve(pathImage, '/tmp/imagen.jpg')
            photo = open('/tmp/imagen.jpg', 'rb')
            if bundle.data['CompartirTwitter']=='true':
                twitter = Twython(APP_KEY, APP_SECRET, OAUTH_TOKEN, OAUTH_TOKEN_SECRET)
                twitter.update_status_with_media(status=mensaje,display_coordinates='true',lat=lat,long=longitude,media=photo)
            if bundle.data['CompartirFacebook']=='true':
                graph = facebook.GraphAPI(fbtoken)
                graph.put_photo(open('/tmp/imagen.jpg', 'rb'),mensaje.encode('utf-8'), None)
        response = {'exito':True,'errores': False}
        raise ExitoRequest(code=response,message="posteado con exito")

class ChoiceResource(ModelResource):
    class Meta:
        queryset = Choice.objects.all()
        resource_name = 'choice'
        authorization = DjangoAuthorization()
        authentication = OAuth20Authentication()
 
class PollResource(ModelResource):
    choices = fields.ToManyField(ChoiceResource, 'choice_set', full=True)
    class Meta:
        queryset = Poll.objects.all()
        resource_name = 'poll'
        authorization = DjangoAuthorization()
        authentication = OAuth20Authentication()

class CreateUserResource(ModelResource):
    class Meta:
        allowed_methods = ['post']
        always_return_data = True
        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()
        resource_name = 'create_user'
 
    def hydrate(self, bundle): 
        REQUIRED_USER_FIELDS = ("email","username","raw_password","accessTokenTwitter","accessTokenTwittert_secret","accessTokenFacebook")
        for field in REQUIRED_USER_FIELDS:
            if field not in bundle.data:
                raise CustomBadRequest(code="missing_key",message="Must provide {missing_key} when creating a user.".format(missing_key=field))
        return bundle

    def obj_create(self, bundle,  **kwargs):

        email = bundle.data["email"]
        username = bundle.data["username"]
        first_name = bundle.data["first_name"]
        last_name = bundle.data["last_name"]
        raw_password = bundle.data["raw_password"]
        password = bundle.data["password"]
        TokenTwitter = bundle.data["accessTokenTwitter"]
        TokenTwittert_secret = bundle.data["accessTokenTwittert_secret"]
        TokenFacebook = bundle.data["accessTokenFacebook"]
        CreateUser=bundle.data["createUser"]
        EstatusTwitter=bundle.data["EstatusTwitter"]
        EstatusFacebook=bundle.data["EstatusFacebook"]
        if User.objects.filter(email=email) or User.objects.filter(username=username):
            if User.objects.filter(username=username):
                perfil=User.objects.get(username=username)
                perfil=Perfil.objects.get(user=perfil)
                perfil.accessTokenTwitter=TokenTwitter
                perfil.accessTokenTwittert_secret=TokenTwittert_secret
                perfil.accessTokenFacebook=TokenFacebook
                if EstatusTwitter=='true':
                    perfil.EstatusTwitter=True
                else:
                    perfil.EstatusTwitter=False
                if EstatusFacebook=='true':
                    perfil.EstatusFacebook=True
                else:
                    perfil.EstatusFacebook=False
                perfil.save()
                userPerfil = User.objects.get(username=username)
                if not userPerfil.email:
                    if not  CreateUser:
                        userPerfil.email=email
                        userPerfil.save()
                    userPerfil = User.objects.get(username=username)
                    _response = {'exito':True,'errores': False,'id':userPerfil.id,'username':userPerfil.username,'email':userPerfil.email,'password':password,'accessTokenTwitter':TokenTwitter,'accessTokenTwittert_secret':TokenTwittert_secret,'accessTokenFacebook':TokenFacebook}
                    raise CustomBadRequest(code=_response,message="el usuario ya esta en uso.")
                else:
                    _response = {'exito':True,'errores': False,'id':userPerfil.id,'username':userPerfil.username,'email':userPerfil.email,'password':password,'accessTokenTwitter':TokenTwitter,'accessTokenTwittert_secret':TokenTwittert_secret,'accessTokenFacebook':TokenFacebook}
                    raise CustomBadRequest(code=_response,message="el usuario ya esta en uso.")
            if User.objects.filter(email=email):
                perfil=User.objects.get(email=email)
                perfil=Perfil.objects.get(user=perfil)
                if not TokenTwitter == 'none' or TokenTwittert_secret == 'none'or TokenFacebook == 'none':
                    perfil.accessTokenTwitter=TokenTwitter
                    perfil.accessTokenTwittert_secret=TokenTwittert_secret
                    perfil.accessTokenFacebook=TokenFacebook
                perfil.save()
                userPerfil = User.objects.get(email=email)
                if not  CreateUser:
                    userPerfil.email=email
                    userPerfil.save()
                    userPerfil = User.objects.get(username=username) 
                _response = {'exito':True,'errores': False,'id':userPerfil.id,'username':userPerfil.username,'email':userPerfil.email,'password':password,'accessTokenTwitter':TokenTwitter,'accessTokenTwittert_secret':TokenTwittert_secret,'accessTokenFacebook':TokenFacebook}
                raise CustomBadRequest(code=_response,message="el email ya esta en uso.")
        else:
            Usercreate=User()
            Usercreate.username = username
            Usercreate.email = email
            if first_name:
                Usercreate.first_name = first_name
            else:
                Usercreate.first_name = username
            if last_name:
                Usercreate.last_name = last_name
            else:
                Usercreate.last_name = username
            Usercreate.raw_password = raw_password
            Usercreate.password = password
            if password == raw_password:
                Usercreate.set_password(raw_password)
                Usercreate.save()
                userPerfil = User.objects.get(username=username)
                p=Perfil(user=userPerfil,avatar='AvatarUser/user.png',direccion="hola que hace",accessTokenTwitter=TokenTwitter,accessTokenTwittert_secret=TokenTwittert_secret,accessTokenFacebook=TokenFacebook)
                p.save();
                _response = {'exito':True,'errores': False,'id':userPerfil.id,'username':userPerfil.username,'email':userPerfil.email,'password':password,'accessTokenTwitter':TokenTwitter,'accessTokenTwittert_secret':TokenTwittert_secret,'accessTokenFacebook':TokenFacebook}
                raise ExitoRequest(code=_response)
            else:
                raise failRequest(code="missing_key",message="Must provide {missing_key} when creating a user.".format(missing_key='false'))



class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        allowed_methods = ['get','post']
        always_return_data = True
        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()
        resource_name = 'user'
        excludes = ['password','is_active', 'is_staff', 'is_superuser']#lo que no quiero mostrar
        serializer = Serializer(formats=['json', 'jsonp', 'xml', 'yaml', 'html', 'plist'])
        filtering = {
            'username': ['exact','ALL_WITH_RELATIONS'],
            'email':['exact','ALL_WITH_RELATIONS','startswith'],
            'id':['exact','ALL_WITH_RELATIONS','ALL'],
        }
    def hydrate(self, bundle):
        REQUIRED_USER_FIELDS = ("username","password")
        for field in REQUIRED_USER_FIELDS:
            if field not in bundle.data:
                raise CustomBadRequest(code="missing_key",message="Must provide {missing_key} when creating a user.".format(missing_key=field))
        return bundle
        
    def obj_create(self, bundle,  **kwargs):
        usuario = bundle.data['username']
        clave = bundle.data['password']
        acceso = authenticate(username=usuario, password=clave)
        user=User.objects.get(username=usuario)
        perfil=Perfil.objects.get(user=user)
        response = {'id':user.id,'username':user.username,'email':user.email,'accessTokenTwitter':perfil.accessTokenTwitter,'accessTokenTwittert_secret':perfil.accessTokenTwittert_secret,'accessTokenFacebook':perfil.accessTokenFacebook}
        if acceso is not None:
            if acceso.is_active:
                raise ExitoRequest(code=response,message="logeado con exito")
            else:
                raise faillogin(message="no es un usuario activo")
        else:
                raise faillogin(message="password o usuario es incorrecto")

class UserPerfilResource(ModelResource):
    user = fields.ForeignKey(UserResource, 'user',full=True)
    class Meta:
        queryset = Perfil.objects.all()
        resource_name = 'Perfil'
        serializer = Serializer(formats=['json', 'jsonp', 'xml', 'yaml', 'html', 'plist'])
        allowed_methods = ['get']#Solo peticiones GET
        filtering = {
            'id': ALL,
            'user': ALL_WITH_RELATIONS,
        }

class categoriaResource(ModelResource):
    class Meta:
        queryset = categoria.objects.all().order_by('id')
        resource_name = 'categoria'
        serializer = Serializer(formats=['json', 'jsonp', 'xml', 'yaml', 'html', 'plist'])
        allowed_methods = ['get','post']#Solo peticiones GET y post
        filtering = {
            'Usuario':ALL_WITH_RELATIONS,
            'Fecha': ['exact', 'lt', 'lte', 'gte', 'gt'],
            'Categoria':ALL_WITH_RELATIONS,
        }
        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()

class subcategoriaResource(ModelResource):
    Categoria = fields.ForeignKey(categoriaResource, 'Categoria')
    class Meta:
        queryset = subcategoria.objects.all()
        resource_name = 'subcategoria'
        serializer = Serializer(formats=['json', 'jsonp', 'xml', 'yaml', 'html', 'plist'])
        allowed_methods = ['get','post']#Solo peticiones GET y post
        filtering = {
            'Subcategoria': ALL_WITH_RELATIONS,
            'Categoria': ALL_WITH_RELATIONS,
            'Usuario': ALL_WITH_RELATIONS,
            'Fecha': ['exact', 'lt', 'lte', 'gte', 'gt'],
        }
        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()

class reporteResource(ModelResource):
    Usuario = fields.ForeignKey(UserResource, 'Usuario',full=True)
    Categoria = fields.ForeignKey(categoriaResource, 'Categoria',full=True)
    Subcategoria = fields.ForeignKey(subcategoriaResource, 'Subcategoria',full=True)
    Estatus = fields.BooleanField(default=True)
    class Meta:
        queryset = reporte.objects.all().order_by('-id')
        always_return_data = True
        resource_name = 'Cordenadas'
        serializer = Serializer(formats=['json', 'jsonp', 'xml', 'yaml', 'html', 'plist'])
        allowed_methods = ['get','post']#Solo peticiones GET
        filtering = {
            'Usuario': ALL_WITH_RELATIONS,
            'Fecha': ['exact', 'lt', 'lte', 'gte', 'gt'],
            'Categoria':ALL_WITH_RELATIONS,
            'Alert':ALL_WITH_RELATIONS,
            'id':['exact', 'lt', 'lte', 'gte', 'gt','ALL_WITH_RELATIONS'],
        }
        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()

class emergenciaCatResource(ModelResource):
    Usuario = fields.ForeignKey(UserResource, 'Usuario')
    class Meta:
        queryset = emergenciaCat.objects.all().order_by('-id')
        resource_name = 'emergenciaCat'
        serializer = Serializer(formats=['json', 'jsonp', 'xml', 'yaml', 'html', 'plist'])
        allowed_methods = ['get','post']#Solo peticiones GET
        filtering = {
            'Usuario': ALL_WITH_RELATIONS,
            'Fecha': ['exact', 'lt', 'lte', 'gte', 'gt'],
        }
        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()

class emergenciaReporteResource(ModelResource):
    Usuario = fields.ForeignKey(UserResource, 'Usuario',full=True)
    Categoria = fields.ForeignKey(emergenciaCatResource, 'Categoria',full=True)
    Estatus = fields.BooleanField(default=True)
    class Meta:
        queryset = emergenciaReporte.objects.all().order_by('-id')
        always_return_data = True
        resource_name = 'emergenciaReporte'
        serializer = Serializer(formats=['json', 'jsonp', 'xml', 'yaml', 'html', 'plist'])
        allowed_methods = ['get','post']#Solo peticiones GET
        filtering = {
            'Usuario': ALL_WITH_RELATIONS,
            'Fecha': ['exact', 'lt', 'lte', 'gte', 'gt'],
            'id':['exact', 'lt', 'lte', 'gte', 'gt','ALL_WITH_RELATIONS'],
        }
        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()

class denunciaOrGuardarResource(ModelResource):
    Usuario = fields.ForeignKey(UserResource, 'Usuario',full=True)
    Estatus = fields.BooleanField(default=True)
    class Meta:
        queryset = denunciaOrGuardar.objects.all().order_by('id')
        resource_name = 'denunciaOrGuardar'
        serializer = Serializer(formats=['json', 'jsonp', 'xml', 'yaml', 'html', 'plist'])
        allowed_methods = ['get','post']#Solo peticiones GET
        filtering = {
            'Usuario': ALL_WITH_RELATIONS,
            'Fecha': ['exact', 'lt', 'lte', 'gte', 'gt'],
        }
        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()

class commentResource(ModelResource):
    Usuario = fields.ForeignKey(UserResource, 'Usuario',full=True)
    Reporte = fields.ForeignKey(reporteResource, 'Reporte',full=True)
    Estatus = fields.BooleanField(default=True)
    Tipo = fields.ForeignKey(denunciaOrGuardarResource, 'Tipo',full=True)
    class Meta:
        queryset = comment.objects.all().order_by('id')
        always_return_data = True
        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()
        serializer = Serializer(formats=['json', 'jsonp', 'xml', 'yaml', 'html', 'plist'])
        allowed_methods = ['get','post','put']#Solo peticiones GET
        resource_name = 'comment'
        filtering = {
            'Usuario': ALL_WITH_RELATIONS,
            'Reporte':ALL_WITH_RELATIONS,
            'Fecha': ['exact', 'lt', 'lte', 'gte', 'gt'],
            'id':['exact', 'lt', 'lte', 'gte', 'gt','ALL_WITH_RELATIONS'],
        }
    def hydrate(self, bundle):
        yaComentado=start.objects.filter(Usuario=bundle.data['_userID'],Reporte=bundle.data['_idReporte']).count()
        if yaComentado>0:
            yaComentado=start.objects.filter(Usuario=bundle.data['_userID'],Reporte=bundle.data['_idReporte'])
            for field in yaComentado:
                startt=start.objects.get(pk=field.id)
                startt.Calificacion=bundle.data['Starts']
                startt.Reporte=reporte.objects.get(pk=bundle.data['_idReporte'])
                startt.Usuario=User.objects.get(pk=bundle.data['_userID'])
                startt.save()
                REQUIRED_USER_FIELDS = ("Starts","_userID","_idReporte")
                for field in REQUIRED_USER_FIELDS:
                    if field not in bundle.data:
                        raise CustomBadRequest(code="missing_key",message="Must provide {missing_key} when creating a user.".format(missing_key=field))
                return bundle
        else:
            startt=start()
            startt.Calificacion=bundle.data['Starts']
            startt.Reporte=reporte.objects.get(pk=bundle.data['_idReporte'])
            startt.Usuario=User.objects.get(pk=bundle.data['_userID'])
            startt.save()
            REQUIRED_USER_FIELDS = ("Starts","_userID","_idReporte")
            for field in REQUIRED_USER_FIELDS:
                if field not in bundle.data:
                    raise CustomBadRequest(code="missing_key",message="Must provide {missing_key} when creating a user.".format(missing_key=field))
            return bundle

        

class commentEmergenResource(ModelResource):
    Usuario = fields.ForeignKey(UserResource, 'Usuario',full=True)
    Reporte = fields.ForeignKey(emergenciaReporteResource, 'Reporte',full=True)
    Estatus = fields.BooleanField(default=True)
    Tipo = fields.ForeignKey(denunciaOrGuardarResource, 'Tipo',full=True)
    class Meta:
        queryset = commentEmergen.objects.all().order_by('id')
        always_return_data = True
        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()
        serializer = Serializer(formats=['json', 'jsonp', 'xml', 'yaml', 'html', 'plist'])
        allowed_methods = ['get','post','put']#Solo peticiones GET
        resource_name = 'commentEmerg'
        filtering = {
            'Usuario': ALL_WITH_RELATIONS,
            'Reporte':ALL_WITH_RELATIONS,
            'Fecha': ['exact', 'lt', 'lte', 'gte', 'gt'],
            'id':['exact', 'lt', 'lte', 'gte', 'gt','ALL_WITH_RELATIONS'],
        }
    def hydrate(self, bundle):
        yaComentado=startEmrg.objects.filter(Usuario=bundle.data['_userID'],Reporte=bundle.data['_idReporte']).count()
        if yaComentado>0:
            yaComentado=startEmrg.objects.filter(Usuario=bundle.data['_userID'],Reporte=bundle.data['_idReporte'])
            for field in yaComentado:
                startEmergencia=startEmrg.objects.get(pk=field.id)
                startEmergencia.Calificacion=bundle.data['Starts']
                startEmergencia.Reporte=emergenciaReporte.objects.get(pk=bundle.data['_idReporte'])
                startEmergencia.Usuario=User.objects.get(pk=bundle.data['_userID'])
                startEmergencia.save()
                REQUIRED_USER_FIELDS = ("Starts","_userID","_idReporte")
                for field in REQUIRED_USER_FIELDS:
                    if field not in bundle.data:
                        raise CustomBadRequest(code="missing_key",message="Must provide {missing_key} when creating a user.".format(missing_key=field))
                return bundle
        else:
            startEmergencia=startEmrg()
            startEmergencia.Calificacion=bundle.data['Starts']
            startEmergencia.Reporte=emergenciaReporte.objects.get(pk=bundle.data['_idReporte'])
            startEmergencia.Usuario=User.objects.get(pk=bundle.data['_userID'])
            startEmergencia.save()
            REQUIRED_USER_FIELDS = ("Starts","_userID","_idReporte")
            for field in REQUIRED_USER_FIELDS:
                if field not in bundle.data:
                    raise CustomBadRequest(code="missing_key",message="Must provide {missing_key} when creating a user.".format(missing_key=field))
            return bundle

class startReporteResource(ModelResource):
    Usuario = fields.ForeignKey(UserResource, 'Usuario',full=True)
    Reporte = fields.ForeignKey(reporteResource, 'Reporte',full=True)
    class Meta:
        queryset = start.objects.all().order_by('id')
        always_return_data = True
        resource_name = 'startReporte'
        serializer = Serializer(formats=['json', 'jsonp', 'xml', 'yaml', 'html', 'plist'])
        allowed_methods = ['get','post','put']#Solo peticiones GET
        filtering = {
            'Usuario': ALL_WITH_RELATIONS,
            'Reporte':ALL_WITH_RELATIONS,
            'Fecha': ['exact', 'lt', 'lte', 'gte', 'gt'],
            'id':['exact', 'lt', 'lte', 'gte', 'gt','ALL_WITH_RELATIONS'],
        }
        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()

class startEmergenciaResource(ModelResource):
    Usuario = fields.ForeignKey(UserResource, 'Usuario',full=True)
    Reporte = fields.ForeignKey(emergenciaReporteResource, 'Reporte',full=True)
    class Meta:
        queryset = startEmrg.objects.all().order_by('id')
        always_return_data = True
        resource_name = 'startEmergencia'
        serializer = Serializer(formats=['json', 'jsonp', 'xml', 'yaml', 'html', 'plist'])
        allowed_methods = ['get','post','put']#Solo peticiones GET
        filtering = {
            'Usuario': ALL_WITH_RELATIONS,
            'Reporte':ALL_WITH_RELATIONS,
            'Fecha': ['exact', 'lt', 'lte', 'gte', 'gt'],
            'id':['exact', 'lt', 'lte', 'gte', 'gt','ALL_WITH_RELATIONS'],
        }
        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()
 

class MisPuntosResource(ModelResource):
    Usuario = fields.ForeignKey(UserResource, 'Usuario',full=True)
    class Meta:
        queryset = MisPuntos.objects.all().order_by('id')
        always_return_data = True
        resource_name = 'MisPuntos'
        serializer = Serializer(formats=['json', 'jsonp', 'xml', 'yaml', 'html', 'plist'])
        allowed_methods = ['get','post']#Solo peticiones GET
        filtering = {
            'Usuario': ALL_WITH_RELATIONS,
            'Fecha': ['exact', 'lt', 'lte', 'gte', 'gt'],
        }
        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()
    
class sendEmailResource(ModelResource):
    class Meta:
        allowed_methods = ['post']
        always_return_data = True
        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()
        resource_name = 'sendEmail'

    def hydrate(self, bundle):
        REQUIRED_USER_FIELDS = ("usuario","correo","correoUsuario")
        for field in REQUIRED_USER_FIELDS:
            if field not in bundle.data:
                raise CustomBadRequest(code="missing_key",message="Must provide {missing_key} when creating a user.".format(missing_key=field))
        return bundle
        
    def obj_create(self, bundle,  **kwargs):
        usuario = bundle.data['usuario']
        correo = bundle.data['correo']
        correoUsuario=bundle.data['correoUsuario']
        response=''
        try:
            from django.core.mail import send_mail
            #import mailchimp
            send_mail('CityAlert alertas en tu ciudad', 'Aplicacion cityalert descubre lo que pasa en tu ciudad . http://192.168.1.208:8000/static/cityAlert.apk', correoUsuario,[correo], fail_silently=False)
            #list = mailchimp.utils.get_connection().get_list_by_id('ccf422a57d')
            #list.subscribe(correo, {'EMAIL':correo})

        except Exception, e:
            response = {'exito':False,'errores':str(e)}
        else:
            response = {'exito':True,'errores':False}
        finally:
            raise ExitoRequest(code=response)