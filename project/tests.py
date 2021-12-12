from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, APITestCase
from mixer.backend.django import mixer

from users.models import CustomUser
from .models import Todo
from .views import TodoModelViewSet


class TestTodoViewSet1(TestCase):
    url = '/api/todo/'

    # тест для API, используя APIRequestFactory
    def test_get_todo_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = TodoModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # тест для API, используя APIClient
    def test_edit_todo_guest(self):
        todo = mixer.blend(Todo)
        client = APIClient()
        response = client.patch(f'{self.url}{todo.id}/', {'text': 'my text'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestTodoViewSet2(APITestCase):
    url = '/api/todo/'

    # тест для API, используя APITestCase
    def test_edit_todo_admin(self):
        CustomUser.objects.create_superuser('admin', 'admin@admin.com', 'admin')
        self.client.login(username='admin', password='admin')
        todo = mixer.blend(Todo)
        response = self.client.patch(f'{self.url}{todo.id}/', {"text": "my text"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = Todo.objects.get(id=todo.id)
        self.assertEqual(todo.text, 'my text')
