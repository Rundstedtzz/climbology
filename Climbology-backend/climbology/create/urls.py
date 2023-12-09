from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('identify_hold/', views.identify_hold, name='identify_hold'),
    path('create_route/', views.create_route, name='create_route')
]