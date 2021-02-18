from django.contrib import admin
from .models import SocialLoginUser
# Register your models here.


@admin.register(SocialLoginUser)
class SocailLoginUserAdmin(admin.ModelAdmin):
    pass
