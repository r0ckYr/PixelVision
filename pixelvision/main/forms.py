from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Image

class RegisterForm(UserCreationForm):
    email = forms.EmailField(required=True)
    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2"]


class UpdateProfileForm(forms.ModelForm):
    username = forms.CharField(required=True)
    email = forms.EmailField(required=True)
    class Meta:
        model = User
        fields = ["username", "email"]


class ImageUploadForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ['ImageFile']



