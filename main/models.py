from django.db import models
from django.urls import reverse
from django.utils.http import urlencode


class SpeciesModel(models.Model):
    name = models.CharField(max_length=100, verbose_name="Вид")
    slug = models.SlugField(max_length=255, unique=True, db_index=True) # прописать slugify

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Вид'
        verbose_name_plural = 'Виды'
        ordering = ['name']

    def get_absolute_url(self):
        base_url = reverse('home')  # маршрут на главную
        query_string = urlencode({'species': self.slug})
        return f'{base_url}?{query_string}'


class BreedModel(models.Model):
    name = models.CharField(max_length=100, null=False, verbose_name="Порода")
    slug = models.SlugField(max_length=255, unique=True, db_index=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Порода'
        verbose_name_plural = 'Породы'
        ordering = ['name']

    def get_absolute_url(self):
        return reverse('breed_slug', kwargs={'breed_slug': self.slug})


class AnimalCardModel(models.Model):
    class GenderAnimal(models.TextChoices):
        MALE = 'male'
        FEMALE = 'female'

    name = models.CharField(max_length=100, blank=False, null=True, verbose_name="Имя животного")
    age = models.FloatField(null=True, blank=True, verbose_name="Возраст")
    description = models.TextField(max_length=500, blank=False, null=True, verbose_name="Описание")
    species = models.ForeignKey(SpeciesModel, on_delete=models.SET_NULL, null=True, related_name="species", verbose_name="Вид")
    breed = models.ForeignKey(BreedModel, on_delete=models.SET_NULL, null=True, related_name="breed", verbose_name="Порода")
    animal_reservation = models.BooleanField(default=False, verbose_name="Бронь")
    gender = models.CharField(max_length=6, choices=GenderAnimal.choices, blank=False, null=True, verbose_name="Гендер")
    number_animal_cage = models.PositiveIntegerField(verbose_name="Номер вольера")
    slug = models.SlugField(max_length=255, unique=True, db_index=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Карточка животного'
        verbose_name_plural = 'Карточки животных'
        ordering = ['name']


class AnimalPhotoModel(models.Model):
    photo = models.ImageField(upload_to="photo/%Y/%m/%d/", verbose_name="Фотография")
    animal_card = models.ForeignKey(AnimalCardModel, on_delete=models.SET_NULL, null=True, related_name="photos")

    def __str__(self):
        return self.animal_card.name

    class Meta:
        verbose_name = 'Фотография'
        verbose_name_plural = 'Фотографии'
        ordering = ['animal_card']


class BookModel(models.Model):
    master_name = models.CharField(max_length=100, blank=False, null=True, verbose_name="Имя хозяина")
    phone_number = models.CharField(max_length=20, unique=True, blank=False, null=True, verbose_name="Номер телефона")
    animal_card = models.ForeignKey(AnimalCardModel, on_delete=models.SET_NULL, null=True, related_name="book")
    date = models.DateField(null=True, blank=False, verbose_name="Дата бронивания")

    def __str__(self):
        return f"{self.date}"

    class Meta:
        verbose_name = 'Бронирование'
        verbose_name_plural = 'Бронирование'
        ordering = ['date']