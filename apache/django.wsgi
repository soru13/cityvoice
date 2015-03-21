import os
import sys	
sys.path.append('/home/soru/adsumDeploy/')
sys.path.append('/home/soru/adsumDeploy/cityAlert/')
os.environ['DJANGO_SETTINGS_MODULE'] = 'cityAlert.settings'
import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()
path = '/home/soru/adsumDeploy/cityAlert/'
if path not in sys.path:
    sys.path.append(path)
