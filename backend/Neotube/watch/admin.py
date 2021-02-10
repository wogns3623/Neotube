from django.contrib import admin
from .models import Video, VideoLike, VideoDisLike, Category, Tag, Comment, CommentLike, CommentDisLike


# Register your models here.
@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    pass


@admin.register(VideoLike)
class VideoLikeAdmin(admin.ModelAdmin):
    pass


@admin.register(VideoDisLike)
class VideoDisLikeAdmin(admin.ModelAdmin):
    pass


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    pass


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    pass


@admin.register(CommentLike)
class CommentLikeAdmin(admin.ModelAdmin):
    pass


@admin.register(CommentDisLike)
class CommentDisLikeAdmin(admin.ModelAdmin):
    pass