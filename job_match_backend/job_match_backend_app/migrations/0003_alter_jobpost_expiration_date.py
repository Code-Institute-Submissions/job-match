# Generated by Django 4.1 on 2024-06-18 13:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job_match_backend_app', '0002_jobpost_jobseekercv_customuser_is_ag_workexperince_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobpost',
            name='expiration_date',
            field=models.DateField(),
        ),
    ]
