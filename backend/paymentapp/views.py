from django.shortcuts import render
from django.db import connection
from django.core import serializers
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.db import transaction
import json
import sys
from .models import cstusers
from .models import wallet
from .models import trans_log
from django.core.files.storage import default_storage
from rest_framework.authtoken.models import Token

import os

    
@csrf_exempt
def create(request):
    tk = request.POST['token']
    print(tk)
    user = Token.objects.get(key=tk).user
    if user:
    # Do something for authenticated users.
        userid=user.id
        p=wallet(user_id=userid)
        p.save()


        return HttpResponse()

    else:
    # Do something for anonymous users.
        print('notauthenticated')
        return HttpResponse(status=400)
   

@csrf_exempt
def credit(request):
    tk = request.POST['token']
    amount = request.POST['amount']
    print(tk)
    user = Token.objects.get(key=tk).user
    if user:
    # Do something for authenticated users.
        userid=user.id
        p=wallet.objects.filter(user_id=userid).first()
        cur_balance = p.balance
        upd_balance = cur_balance+int(amount)
        p.balance = upd_balance
        p.save()
        l=trans_log(user_id=userid,t_log=amount)
        l.save()
        obj = {'balance':upd_balance}
        print(obj)
        return JsonResponse(obj)


    else:
    # Do something for anonymous users.
        print('notauthenticated')
        return HttpResponse(status=400)

@csrf_exempt
@transaction.atomic
def debit(request):
    tk = request.POST['token']
    amount = request.POST['amount']
    print(tk)
    user = Token.objects.get(key=tk).user
    if user:
    # Do something for authenticated users.
        userid=user.id
        p=wallet.objects.filter(user_id=userid).first()
        cur_balance = p.balance
        upd_balance = cur_balance-int(amount)
        p.balance = upd_balance
        try:
            p.save()
            obj = {'balance':upd_balance}
            print(obj)
            trc=-int(amount)
            # print(trc)
            l=trans_log(t_log=trc,user_id=userid)
            l.save()
            return JsonResponse(obj)
        except:
            return HttpResponse(status=400)


    else:
    # Do something for anonymous users.
        print('notauthenticated')
        return HttpResponse(status=400)

@csrf_exempt
def create(request):
    tk = request.POST['token']
    print(tk)
    user = Token.objects.get(key=tk).user
    if user:
    # Do something for authenticated users.
        userid=user.id
        if wallet.objects.filter(user_id=userid).count()==0:
            p=wallet(user_id=userid)
            balance=p.balance
            p.save()
            obj = {'balance':balance}
            print(obj)
            return JsonResponse(obj)
        else:
            return HttpResponse("wallet already exists",status=400)

    else:
    # Do something for anonymous users.
        print('notauthenticated')
        return HttpResponse("unauthenticated access",status=400)
   
@csrf_exempt
def log(request):
    tk = request.POST['token']
    print(tk)
    user = Token.objects.get(key=tk).user
    if user:
    # Do something for authenticated users.
        userid=user.id
        obj = list(trans_log.objects.filter(user_id=userid).values())

        print(obj)

        return JsonResponse(obj,safe=False)

    else:
    # Do something for anonymous users.
        print('notauthenticated')
        return HttpResponse(status=400)
   



@csrf_exempt
def login(request):
    ph =request.POST.get("phone")
    cstuser = cstusers.objects.filter(phone=ph).first()
    
    if cstuser is not None:
        # A backend authenticated the credentials
        uid=cstuser.user_id
        user=User.objects.filter(id=uid).first()
        token = Token.objects.get_or_create(user=user)
        print(token[0])
        tk=str(token[0])

        nm = user.username
        obj = {'username':nm,'phone':ph,'token':tk}
        print('authboth')
        return JsonResponse(obj)

    else:
        # No backend authenticated the credentials
        return HttpResponse(status=400)


@csrf_exempt
def register(request):
    ph = request.POST['phone']
    nm = request.POST['username']
    if cstusers.objects.filter(phone=ph).count()==0:      # if unique email address --> add user
        u =User(username=nm)
        p = cstusers(user=u,phone=ph)
        u.save()
        p.save()
        return HttpResponse()

    else:                                                # else bad request
        return HttpResponse(status=400)
