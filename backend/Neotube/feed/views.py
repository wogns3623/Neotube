from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from feed.models import Feed
from feed.serializers import FeedSerializer
# Create your views here.


class MainFeedAPIView(APIView):
    
    def get(self, request):
        if not request.user.is_anonymous:
            query_set = Feed.objects.filter(subscriber=request.user)
            serializer = FeedSerializer(query_set, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(None, status=status.HTTP_401_UNAUTHORIZED)
