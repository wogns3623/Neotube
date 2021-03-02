from django.db import models
from django.conf import settings


# Create your models here.
class Video(models.Model):
    uploader = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # 채널명
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)  # 제목
    tag_set = models.ManyToManyField('Tag', blank=True)
    thumb_nail = models.ImageField(upload_to='thumbnail/%Y/%M/%D')
    video = models.FileField(upload_to='video/%Y/%M/%D')
    run_time = models.IntegerField()  # 영상 시간
    watch_count = models.IntegerField()  # 조회수
    created_at = models.DateTimeField(auto_now_add=True)  # 생성 시간
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.uploader}의 영상: {self.title}'


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class VideoLike(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    video_liker = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.video_liker}이 {self.video.title}을 좋아요 표시함.'


class VideoDisLike(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    video_dis_liker = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.video_dis_liker}이 {self.video.title}을 싫어요 표시함.'


class Comment(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    commenter = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    comment = models.TextField()
    is_pinned_comment = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.video.title}의 댓글: {self.comment}'


class CommentLike(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    comment_liker = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.comment_liker}이 {self.comment.comment}을 좋아요 표시함.'


class CommentDisLike(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    comment_dis_liker = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.comment_dis_liker}이 {self.comment.comment}을 싫어요 표시함.'


class Category(models.Model):
    category = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.category