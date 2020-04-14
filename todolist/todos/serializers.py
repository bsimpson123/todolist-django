from rest_framework import serializers
from todos.models import Todos

# Todos Serializer
class TodosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todos
        fields = '__all__';