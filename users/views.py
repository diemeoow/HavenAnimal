from django.contrib.auth.views import LoginView
from django.shortcuts import render

from .forms import LoginUserForm


class LoginUser(LoginView):
    form_class = LoginUserForm
    template_name = 'users/login.html'
    redirect_authenticated_user = 'home'