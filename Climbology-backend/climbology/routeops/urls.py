from django.urls import path
from . import views

urlpatterns = [
    path("update_hold/", views.update_hold, name="update_hold"),
    path("delete_hold/", views.delete_hold, name="delete_hold"),
    path("update_move/", views.update_move, name="update_move"),
    path("delete_move/", views.delete_move, name="delete_move"),
    path("find_holds_by_property/", views.find_holds_by_property, name="find_holds_by_property"),
    path("find_moves_by_property/", views.find_moves_by_property, name="find_moves_by_property"),
]