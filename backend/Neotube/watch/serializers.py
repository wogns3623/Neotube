from rest_framework import serializers
from .models import Video


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('upl oader', 'title', 'run_time', 'watch_count', 'created_at')