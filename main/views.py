from django.shortcuts import render
from django.views.generic import ListView

def main_page(request):
    return render(request, 'main/main_page.html')
