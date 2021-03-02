from django.db.models import fields
from rest_framework import serializers

from user.models import SocialLoginUser
from video.models import Video
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        # fields = ('video', 'commenter', 'comment')        # ! 생성
        fields = ('id', 'video', 'commenter', 'comment')  # ! 수정
