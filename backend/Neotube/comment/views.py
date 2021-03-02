from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from comment.models import Comment
from .serializers import CommentSerializer
# Create your views here.


class CreateCommentAPIView(APIView):
    def post(self, request):
        # * 프론트에서 백엔드에 로그인 요청
        # ? 백엔드에서 구글에 로그인 요청(구글 View: Redirect POPUP)
        # * 위 작업이 완료가 되면 그때 백엔드에서 다시 Acecces Token 반환
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ModifyAPIView(APIView):
    # TODO 댓글 수정 및 삭제 요청 처리하기
    def delete(self, pk):
        comment = Comment.objects.get(pk=pk)
        comment.delete()
        return Response(status=status.HTTP_202_ACCEPTED)

    def patch(self, request, pk):
        tmp_data = request.data
        tmp_data['id'] = pk
        print(tmp_data)
        serializer = CommentSerializer(data=tmp_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_304_NOT_MODIFIED)


'''
# ! Sample Json POST
{
    "comment": "새로운 댓글",
    "commenter": 1,
    "video": 2
}

# ! Sample Json DELETE

{
    "id": 3,
    "comment": "댓글 삭제",
    "commenter": 1,
    "video": 2
}

# ! Sample Json PATCH
{
    "id": 3,
    "comment": "댓글 수정",
    "commenter": 1,
    "video": 2
}
'''
