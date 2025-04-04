from django import template

from main.models import SpeciesModel

register = template.Library()

@register.inclusion_tag('includes/dogs_species.html')
def dogs_species_url():
    dogs = SpeciesModel.objects.get(id=1)
    return {'dogs': dogs}

@register.inclusion_tag('includes/cats_species.html')
def cats_species_url():
    cats = SpeciesModel.objects.get(id=2)
    return {'cats': cats}