from django.urls import path, include
from .views import WatchVideoView, WatchNextAPIView


urlpatterns = [
    path('<int:pk>', WatchVideoView.as_view(), name='detail'),
    path('<int:pk>/next', WatchNextAPIView.as_view(), name='next'),
]
