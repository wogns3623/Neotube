from django.shortcuts import render
from watch.models import Video


# Create your views here.
def guide(request):
    if request.method == 'GET':
        videos = Video.objects.all()

        return render(request, 'guide/guide.html', {
            'videos': videos
        })


