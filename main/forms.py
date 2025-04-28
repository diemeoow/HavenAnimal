
from django import forms
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator
from django.utils import timezone

from .models import BookModel

def validate_not_past_date(value):
    if value < timezone.now().date():
        raise ValidationError('Дата не может быть в прошлом.')


class ReservationAnimalForm(forms.ModelForm):
    date = forms.DateField(label='Дата бронивания', validators=[validate_not_past_date])
    class Meta:
        model = BookModel
        fields = ['master_name', 'phone_number', 'date']
