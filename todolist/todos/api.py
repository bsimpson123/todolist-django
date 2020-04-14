from todos.models import Todos
from rest_framework import viewsets, permissions
from .serializers import TodosSerializer

class TodosViewSet(viewsets.ModelViewSet):
    queryset = Todos.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = TodosSerializer

    # def get_queryset(self):
    #     return self.request.todos.all()

    # def perform_create(self, serializer):
    #     serializer.save()