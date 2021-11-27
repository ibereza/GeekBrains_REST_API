from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Project, Todo
from .serializers import ProjectModelSerializer, TodoModelSerializer
from users.models import CustomUser


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer

    def create(self, request, *args, **kwargs):
        project_name = request.data['name']
        project_users = request.data['users']
        project_url = request.data['url']
        new_project = Project.objects.create(name=project_name, url=project_url)
        for user in project_users:
            user_id = CustomUser.objects.get(username=user['username']).id
            new_project.users.add(user_id)

        serializer = self.get_serializer(data=request.data)
        # serializer.is_valid(raise_exception=True)
        # self.perform_create(serializer)
        headers = self.get_success_headers(serializer.initial_data)
        return Response(serializer.initial_data, status=status.HTTP_201_CREATED, headers=headers)


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
