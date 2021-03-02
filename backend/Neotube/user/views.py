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
        user_status = json.loads(request.body)
        print(user_status)

        user, created = SocialLoginUser.objects.get_or_create(
            username=user_status['username'],
            social_id=user_status['id']
        )

        if created:
            user.first_name = user_status['last_name']
            user.last_name = user_status['first_name']
            user.email = user_status['email']
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
            'client_id': '781581892874-5fo0b3utssf5n6eidrm0qqgcjoulr12p.apps.googleusercontent.com',
            'client_secret': 'jg_6_RtJAm_kpTWKMECuMzUg',
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
        token = request.META['HTTP_AUTHORIZATION'].split(" ")[1]
        decode_data = jwt.decode(
            jwt=token, key=settings.SECRET_KEY, algorithms=['HS256'])
        decode_data = json.dumps(decode_data)
        return HttpResponse(f'{decode_data}', content_type="application/json")

