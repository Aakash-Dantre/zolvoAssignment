# Generated by Django 3.1.7 on 2021-05-13 00:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('paymentapp', '0006_auto_20210513_0003'),
    ]

    operations = [
        migrations.CreateModel(
            name='log',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transaction', models.IntegerField()),
                ('user_id', models.CharField(max_length=10)),
            ],
        ),
    ]
