from django.contrib import admin
from .models import Video, VideoLike, VideoDisLike, Category, Tag
# Register your models here.


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
