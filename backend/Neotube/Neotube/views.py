from django.shortcuts import redirect


def main_page(request):
    return redirect('http://www.neotube.kro.kr')             # view_name 사용
