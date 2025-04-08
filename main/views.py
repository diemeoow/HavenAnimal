from django.shortcuts import render
from django.views.generic import ListView

from .models import AnimalCardModel, SpeciesModel


class MainPage(ListView):
    model = AnimalCardModel
    template_name = "main/main_page.html"
    context_object_name = 'cards'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

    def get_queryset(self):
        species_slug = self.kwargs.get('species_slug')
        gender = self.kwargs.get('gender')
        if gender:
            cards = AnimalCardModel.objects.filter(gender=gender)
        else:
            cards = AnimalCardModel.objects.all()
        if species_slug:
            cards = cards.filter(species__slug__exact=species_slug)
        return cards