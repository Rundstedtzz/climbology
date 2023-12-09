from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("signup/", views.register_user, name="register"),
    path("login/", views.login_user, name="login")
]