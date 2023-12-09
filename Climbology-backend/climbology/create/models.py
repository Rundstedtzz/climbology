from django.db import models
from django.contrib.auth.models import User

class BoardHolds(models.Model):
    x_coordinate = models.IntegerField(blank=True, null=True)
    y_coordinate = models.IntegerField(blank=True, null=True)
    type = models.CharField(max_length=50, blank=True)
    function = models.CharField(max_length=50, blank=True)
    depth = models.FloatField(blank=True, null=True)
    orientation = models.CharField(max_length=50, blank=True)
    size = models.FloatField(blank=True, null=True)

class Route(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, blank=True)
    grade = models.CharField(max_length=50, blank=True)
    angle = models.FloatField(blank=True, null=True)

class RouteHolds(models.Model):
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    board = models.ForeignKey(BoardHolds, on_delete=models.CASCADE)
    position_in_route = models.CharField(max_length=50, blank=True)
    foot_restriction = models.BooleanField(default=False)
