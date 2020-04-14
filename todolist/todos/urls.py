from rest_framework import routers
from .api import TodosViewSet

router = routers.DefaultRouter()
router.register('api/todos', TodosViewSet, 'todos')

urlpatterns = router.urls