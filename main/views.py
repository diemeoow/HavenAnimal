from django.shortcuts import render
from django.views.generic import ListView

from .models import AnimalCardModel, SpeciesModel, BreedModel


class MainPage(ListView):
    model = AnimalCardModel
    template_name = "main/main_page.html"
    context_object_name = 'cards'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['breeds'] = BreedModel.objects.all()
        return context

    def get_queryset(self):
        cards = AnimalCardModel.objects.all()

        species_slug = self.request.GET.get('species')
        gender = self.request.GET.get('gender')
        breed_slug = self.request.GET.get('breed')
        age = self.request.GET.get('age')

        if gender:
            cards = cards.filter(gender=gender)
        if breed_slug:
            cards = cards.filter(breed__slug=breed_slug)
        if species_slug:
            cards = cards.filter(species__slug=species_slug)
        if age: # улучшить
            if age == '1':
                cards = cards.filter(age__lte=1)
            elif age == '1-3':
                cards = cards.filter(age__gt=1).filter(age__lte=3)
            elif age == '3-7':
                cards = cards.filter(age__gt=3).filter(age__lte=7)
            else:
                cards = cards.filter(age__gt=7)

        return cards