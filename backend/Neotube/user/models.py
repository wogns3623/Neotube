from django.contrib.auth.models import AbstractUser
from django.db import models
from feed.models import Feed


class SocialLoginUser(AbstractUser):
    REQUIRED_FIELDS = ['email']

    def get_subscribe_count(self):
        return Feed.objects.filter(neotuber=self).count()
