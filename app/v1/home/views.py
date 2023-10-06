from django.shortcuts import render, HttpResponse
from base.models import Account
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import Permission

# Create your views here.


def home(request):
    # a = Account.objects.create_user(
    #     first_name="neel",
    #     phone="91",
    #     email="neel@123.com",
    #     password="admin"
    # )
    # p = Permission.objects.filter(content_type__model='document')

    # for i in p:
    #     print(i.codename)

    # user = authenticate(email="neel@123.com", password="admin")
    # login(request, user)
    
    # logout(request)
    return render(request, 'index.html')
