from django.contrib import admin

from .models import AnimalCardModel, SpeciesModel, BreedModel, AnimalPhotoModel, BookModel

admin.site.register(AnimalCardModel)
admin.site.register(AnimalPhotoModel)
admin.site.register(BookModel)

@admin.register(SpeciesModel)
class SpeciesAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    prepopulated_fields = {"slug": ('name', )}
    list_display_links = ('id', 'name')
    ordering = ['id']

@admin.register(BreedModel)
class BreedAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    prepopulated_fields = {"slug": ('name', )}
    list_display_links = ('id', 'name')
    ordering = ['id']

