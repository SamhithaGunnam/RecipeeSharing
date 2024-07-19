# recipes/admin.py

from django.contrib import admin
from .models import FoodItem, RecipeDetail

# Register your models here
admin.site.register(FoodItem)
admin.site.register(RecipeDetail)
