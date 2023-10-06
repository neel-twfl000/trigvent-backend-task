from rest_framework.permissions import BasePermission
from django.db.models import Q
from base.models import Account

class CustomPermission:
    def __init__(self, request, model):
        self.model = model
        self.request = request

    def check(self, action):
        codename=f"{action}_{self.model.lower()}"
        return Account.objects.filter(
            Q(user_permissions__codename=codename)|
            Q(groups__permissions__codename=codename)|Q(is_superuser=True),
            id=self.request.user.id
            ).exists()
            
    
    def view(self):
        return self.check("view")

    def add(self):
        return self.check("add")
    
    def change(self):
        return self.check("change")

    def delete(self):
        return self.check("delete")

class MyPermission(BasePermission):

    def group_permission(self, request, model):
        custom = CustomPermission(request, model)
        if request.method == "PUT" or request.method == "PATCH":
            return True
        
        elif request.method == "POST":
            return custom.add()
        elif request.method == "DELETE":
            return True
        return False
    
    def has_permission(self, request, view):
        if request.method == "GET":
            return True
        if not request.user.is_authenticated:
            return False
        return self.group_permission(request, view.model.__name__)

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True
        
        custom = CustomPermission(request, view.model.__name__)
        if request.method == "DELETE":
            return (obj.uploader==request.user or custom.delete()
        )
        
        if request.method == "PUT" or request.method == "PATCH":
            return (obj.uploader==request.user or custom.change()
        )

        return super().has_object_permission(request, view, obj)
