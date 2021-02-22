from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.response import Response
from django.views.generic import View
import requests
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

        print(body)

        google_response = requests.post(url, headers=headers, data=body)

        print(google_response.text)

        return HttpResponse(f'{google_response.text}')
