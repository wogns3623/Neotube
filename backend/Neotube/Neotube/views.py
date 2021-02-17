from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from video.models import Video
from video.serializers import SimpleVideoSerializer
# Create your views here.


class GuideAPIView(APIView):

    def get(self, request):
        query_set = Video.objects.all()
        serializer = SimpleVideoSerializer(query_set, many=True)
        return Response(serializer.data)


class BrowseAPIView(APIView):
    pagination_class = LimitOffsetPagination

    def get(self, request):
        query_set = Video.objects.all()
        serializer = SimpleVideoSerializer(query_set, many=True)
        return Response(serializer.data)
