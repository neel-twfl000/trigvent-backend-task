# Generated by Django 4.2.4 on 2023-10-05 20:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_alter_document_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='document',
            options={'permissions': (('download_document', 'Can Download File'),)},
        ),
    ]