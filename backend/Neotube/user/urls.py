from django.urls import path
from .views import GoogleLoginView, GoogleRefreshTokenView, DecodeCurrentUserView


urlpatterns = [
    path('current/', DecodeCurrentUserView.as_view(), name='current'),
    path('login/google/', GoogleLoginView.as_view(), name='login'),
    path('refresh/google/', GoogleRefreshTokenView.as_view(), name='refresh'),
]
