from django.db import models
from django.conf import settings

from video.models import Video
# Create your models here.


class Comment(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    reply_comment = models.ForeignKey(
        'self', on_delete=models.CASCADE, related_name='reply', null=True)
    commenter = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    comment = models.TextField()
    is_pinned_comment = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.video.title}의 댓글: {self.comment}'

    def count_comment_like(self):
        return CommentLike.objects.filter(comment=self).count()

    def count_comment_dis_like(self):
        return CommentDisLike.objects.filter(comment=self).count()


class CommentLike(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    comment_liker = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('comment', 'comment_liker')

    def __str__(self):
        return f'{self.comment_liker}이 {self.comment.comment}을 좋아요 표시함.'


class CommentDisLike(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    comment_dis_liker = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('comment', 'comment_dis_liker')

    def __str__(self):
        return f'{self.comment_dis_liker}이 {self.comment.comment}을 싫어요 표시함.'
