from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from video.models import Video
from video.serializers import SimpleVideoSerializer
from .pagination import PaginationHandlerMixin
# Create your views here.


class BasicPagination(PageNumberPagination):
    page_size_query_param = 'limit'


class GuideAPIView(APIView):

    def get(self, request):
        query_set = Video.objects.all()[:20]
        serializer = SimpleVideoSerializer(query_set, many=True)
        return Response(serializer.data)


class BrowseAPIView(APIView, PaginationHandlerMixin):
    pagination_class = BasicPagination
    serializer_class = SimpleVideoSerializer

    def get(self, request):
        query_set = Video.objects.all()
        page = self.paginate_queryset(queryset=query_set)
        serializer = self.get_paginated_response(
            self.serializer_class(page,  many=True).data)
        return Response(serializer.data, status=status.HTTP_200_OK)
