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
        return Response(status=status.HTTP_202_ACCEPTED)

    def patch(self, request):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_304_NOT_MODIFIED)


'''
Sample Json
{
    "id": 3,
    "comment": "댓글 수정",
    "commenter": 1,
    "video": 2
}
'''
