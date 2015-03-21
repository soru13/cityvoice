#BY JESUS EDUARDO MURRIETA ROSAS
#Reposiotrio en github del proyecto 
#github     https://github.com/soru13/GestionDeProyectos
from django.db import models
from django.contrib.auth.models import User

from tastypie.utils.timezone import now
from django.template.defaultfilters import slugify

from tastypie.models import create_api_key

#models.signals.post_save.connect(create_api_key, sender=User)
class Poll(models.Model):
    question = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    def __unicode__(self):
        return self.question
 
class Choice(models.Model):
    poll = models.ForeignKey(Poll)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    def __unicode(self):
        return self.choice_text



