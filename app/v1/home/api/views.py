from rest_framework.viewsets import ViewSet, ModelViewSet
from rest_framework.response import Response
from .permission import MyPermission
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework import status
from .serializer import Document, DocumentSerializer, AccountSerializer
from django.db.models import Q
from django.contrib.auth import authenticate

class LoginViewSet(ViewSet):
    def create(sele, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)
        if user:
            data = AccountSerializer(user).data
            return Response(data, status=status.HTTP_200_OK)
        return Response({"message":"Try Again"}, status=status.HTTP_401_UNAUTHORIZED)

class DocumentViewset(ModelViewSet):
    permission_classes = [MyPermission]
    model = Document
    serializer_class = DocumentSerializer
    
    def get_queryset(self):
        q = self.request.GET.get('q', None)
        if q:
            return self.model.objects.filter(
                Q(title__icontains=q)| Q(uploader__email__icontains=q)
            ).order_by('-id')
        return self.model.objects.all().order_by('-id')
    
