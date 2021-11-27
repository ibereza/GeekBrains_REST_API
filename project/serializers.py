from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer

from users.serializers import UsersModelSerializer
from .models import Project, Todo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    users = UsersModelSerializer(many=True)
    class Meta:
        model = Project
        fields = '__all__'

class TodoModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'
