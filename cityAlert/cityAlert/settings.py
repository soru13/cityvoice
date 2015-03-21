"""
Django settings for cityAlert project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'atl&!_b8%t$qcrcnwuw=f7)%w+i@+$bs7!2z@y+7m%_p)cjh$9'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'south',
    'Cordenadas',
    'Usuarios',
    'Home',
    'Notificaciones',
    'API',
    'tastypie',
    'Chat',
    'Reporteria',
    'statistics',
    'ControlActividades',
    'streaming',
    'django_extensions',
    'provider',
    'provider.oauth2',
    'mailchimp',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'cityAlert.urls'

WSGI_APPLICATION = 'cityAlert.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'cityalert',                      # Or path to database file if using sqlite3.
        # The following settings are not used with sqlite3:
        'USER': 'soru',
        'PASSWORD': '13254601',
        'HOST': '127.0.0.1',                      # Empty for localhost through domain sockets or '127.0.0.1' for localhost through TCP.
        'PORT': '5432',                      # Set to empty string for default.
     },
}

# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/Mazatlan'

USE_I18N = True

USE_L10N = True

USE_TZ = True

SESSION_SERIALIZER = 'django.contrib.sessions.serializers.JSONSerializer'
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/

MEDIA_ROOT=os.path.join(BASE_DIR,'media')
MEDIA_URL='http://sa.dynns.com:8000/media/'
STATIC_URL = 'http://sa.dynns.com:8000/static/'
ADMIN_MEDIA_PREFIX='/static/admin/'
STATICFILES_DIRS=(
    os.path.join(BASE_DIR,'static'),
    )
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
#    'django.contrib.staticfiles.finders.DefaultStorageFinder',
)
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
#     'django.template.loaders.eggs.Loader',
)
STATICFILES_STORAGE='django.contrib.staticfiles.storage.CachedStaticFilesStorage'
STATIC_ROOT=os.sep.join(os.path.abspath(__file__).split(os.sep)[:2]+['media'])
STATIC_ROOT=os.sep.join(os.path.abspath(__file__).split(os.sep)[:2]+['content'])
AUTH_PROFILE_MODULE='Usuarios.Perfil'
TEMPLATE_DIRS = (
    # Put strings here, like "/home/html/django_templates" or "C:/www/django/templates".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    os.path.join(BASE_DIR,'templates'),
)

# EMAIL SETTINGS
MAILCHIMP_API_KEY = "65c3dfccd791e3c872e3a2a5fcf315fb-us6"
DEFAULT_FROM_EMAIL = "jesus.ed13@gmail.com"
#EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# Host for sending e-mail.
#EMAIL_HOST = 'localhost'
# Port for sending e-mail.
#EMAIL_PORT = 1025
# Optional SMTP authentication information for EMAIL_HOST.
#EMAIL_HOST_USER = ''
#EMAIL_HOST_PASSWORD = ''
#EMAIL_USE_TLS = False

EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'jesus.ed13@gmail.com'
EMAIL_HOST_PASSWORD = 'mariaabigail'