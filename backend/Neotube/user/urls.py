from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token
from .views import GoogleLoginView, GoogleRefreshTokenView, DecodeCurrentUserView


urlpatterns = [
    path('current/', DecodeCurrentUserView.as_view(), name='current'),
    path('auth/', obtain_jwt_token),
    path('validate/', verify_jwt_token),
    path('refresh/', refresh_jwt_token),

    path('login/google/', GoogleLoginView.as_view(), name='login'),
    path('refresh/google/', GoogleRefreshTokenView.as_view(), name='refresh'),
]
