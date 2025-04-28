from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView

from .forms import ReservationAnimalForm
from .models import AnimalCardModel, SpeciesModel, BreedModel, BookModel


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
        cards = AnimalCardModel.objects.filter(animal_reservation=False)

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


class OwnerPage(ListView):
    model = BookModel
    template_name = "main/owner_page.html"
    context_object_name = 'reservations'


class ReservationAnimal(CreateView):
    form_class = ReservationAnimalForm
    template_name = "main/reservation_animal.html"
    success_url = reverse_lazy('home')

    def get_animal_card(self):
        return get_object_or_404(AnimalCardModel, slug=self.kwargs.get('card_slug'))

    def form_valid(self, form):
        animal_card = self.get_animal_card()
        form.instance.animal_card = animal_card
        animal_card.animal_reservation = True
        animal_card.save()
        return super().form_valid(form)

    def dispatch(self, request, *args, **kwargs):
        if self.get_animal_card().animal_reservation is True:
            return HttpResponseRedirect(reverse_lazy('home'))
        return super().dispatch(request, *args, **kwargs)