from django.db import models
from account.models import Account


# Create your models here.
class Video(models.Model):
    uploader = models.ForeignKey(Account, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    tag_set = models.ManyToManyField('Tag', blank=True)
    video = models.FileField(upload_to='video/%Y/%M/%D')
    run_time = models.TimeField()
    watch_count = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.uploader.account_name}의 영상: {self.title}'


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class VideoLike(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    video_liker = models.ForeignKey(Account, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.video_liker.account_name}이 {self.video.title}을 좋아요 표시함.'


class VideoDisLike(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    video_dis_liker = models.ForeignKey(Account, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.video_dis_liker.account_name}이 {self.video.title}을 싫어요 표시함.'


class Comment(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    commenter = models.ForeignKey(Account, on_delete=models.CASCADE)
    comment = models.TextField()
    is_pinned_comment = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.video.title}의 댓글: {self.comment}'


class CommentLike(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    comment_liker = models.ForeignKey(Account, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.comment_liker.account_name}이 {self.comment.comment}을 좋아요 표시함.'


class CommentDisLike(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    comment_dis_liker = models.ForeignKey(Account, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.comment_dis_liker.account_name}이 {self.comment.comment}을 싫어요 표시함.'


## TODO 1: 대댓글 작성 시 Comment Table을 활용할 수 있는 방법이 있는가?
## TODO 2: 좋아요와 싫어요 테이블을 따로 저장할 것인가 Boolean 필드를 만들어 저장할 것인가?