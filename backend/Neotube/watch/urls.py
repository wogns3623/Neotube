from django.urls import path, include
from .views import WatchVideoView


urlpatterns = [
    path('<int:pk>', WatchVideoView.as_view(), name='detail')
]
