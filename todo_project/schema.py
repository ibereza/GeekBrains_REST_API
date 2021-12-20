import graphene
from graphene_django import DjangoObjectType
from project.models import Project, Todo
from users.models import CustomUser


class CustomUserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(CustomUserType)
    all_projects = graphene.List(ProjectType)
    all_todos = graphene.List(TodoType)
    users_by_id = graphene.Field(CustomUserType, id=graphene.Int(required=False))

    def resolve_all_users(root, info):
        return CustomUser.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_todos(root,  info):
        return Todo.objects.all()

    def resolve_users_by_id(root,  info, id=None):
        if id:
            return CustomUser.objects.get(id=id)
        return CustomUser.objects.all()


schema = graphene.Schema(query=Query)
