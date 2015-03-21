#BY JESUS EDUARDO MURRIETA ROSAS
#Reposiotrio en github del proyecto 
#github     https://github.com/soru13/GestionDeProyectos
from django.db import models
from django.contrib.auth.models import User


class Perfil(models.Model):
    user = models.OneToOneField(User, unique=True, related_name='perfil')
    avatar = models.ImageField(upload_to='AvatarUser')
    direccion = models.TextField()
    accessTokenTwitter= models.CharField(max_length=500,null=False,blank=False)
    accessTokenTwittert_secret= models.CharField(max_length=500,null=False,blank=False)
    accessTokenFacebook= models.CharField(max_length=500,null=False,blank=False)
    EstatusTwitter = models.BooleanField(default=False)
    EstatusFacebook = models.BooleanField(default=False)

    def __unicode__(self):
		return self.user.get_full_name()
