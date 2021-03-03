from django.urls import path
from feed.views import MainFeedAPIView

app_name = 'feed'

urlpatterns = [
    path('', MainFeedAPIView.as_view(), name='defualt'),
]
