from django.db import models
from django.contrib.auth.models import User

class FoodItem(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='food_images/')
    submitted_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class RecipeDetail(models.Model):
    food_item = models.OneToOneField(FoodItem, related_name='recipe_detail', on_delete=models.CASCADE)
    ingredients = models.TextField()
    how_to_make = models.TextField()

    def __str__(self):
        return f"Recipe for {self.food_item.name}"

    @property
    def recipe_image(self):
        return self.food_item.image.url if self.food_item.image else None

    @property
    def food_item_name(self):
        return self.food_item.name
