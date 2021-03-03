from django.db import models
from django.conf import settings
import json


# Create your models here.
class Video(models.Model):
    uploader = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # 채널명
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)  # 제목
    tag_set = models.ManyToManyField('Tag', blank=True)
    thumb_nail = models.ImageField(upload_to='thumbnail/%Y/%M/%D')
    video = models.FileField(upload_to='video/%Y/%M/%D')
    description = models.TextField()
    run_time = models.IntegerField()  # 영상 시간
    watch_count = models.IntegerField()  # 조회수
    created_at = models.DateTimeField(auto_now_add=True)  # 생성 시간
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.uploader}의 영상: {self.title}'

    def count_video_like(self):
        return VideoLike.objects.filter(video=self).count()

    def count_video_dis_like(self):
        return VideoDisLike.objects.filter(video=self).count()


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class VideoLike(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    video_liker = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('video', 'video_liker',)

    def __str__(self):
        return f'{self.video_liker}이 {self.video.title}을 좋아요 표시함.'

    def is_video_like(video, user):
        return len(VideoLike.objects.filter(video=video, video_liker=user)) == 1


class VideoDisLike(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    video_dis_liker = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('video', 'video_dis_liker',)

    def __str__(self):
        return f'{self.video_dis_liker}이 {self.video.title}을 싫어요 표시함.'


    def is_video_dis_like(video, user):
        return len(VideoDisLike.objects.filter(video=video, video_dis_liker=user)) == 1


class Category(models.Model):
    category = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.category
