from django.contrib import admin
from .models import Comment, CommentLike, CommentDisLike
# Register your models here.


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    pass


@admin.register(CommentLike)
class CommentLikeAdmin(admin.ModelAdmin):
    pass


@admin.register(CommentDisLike)
class CommentDisLikeAdmin(admin.ModelAdmin):
    pass
