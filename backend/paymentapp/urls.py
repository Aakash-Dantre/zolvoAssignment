from django.urls import path

from . import views

urlpatterns = [
    path('login/', views.login),
    path('register/', views.register),
    path('create/', views.create),
    path('debit/', views.debit),
    path('credit/', views.credit),
    path('log/', views.log),
]