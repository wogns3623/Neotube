from django.urls import path
from . import views


urlpatterns = [
    ## https://www.youtube.com/youtubei/v1/guide?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8
    ## Youtube 첫 화면 데이터 불러오는 URL
    path('api/v1/gudie/', views, name='guide'),
    ## https://www.youtube.com/youtubei/v1/browse?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8
    ## Youtube 첫 화면 로딩 후 추가 영상 불러오는 URL
    path('api/v1/browse/', views, name='browse'),
]