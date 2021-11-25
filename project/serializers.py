from rest_framework.serializers import HyperlinkedModelSerializer

from .models import Project, Todo
from users.serializers import UsersModelSerializer


class ProjectModelSerializer(HyperlinkedModelSerializer):
    users = UsersModelSerializer(many=True)

    def create(self, validated_data):
        project_name = validated_data['name']
        users = validated_data['users']
        pass

    class Meta:
        model = Project
        fields = '__all__'

class TodoModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'
