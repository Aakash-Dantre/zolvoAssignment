# Generated by Django 3.1.7 on 2021-05-13 00:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('paymentapp', '0011_auto_20210513_0043'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='log',
            new_name='trans_log',
        ),
    ]