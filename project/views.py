from django_filters import rest_framework as filters
from rest_framework import status, permissions
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Project, Todo
from .serializers import ProjectModelSerializer, TodoModelSerializer


# class ProjectLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 10


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    # pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter


# class TodoLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 20


class TodoFilter(filters.FilterSet):
    create = filters.DateFromToRangeFilter(label='Дата создания в формате гггг-мм-дд')

    class Meta:
        model = Todo
        fields = ['project', 'create']


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    # pagination_class = TodoLimitOffsetPagination
    filterset_class = TodoFilter

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        return Response(status=status.HTTP_200_OK)
