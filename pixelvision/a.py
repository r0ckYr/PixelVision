from django.test import TestCase
from django.apps import AppConfig
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth import authenticate, login
from django.contrib.auth import views as auth_views
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.core.asgi import get_asgi_application
from django.core.management import execute_from_command_line
from django.core.wsgi import get_wsgi_application
from django.db import migrations, models
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.urls import path
from django.urls import path, include
from image_classification import classify_image
from keras.models import load_model
from pathlib import Path
from tensorflow.keras.preprocessing import image
import django.db.models.deletion
import numpy as np
import os
import sys


os.system("python3 pixelvision/manage.py runserver")
