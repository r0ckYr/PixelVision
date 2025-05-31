# urls.py
from django.contrib.auth import views as auth_views
from django.urls import path

from . import views

urlpatterns = [
    # Authentication endpoints
    path("auth/login/", views.login_view, name="api_login"),
    path("auth/logout/", views.logout_view, name="api_logout"),
    path("signup/", views.sign_up, name="api_sign_up"),
    # Profile endpoints
    path("profile/", views.profile, name="api_profile"),
    # Image management endpoints
    path("upload/", views.upload_image, name="api_upload_image"),
    path("images/", views.images_list, name="api_images_list"),
    path("images/delete/<int:image_id>/", views.delete_image, name="api_delete_image"),
    path("process/<int:image_id>/", views.process_image, name="api_process_image"),
    # Chat endpoint
    path("chat/", views.chat_with_phi, name="api_chat_with_phi"),
    # Utility endpoints
    path("health/", views.health_check, name="api_health_check"),
    path("stats/", views.user_stats, name="api_user_stats"),
    # Password change endpoints (keeping Django's built-in views but returning JSON)
    path(
        "password_change/",
        auth_views.PasswordChangeView.as_view(
            template_name="registration/change_password.html"
        ),
        name="password_change",
    ),
    path(
        "password_change/done/",
        auth_views.PasswordChangeDoneView.as_view(
            template_name="registration/change_password_done.html"
        ),
        name="password_change_done",
    ),
]
