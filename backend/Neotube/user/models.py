from django.contrib.auth.models import AbstractUser
from django.db import models


class SocialLoginUser(AbstractUser):
    phone = models.CharField(max_length=50)
    REQUIRED_FIELDS = ['email']
