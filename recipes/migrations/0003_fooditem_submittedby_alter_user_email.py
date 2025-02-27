# Generated by Django 5.0.7 on 2024-07-15 06:12

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0002_auto_20240713_2340'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        
        migrations.AddField(
           model_name='fooditem',
           name='submitted_by',
           field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
),

        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(default='Unknown', max_length=254, unique=True),
        ),
    ]
