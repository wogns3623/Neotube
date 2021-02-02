from django.db import models
from account.models import Account


# Create your models here.
class Feed(models.Model):
    neotuber = models.ForeignKey(Account, on_delete=models.CASCADE)
    subscriber = models.ForeignKey(Account, on_delete=models.CASCADE)

    def __str__(self):
        return f'너튜버: {self.neotuber}, 구독자: {self.subscriber}'