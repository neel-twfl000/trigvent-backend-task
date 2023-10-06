from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DocumentViewset, LoginViewSet
router = DefaultRouter()

router.register(r'login', LoginViewSet, basename="login")
router.register(r'document', DocumentViewset, basename="document")

urlpatterns = [
    path('', include(router.urls))
]

# router.register(r'test', api.HomeView, basename="home")
