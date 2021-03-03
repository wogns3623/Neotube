from django.db import models
from django.conf import settings


# Create your models here.
class Feed(models.Model):
    neotuber = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='neotuber_feed')
    subscriber = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='subscriber_feed')

    class Meta:
        unique_together = ('neotuber', 'subscriber',)

    def __str__(self):
        return f'너튜버: {self.neotuber}, 구독자: {self.subscriber}'

    def is_subscribe(neotuber, subscriber):
        return len(Feed.objects.filter(neotuber=neotuber, subscriber=subscriber)) == 1
