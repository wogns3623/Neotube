# Generated by Django 3.1.6 on 2021-02-23 14:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_auto_20210223_2315'),
    ]

    operations = [
        migrations.AlterField(
            model_name='socialloginuser',
            name='social_id',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
