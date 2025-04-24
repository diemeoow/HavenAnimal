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
        context['header_animal'] = self.request.GET.get('species')
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
        if age:
            if age != '7+':
                cards = cards.filter(age__gt=int(age[0])).filter(age__lte=int(age[-1]))
            else:
                cards = cards.filter(age__gte=7)

        return cards


def owner_page(request):
    return render(request, 'main/owner_page.html')