# Generated by Django 3.1.7 on 2021-05-13 00:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('paymentapp', '0009_delete_log'),
    ]

    operations = [
        migrations.CreateModel(
            name='log',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tc', models.IntegerField()),
                ('user_id', models.CharField(max_length=10)),
            ],
        ),
    ]
