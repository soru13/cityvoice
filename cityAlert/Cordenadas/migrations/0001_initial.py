# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'categoria'
        db.create_table(u'Cordenadas_categoria', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('Categoria', self.gf('django.db.models.fields.CharField')(unique=True, max_length=50)),
            ('Usuario', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('avatar', self.gf('django.db.models.fields.files.ImageField')(max_length=100)),
            ('Fecha', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('Marker', self.gf('django.db.models.fields.files.ImageField')(max_length=100)),
        ))
        db.send_create_signal(u'Cordenadas', ['categoria'])

        # Adding model 'emergenciaCat'
        db.create_table(u'Cordenadas_emergenciacat', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('Emergencia', self.gf('django.db.models.fields.CharField')(unique=True, max_length=50)),
            ('avatar', self.gf('django.db.models.fields.files.ImageField')(max_length=100)),
            ('Usuario', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('Fecha', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('Marker', self.gf('django.db.models.fields.files.ImageField')(max_length=100)),
        ))
        db.send_create_signal(u'Cordenadas', ['emergenciaCat'])

        # Adding model 'emergenciaReporte'
        db.create_table(u'Cordenadas_emergenciareporte', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('Alert', self.gf('django.db.models.fields.CharField')(max_length=50)),
            ('Lat', self.gf('django.db.models.fields.CharField')(max_length=50)),
            ('Long', self.gf('django.db.models.fields.CharField')(max_length=50)),
            ('Usuario', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('Categoria', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['Cordenadas.emergenciaCat'])),
            ('Fecha', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('Imagen', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('Estatus', self.gf('django.db.models.fields.BooleanField')(default=True)),
        ))
        db.send_create_signal(u'Cordenadas', ['emergenciaReporte'])

        # Adding model 'subcategoria'
        db.create_table(u'Cordenadas_subcategoria', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('Subcategoria', self.gf('django.db.models.fields.CharField')(unique=True, max_length=50)),
            ('Categoria', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['Cordenadas.categoria'])),
            ('Usuario', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('avatar', self.gf('django.db.models.fields.files.ImageField')(max_length=100)),
            ('Fecha', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('Marker', self.gf('django.db.models.fields.files.ImageField')(max_length=100)),
        ))
        db.send_create_signal(u'Cordenadas', ['subcategoria'])

        # Adding model 'reporte'
        db.create_table(u'Cordenadas_reporte', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('Alert', self.gf('django.db.models.fields.CharField')(max_length=250)),
            ('Lat', self.gf('django.db.models.fields.CharField')(max_length=50)),
            ('Long', self.gf('django.db.models.fields.CharField')(max_length=50)),
            ('Usuario', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('Fecha', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('Imagen', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('Estatus', self.gf('django.db.models.fields.BooleanField')(default=True)),
            ('Categoria', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['Cordenadas.categoria'])),
            ('Subcategoria', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['Cordenadas.subcategoria'])),
        ))
        db.send_create_signal(u'Cordenadas', ['reporte'])

        # Adding model 'denunciaOrGuardar'
        db.create_table(u'Cordenadas_denunciaorguardar', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('tipo', self.gf('django.db.models.fields.CharField')(max_length=50)),
            ('Usuario', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('Fecha', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('Estatus', self.gf('django.db.models.fields.BooleanField')(default=True)),
        ))
        db.send_create_signal(u'Cordenadas', ['denunciaOrGuardar'])

        # Adding model 'comment'
        db.create_table(u'Cordenadas_comment', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('Comment', self.gf('django.db.models.fields.CharField')(max_length=250)),
            ('Usuario', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('Fecha', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('Estatus', self.gf('django.db.models.fields.BooleanField')(default=True)),
            ('Reporte', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['Cordenadas.reporte'])),
            ('Tipo', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['Cordenadas.denunciaOrGuardar'])),
            ('Starts', self.gf('django.db.models.fields.IntegerField')(max_length=250)),
        ))
        db.send_create_signal(u'Cordenadas', ['comment'])

        # Adding model 'commentEmergen'
        db.create_table(u'Cordenadas_commentemergen', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('Comment', self.gf('django.db.models.fields.CharField')(max_length=250)),
            ('Usuario', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('Fecha', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('Estatus', self.gf('django.db.models.fields.BooleanField')(default=True)),
            ('Reporte', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['Cordenadas.emergenciaReporte'])),
            ('Tipo', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['Cordenadas.denunciaOrGuardar'])),
            ('Starts', self.gf('django.db.models.fields.IntegerField')()),
        ))
        db.send_create_signal(u'Cordenadas', ['commentEmergen'])

        # Adding model 'start'
        db.create_table(u'Cordenadas_start', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('Calificacion', self.gf('django.db.models.fields.FloatField')()),
            ('Reporte', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['Cordenadas.reporte'])),
            ('Usuario', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('Fecha', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
        ))
        db.send_create_signal(u'Cordenadas', ['start'])

        # Adding model 'startEmrg'
        db.create_table(u'Cordenadas_startemrg', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('Calificacion', self.gf('django.db.models.fields.FloatField')()),
            ('Reporte', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['Cordenadas.emergenciaReporte'])),
            ('Usuario', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('Fecha', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
        ))
        db.send_create_signal(u'Cordenadas', ['startEmrg'])

        # Adding model 'MisPuntos'
        db.create_table(u'Cordenadas_mispuntos', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('nombre', self.gf('django.db.models.fields.CharField')(max_length=250)),
            ('Lat', self.gf('django.db.models.fields.CharField')(max_length=50)),
            ('Long', self.gf('django.db.models.fields.CharField')(max_length=50)),
            ('Usuario', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'])),
            ('Fecha', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
        ))
        db.send_create_signal(u'Cordenadas', ['MisPuntos'])


    def backwards(self, orm):
        # Deleting model 'categoria'
        db.delete_table(u'Cordenadas_categoria')

        # Deleting model 'emergenciaCat'
        db.delete_table(u'Cordenadas_emergenciacat')

        # Deleting model 'emergenciaReporte'
        db.delete_table(u'Cordenadas_emergenciareporte')

        # Deleting model 'subcategoria'
        db.delete_table(u'Cordenadas_subcategoria')

        # Deleting model 'reporte'
        db.delete_table(u'Cordenadas_reporte')

        # Deleting model 'denunciaOrGuardar'
        db.delete_table(u'Cordenadas_denunciaorguardar')

        # Deleting model 'comment'
        db.delete_table(u'Cordenadas_comment')

        # Deleting model 'commentEmergen'
        db.delete_table(u'Cordenadas_commentemergen')

        # Deleting model 'start'
        db.delete_table(u'Cordenadas_start')

        # Deleting model 'startEmrg'
        db.delete_table(u'Cordenadas_startemrg')

        # Deleting model 'MisPuntos'
        db.delete_table(u'Cordenadas_mispuntos')


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