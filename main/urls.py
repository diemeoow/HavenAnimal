from django.urls import path
from . import views

urlpatterns = [
    path('', views.MainPage.as_view(), name='home'),
    path('species/<slug:species_slug>', views.MainPage.as_view(), name='species_page')
]
