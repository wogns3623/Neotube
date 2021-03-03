from rest_framework import serializers
from .models import SocialLoginUser
from feed.models import Feed


class UserSerializer(serializers.ModelSerializer):
    subscriber = serializers.IntegerField(source='get_subscribe_count')

    class Meta:
        model = SocialLoginUser
        fields = ['username', 'email', 'subscriber']

