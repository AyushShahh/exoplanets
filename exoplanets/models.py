from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator


class User(AbstractUser):
    grade = models.PositiveSmallIntegerField(validators=[MaxValueValidator(14), MinValueValidator(1)], null=False, blank=False)
    city = models.CharField(max_length=20, null=False, blank=False)
    country = models.CharField(max_length=20, null=False, blank=False)
    REQUIRED_FIELDS = ['grade', 'city', 'country']


class Category(models.Model):
    name = models.CharField(max_length=20, null=False, blank=False)


class Blog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blogs', null=False, blank=False)
    timestamp = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='blogs')
    body = models.TextField(null=False, blank=False)

