from django.db.models import fields
from rest_framework import serializers
from .models import Video, Tag
from user.serializers import UserSerializer


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name']


class SimpleVideoSerializer(serializers.ModelSerializer):
    uploader = UserSerializer()

    class Meta:
        model = Video
        fields = ['id', 'uploader', 'title', 'thumb_nail',
                  'video', 'run_time', 'watch_count', 'created_at']


class VideoSerializer(serializers.ModelSerializer):
    # ! Default로 모델들의 이름이 정의가 되어있음.
    user = serializers.ReadOnlyField(source='user.username')
    category = serializers.CharField(source='category.category')
    uploader = UserSerializer()
    tag_set = TagSerializer(many=True)

    class Meta:
        model = Video
        # fields = '__all__'
        fields = ['id', 'user', 'uploader', 'category', 'title', 'tag_set', 'thumb_nail', 'video', 'description',
                  'run_time', 'watch_count', 'count_video_like', 'count_video_dis_like', 'created_at']
