from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from comment.models import Comment
from .serializers import CommentSerializer
# Create your views here.


class CommentAPIView(APIView):

    def post(self, request):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        comment = Comment.objects.get(pk=request.data['id'])
        comment.delete()
        # TODO 요청응답 300??? 등의 요청 반환
        return Response(status=status.HTTP_202_ACCEPTED)

    def patch(self, request):
        number = 1
        # TODO reuqest에서 댓글 pk 받아 오기
        # TODO request에서 받아온 댓글 pk를 DB에서 검색 ex) temp = Comment.objects.get(pk=number)
        # TODO reqeust에서 받아온 댓글 pk를 통해 댓글 수정 ex) temp.comment(reqeust['comment'])
        return Response()  # TODO 요청응답 300??? 등의 요청 반환
