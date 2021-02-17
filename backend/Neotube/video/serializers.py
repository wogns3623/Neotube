from django.db.models import fields
from rest_framework import serializers
from .models import Video


class SimpleVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['uploader', 'title', 'thumb_nail',
                  'video', 'run_time', 'watch_count', 'created_at']


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        # fields = '__all__'
        fields = ['id', 'uploader', 'category', 'title', 'tag_set', 'thumb_nail', 'video', 'description',
                  'run_time', 'watch_count', 'count_video_like', 'count_video_dis_like', 'created_at']
