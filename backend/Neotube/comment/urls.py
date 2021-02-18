from django.urls import path
from .views import CommentAPIView

urlpatterns = [
    # path('<int:pk>', ) # TODO 댓글 목록을 작성해주는 View 구현
    path('', CommentAPIView.as_view(), name='comment'),
    # path('reply/<int:pk>') # TODO 대댓글을 작성해주는 View 구현
]
