from rest_framework.response import Response
from rest_framework.views import APIView
from backend.Neotube.comment.models import Comment
# Create your views here.


class CommentAPIView(APIView):

    def post(self, request):
        # TODO request에서 댓글을 받아오는 메서드 (POST 방식)
        # TODO request에서 받은 댓글을 작성하는(: 댓글 데이터를 생성하는) 메서드
        return Response()  # TODO 요청응답 URL 200, 201 등의 요청 반환

    def delete(self, request):
        number = 1
        # TODO reuqest에서 댓글 pk 받아 오기
        # TODO request에서 받아온 댓글 pk를 DB에서 검색 ex) temp = Comment.objects.get(pk=number)
        # TODO reqeust에서 받아온 댓글 pk를 통해 삭제 ex) temp.delete()
        return Response()  # TODO 요청응답 300??? 등의 요청 반환

    def patch(self, request):
        number = 1
        # TODO reuqest에서 댓글 pk 받아 오기
        # TODO request에서 받아온 댓글 pk를 DB에서 검색 ex) temp = Comment.objects.get(pk=number)
        # TODO reqeust에서 받아온 댓글 pk를 통해 댓글 수정 ex) temp.comment(reqeust['comment'])
        return Response()  # TODO 요청응답 300??? 등의 요청 반환
