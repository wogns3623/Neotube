from django.contrib.auth.models import AbstractUser
from django.db import models
from feed.models import Feed


class SocialLoginUser(AbstractUser):
    social = models.CharField(max_length=10, blank=True)
    social_id = models.CharField(max_length=100, blank=True)
    avatar = models.ImageField(upload_to='avatar/%Y/%m/%d')

    def get_subscribe_count(self):
        return Feed.objects.filter(neotuber=self).count()
