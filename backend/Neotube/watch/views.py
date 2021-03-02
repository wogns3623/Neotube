from rest_framework.pagination import PageNumberPagination
from rest_framework.serializers import Serializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from video.models import Video
from video.serializers import VideoSerializer, SimpleVideoSerializer
from Neotube.pagination import PaginationHandlerMixin
# Create your views here.

class BasicPagination(PageNumberPagination):
    page_size_query_param = 'limit'


class WatchVideoView(APIView):

    def get(self, request, pk):
        pass


class WatchNextAPIView(APIView, PaginationHandlerMixin):
    pagination_class = BasicPagination
    serializer_class = SimpleVideoSerializer

    def get(self, request, pk):
        query_set = Video.objects.all()
        page = self.paginate_queryset(queryset=query_set)
        serializer = self.get_paginated_response(
            self.serializer_class(page,  many=True).data)
        return Response(serializer.data, status=status.HTTP_200_OK)

