# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'MisPuntos.Direccion'
        db.add_column(u'Cordenadas_mispuntos', 'Direccion',
                      self.gf('django.db.models.fields.CharField')(default='none', max_length=500),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'MisPuntos.Direccion'
        db.delete_column(u'Cordenadas_mispuntos', 'Direccion')


    models = {
        u'Cordenadas.categoria': {
            'Categoria': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '50'}),
            'Fecha': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'Marker': ('django.db.models.fields.files.ImageField', [], {'max_length': '100'}),
            'Meta': {'object_name': 'categoria'},
            'Usuario': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"}),
            'avatar': ('django.db.models.fields.files.ImageField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'Cordenadas.comment': {
            'Comment': ('django.db.models.fields.CharField', [], {'max_length': '250'}),
            'Estatus': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'Fecha': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'Meta': {'object_name': 'comment'},
            'Reporte': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['Cordenadas.reporte']"}),
            'Starts': ('django.db.models.fields.IntegerField', [], {'max_length': '250'}),
            'Tipo': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['Cordenadas.denunciaOrGuardar']"}),
            'Usuario': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'Cordenadas.commentemergen': {
            'Comment': ('django.db.models.fields.CharField', [], {'max_length': '250'}),
            'Estatus': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'Fecha': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'Meta': {'object_name': 'commentEmergen'},
            'Reporte': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['Cordenadas.emergenciaReporte']"}),
            'Starts': ('django.db.models.fields.IntegerField', [], {}),
            'Tipo': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['Cordenadas.denunciaOrGuardar']"}),
            'Usuario': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'Cordenadas.denunciaorguardar': {
            'Estatus': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'Fecha': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'Meta': {'object_name': 'denunciaOrGuardar'},
            'Usuario': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'tipo': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        u'Cordenadas.emergenciacat': {
            'Emergencia': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '50'}),
            'Fecha': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'Marker': ('django.db.models.fields.files.ImageField', [], {'max_length': '100'}),
            'Meta': {'object_name': 'emergenciaCat'},
            'Usuario': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"}),
            'avatar': ('django.db.models.fields.files.ImageField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'Cordenadas.emergenciareporte': {
            'Alert': ('django.db.models.fields.CharField', [], {'max_length': '50'}),
            'Categoria': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['Cordenadas.emergenciaCat']"}),
            'Estatus': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'Fecha': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'Imagen': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'Lat': ('django.db.models.fields.CharField', [], {'max_length': '50'}),
            'Long': ('django.db.models.fields.CharField', [], {'max_length': '50'}),
            'Meta': {'object_name': 'emergenciaReporte'},
            'Usuario': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'Cordenadas.mispuntos': {
            'Direccion': ('django.db.models.fields.CharField', [], {'max_length': '500'}),
            'Fecha': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'Lat': ('django.db.models.fields.CharField', [], {'max_length': '50'}),
            'Long': ('django.db.models.fields.CharField', [], {'max_length': '50'}),
            'Meta': {'object_name': 'MisPuntos'},
            'Usuario': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'nombre': ('django.db.models.fields.CharField', [], {'max_length': '250'})
        },
        u'Cordenadas.reporte': {
            'Alert': ('django.db.models.fields.CharField', [], {'max_length': '250'}),
            'Categoria': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['Cordenadas.categoria']"}),
            'Estatus': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'Fecha': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'Imagen': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'Lat': ('django.db.models.fields.CharField', [], {'max_length': '50'}),
            'Long': ('django.db.models.fields.CharField', [], {'max_length': '50'}),
            'Meta': {'object_name': 'reporte'},
            'Subcategoria': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['Cordenadas.subcategoria']"}),
            'Usuario': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'Cordenadas.start': {
            'Calificacion': ('django.db.models.fields.FloatField', [], {}),
            'Fecha': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'Meta': {'object_name': 'start'},
            'Reporte': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['Cordenadas.reporte']"}),
            'Usuario': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'Cordenadas.startemrg': {
            'Calificacion': ('django.db.models.fields.FloatField', [], {}),
            'Fecha': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'Meta': {'object_name': 'startEmrg'},
            'Reporte': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['Cordenadas.emergenciaReporte']"}),
            'Usuario': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'Cordenadas.subcategoria': {
            'Categoria': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['Cordenadas.categoria']"}),
            'Fecha': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'Marker': ('django.db.models.fields.files.ImageField', [], {'max_length': '100'}),
            'Meta': {'object_name': 'subcategoria'},
            'Subcategoria': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '50'}),
            'Usuario': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"}),
            'avatar': ('django.db.models.fields.files.ImageField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'auth.group': {
            'Meta': {'object_name': 'Group'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        u'auth.permission': {
            'Meta': {'ordering': "(u'content_type__app_label', u'content_type__model', u'codename')", 'unique_together': "((u'content_type', u'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['contenttypes.ContentType']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        u'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'related_name': "u'user_set'", 'blank': 'True', 'to': u"orm['auth.Group']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'related_name': "u'user_set'", 'blank': 'True', 'to': u"orm['auth.Permission']"}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        u'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        }
    }

    complete_apps = ['Cordenadas']