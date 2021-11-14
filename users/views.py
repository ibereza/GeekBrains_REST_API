from rest_framework.viewsets import ModelViewSet

from .models import CustomUser
from .serializers import UsersModelSerializer


class UsersModelViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UsersModelSerializer
