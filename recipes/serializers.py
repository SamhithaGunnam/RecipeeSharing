from rest_framework import serializers
from django.contrib.auth.models import User
from .models import FoodItem, RecipeDetail

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'confirm_password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        confirm_password = validated_data.pop('confirm_password')
        if password != confirm_password:
            raise serializers.ValidationError("Passwords do not match")
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user

class RecipeDetailSerializer(serializers.ModelSerializer):
    recipe_image = serializers.SerializerMethodField()
    food_item_name = serializers.ReadOnlyField(source='food_item.name')

    class Meta:
        model = RecipeDetail
        fields = ['ingredients', 'how_to_make', 'recipe_image', 'food_item_name']

    def get_recipe_image(self, obj):
        if obj.food_item and obj.food_item.image:
            return obj.food_item.image.url
        return None

class FoodItemSerializer(serializers.ModelSerializer):
    recipe_detail = RecipeDetailSerializer()
    submitted_by = UserSerializer()

    class Meta:
        model = FoodItem
        fields = ['id', 'name', 'description', 'image', 'submitted_by', 'recipe_detail']

    def create(self, validated_data):
        recipe_data = validated_data.pop('recipe_detail', {})
        submitted_by_data = validated_data.pop('submitted_by', {})

        username = submitted_by_data.get('username')
        password = submitted_by_data.get('password')
        confirm_password = submitted_by_data.get('confirm_password')

        if password != confirm_password:
            raise serializers.ValidationError("Passwords do not match")

        user, created = User.objects.get_or_create(username=username)
        if created or password:
            user.set_password(password)
            user.save()

        food_item = FoodItem.objects.create(submitted_by=user, **validated_data)
        RecipeDetail.objects.create(food_item=food_item, **recipe_data)

        return food_item

    def update(self, instance, validated_data):
        recipe_data = validated_data.pop('recipe_detail', {})
        submitted_by_data = validated_data.pop('submitted_by', {})

        if submitted_by_data:
            username = submitted_by_data.get('username')
            password = submitted_by_data.get('password')
            confirm_password = submitted_by_data.get('confirm_password')

            if password != confirm_password:
                raise serializers.ValidationError("Passwords do not match")

            user = instance.submitted_by
            user.username = username
            if password:
                user.set_password(password)
            user.save()

        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.image = validated_data.get('image', instance.image)
        instance.save()

        if recipe_data:
            recipe_detail, created = RecipeDetail.objects.get_or_create(food_item=instance)
            recipe_detail.ingredients = recipe_data.get('ingredients', recipe_detail.ingredients)
            recipe_detail.how_to_make = recipe_data.get('how_to_make', recipe_detail.how_to_make)
            recipe_detail.save()

        return instance