from django.shortcuts import render
from rest_framework.serializers import Serializer
from rest_framework.response import Response
from rest_framework.views import APIView
from video.models import Video
from video.serializers import VideoSerializer

# Create your views here.


class WatchVideoView(APIView):

    def post(self, request, pk):
        query_set = Video.objects.get(pk=pk)
        serializer = VideoSerializer(query_set)
        return Response(serializer.data)
