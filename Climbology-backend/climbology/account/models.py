from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    gender = models.CharField(max_length=50, blank=True)
    height = models.FloatField(blank=True, null=True)
    weight = models.FloatField(blank=True, null=True)
    wingspan = models.FloatField(blank=True, null=True)
    ape_index = models.FloatField(blank=True, null=True)
    num_pull_ups = models.IntegerField(blank=True, null=True)
    num_chin_ups = models.IntegerField(blank=True, null=True)
    num_push_ups = models.IntegerField(blank=True, null=True)
    climbing_style = ArrayField(models.CharField(max_length=100), blank=True, null=True)
    fav_climbing_discipline = ArrayField(models.CharField(max_length=100), blank=True, null=True)
    fav_wall_type = ArrayField(models.CharField(max_length=100), blank=True, null=True)

    def __str__(self):
        return self.user.username