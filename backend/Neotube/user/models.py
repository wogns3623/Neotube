from django.contrib.auth.models import AbstractUser
from django.db import models


class SocialLoginUser(AbstractUser):
    REQUIRED_FIELDS = ['email']
