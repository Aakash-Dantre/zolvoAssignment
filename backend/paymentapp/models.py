from django.db import models
# Create your models here.
from django.contrib.auth.models import User
import datetime


class cstusers(models.Model):
    user = models.OneToOneField(User,  on_delete=models.CASCADE)
    phone = models.CharField(max_length=10, blank=False, unique=True)

class trans_log(models.Model):
    user_id = models.CharField(max_length=10, blank=False)
    t_log= models.IntegerField(blank=False)
    time = models.DateTimeField(auto_now_add=True)


class wallet(models.Model):
    user_id = models.CharField(max_length=10, blank=False,default=-1)
    balance = models.IntegerField(default=50)

    def save(self, *args, **kwargs):
        if self.balance<50:
            raise ValueError("Balance cannot be less than 50")
        super(wallet, self).save(*args, **kwargs)

