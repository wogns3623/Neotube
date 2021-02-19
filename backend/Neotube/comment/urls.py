from django.urls import path
from .views import CreateCommentAPIView, ModifyAPIView

urlpatterns = [
    # path('<int:pk>', )
    path('', CreateCommentAPIView.as_view(), name='comment'),
    # TODO 댓글 삭제, 수정 필요
    path('<int:pk>', ModifyAPIView.as_view(), name='modify'),
    # path('reply/<int:pk>') # TODO 대댓글을 작성해주는 View 구현
]
