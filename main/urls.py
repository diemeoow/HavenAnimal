from tkinter.font import names

from django.urls import path
from . import views

urlpatterns = [
    path('', views.MainPage.as_view(), name='home'),
]