from django.db import models


# Create your models here.
class Account(models.Model):
    account_id = models.CharField(max_length=30)
    account_pw = models.CharField(max_length=30)
    account_name = models.CharField(max_length=50)
    account_phone = models.CharField(max_length=30)
    account_email = models.EmailField()
    account_created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.account_name

