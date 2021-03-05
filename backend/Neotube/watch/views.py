from rest_framework.pagination import PageNumberPagination
from rest_framework.serializers import Serializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from video.models import Video, VideoLike, VideoDisLike
from feed.models import Feed
from video.serializers import VideoSerializer, SimpleVideoSerializer
from Neotube.pagination import PaginationHandlerMixin
# Create your views here.

class BasicPagination(PageNumberPagination):
    page_size_query_param = 'limit'


class WatchVideoView(APIView):
    # permission_classes = (IsAuthenticated, )

    def get(self, request, pk):
        if not request.user.is_anonymous:
            # ! 만약 유저가 로그인 되어 있는 상태라면 구독 및 좋아요 정보를 넘겨준다.
            video = Video.objects.get(pk=pk)
            is_subscribe = Feed.is_subscribe(video.uploader, request.user)
            is_video_like = VideoLike.is_video_like(video, request.user)
            is_video_dis_like = VideoDisLike.is_video_dis_like(video, request.user)
            user_dict = {"user_status": {"is_subscribe": is_subscribe, "is_video_like": is_video_like, "is_video_dis_like": is_video_dis_like}}

        else:
            user_dict = {}

        query_set = Video.objects.get(pk=pk)
        if query_set:
            serializer = VideoSerializer(query_set)
            user_dict.update(serializer.data)
            return Response(user_dict, status=status.HTTP_200_OK)
        else:
            return Response(None, status=status.HTTP_400_BAD_REQUEST)


class WatchNextAPIView(APIView, PaginationHandlerMixin):
    pagination_class = BasicPagination
    serializer_class = SimpleVideoSerializer

    def get(self, request, pk):
        query_set = Video.objects.all()
        page = self.paginate_queryset(queryset=query_set)
        serializer = self.get_paginated_response(
            self.serializer_class(page,  many=True).data)
        return Response(serializer.data, status=status.HTTP_200_OK)

