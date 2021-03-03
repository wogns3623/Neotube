from rest_framework import serializers
from feed.models import Feed
from user.serializers import UserSerializer

class FeedSerializer(serializers.ModelSerializer):
    neotuber = UserSerializer()

    class Meta:
        model = Feed
        fields = ['neotuber']
