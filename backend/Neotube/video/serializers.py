from django.db.models import fields
from rest_framework import serializers
from .models import Video, Tag
from Neotube.serializers import UserSerializer


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name']


class SimpleVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['uploader', 'title', 'thumb_nail',
                  'video', 'run_time', 'watch_count', 'created_at']


class VideoSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.category')
    uploader = UserSerializer()
    tag_set = TagSerializer(many=True)

    class Meta:
        model = Video
        # fields = '__all__'
        fields = ['id', 'uploader', 'category_name', 'title', 'tag_set', 'thumb_nail', 'video', 'description',
                  'run_time', 'watch_count', 'count_video_like', 'count_video_dis_like', 'created_at']
