from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.home, name='home'),
    path('landing/', views.landing, name='landing'),
    path('profile/', views.profile, name='profile'),
    path('about/', views.about, name='about'),
    path('images/', views.images, name='images'),
    path('images/delete/<int:image_id>/', views.delete_image, name='delete_image'),
    path('signup/', views.sign_up, name='sign_up'),
    path('upload/', views.upload_image, name='upload_image'),
    path('process/<int:image_id>/', views.process_image, name='process_image'),
    path('password_change/', auth_views.PasswordChangeView.as_view(template_name='registration/change_password.html'), name='password_change'),
    path('password_change/done/', auth_views.PasswordChangeDoneView.as_view(template_name='registration/change_password_done.html'), name='password_change_done'),
]