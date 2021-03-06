from rest_framework import mixins
# from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import GenericViewSet

from .models import CustomUser
from .serializers import UsersModelSerializer, UsersModelSerializerUserPermission


# class UsersLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 5


class UsersModelViewSet(mixins.ListModelMixin,
                        mixins.RetrieveModelMixin,
                        mixins.UpdateModelMixin,
                        GenericViewSet):
    queryset = CustomUser.objects.all()
    # serializer_class = UsersModelSerializer
    # pagination_class = UsersLimitOffsetPagination

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UsersModelSerializerUserPermission
        return UsersModelSerializer
