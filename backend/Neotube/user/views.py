from django.conf import settings
from django.http import HttpResponse
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from user.models import SocialLoginUser

import requests
import json
import jwt
# Create your views here.


class GoogleLoginView(View):
    def get(self, request):
        google_access_token = request.GET.get('code', None)

        url = 'https://www.googleapis.com/oauth2/v4/token'

        headers = {'Content-Type': 'application/x-www-form-urlencoded'}

        body = {
            'code': f'{google_access_token}',
            'client_id': '859093333662-ecvnhup69lnmtb722f89fv9e2mbuqrcf.apps.googleusercontent.com',
            'client_secret': 'ZYaVfQ4aZlnZJUGyVHDyoz32',
            'redirect_uri': 'http://127.0.0.1:8000/accounts/login/google/',
            'grant_type': 'authorization_code',
        }

        google_response = requests.post(url, headers=headers, data=body)

        return HttpResponse(f'{google_response.text}')

    def post(self, request):
        # ! Google access_token을 제공받아서 구글에 정볼를 얻어옴.
        google_access_token = request.META['HTTP_AUTHORIZATION']
        url = f'https://www.googleapis.com/oauth2/v1/userinfo?access_token={google_access_token}'
        google_response = requests.get(url)
        google_response_dict = json.loads(google_response.text)

        user, created = SocialLoginUser.objects.get_or_create(
            username=google_response_dict['email'],
            social_id=google_response_dict['id']
        )

        if created:
            user.first_name = google_response_dict['family_name']
            user.last_name = google_response_dict['given_name']
            user.email = google_response_dict['email']
            user.social = "google"
            user.set_password('google' + user.username)
            user.save()

        url = 'http://127.0.0.1:8000/accounts/auth/'

        body = {
            'username': user.username,
            'password': 'google' + user.username
        }
        jwt_token = requests.post(url, data=body)
        return HttpResponse(f'{jwt_token.text}')

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(GoogleLoginView, self).dispatch(request, *args, **kwargs)


class GoogleRefreshTokenView(View):
    def post(self, request):
        token = json.loads(request.body)['token']
        print(token)
        url = 'https://www.googleapis.com/oauth2/v4/token'
        body = {
            'client_id': '859093333662-ecvnhup69lnmtb722f89fv9e2mbuqrcf.apps.googleusercontent.com',
            'client_secret': 'ZYaVfQ4aZlnZJUGyVHDyoz32',
            'refresh_token': token,
            'grant_type': 'refresh_token'
        }

        google_response = requests.post(url, data=body)
        google_access_token = json.loads(google_response.text)['access_token']

        return HttpResponse(f'{google_access_token}')
        # return HttpResponse(request.body)

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(GoogleRefreshTokenView, self).dispatch(request, *args, **kwargs)


class DecodeCurrentUserView(View):
    def get(self, request):
        token = request.META['HTTP_AUTHORIZATION']
        decode_data = jwt.decode(
            jwt=token, key=settings.SECRET_KEY, algorithms=['HS256'])
        return HttpResponse(f'{decode_data}')
