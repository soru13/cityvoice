import json
 
from tastypie.exceptions import TastypieError
from tastypie.http import HttpBadRequest,HttpCreated
 
class CustomBadRequest(TastypieError):
    """
    This exception is used to interrupt the flow of processing to immediately
    return a custom HttpResponse.
    """
 
    def __init__(self, code="", message=""):
        self._response = {'exito':False,"errores":message,'code':code}
 
    @property
    def response(self):
        return HttpBadRequest(json.dumps(self._response),mimetype='application/json')
class ExitoRequest(TastypieError):

    def __init__(self, code="", message=""):
        self._response = {'exito':True,'errores': message or 'creado con exito','code':code or 'no hay usuario'}

 
    @property
    def response(self):
        return HttpCreated(
            json.dumps(self._response),
            content_type='application/json')

class failRequest(TastypieError):

    def __init__(self, code="", message=""):
        self._response = {'exito':False,'errores':message or 'no se pudo crear el usuario los password no coinciden'}
 
    @property
    def response(self):
        return HttpBadRequest(
            json.dumps(self._response),
            content_type='application/json')

class faillogin(TastypieError):

    def __init__(self, code="", message=""):
        self._response = {'exito':False,'errores':message or 'no esta activo'}
 
    @property
    def response(self):
        return HttpBadRequest(
            json.dumps(self._response),
            content_type='application/json')

