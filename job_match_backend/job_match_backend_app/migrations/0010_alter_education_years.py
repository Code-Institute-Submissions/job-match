# Generated by Django 4.1 on 2024-07-21 20:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job_match_backend_app', '0009_rename_applicant_application_profile_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='education',
            name='years',
            field=models.CharField(max_length=10, null=True),
        ),
    ]