from tkinter.font import names

from django.urls import path
from . import views

urlpatterns = [
    path('', views.MainPage.as_view(), name='home'),
    path('owner', views.OwnerPage.as_view(), name='owner'),
    path('reservation_animal/<slug:card_slug>/', views.ReservationAnimal.as_view(), name='reservation'),
]