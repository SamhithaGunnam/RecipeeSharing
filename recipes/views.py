from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import FoodItem, RecipeDetail
from .serializers import FoodItemSerializer, RecipeDetailSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([AllowAny])
def user_list_api_view(request):
    try:
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    except Exception as e:
        print(f'Error fetching users: {e}')  # Debug print
        return Response({'error': 'Failed to fetch users'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([AllowAny])
def food_items_api_view(request):
    try:
        food_items = FoodItem.objects.all()
        serializer = FoodItemSerializer(food_items, many=True)
        return Response(serializer.data)
    except Exception as e:
        print(f'Error fetching food items: {e}')  # Debug print
        return Response({'error': 'Failed to fetch food items'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([AllowAny])
def recipe_detail_api_view(request, food_item_id):
    try:
        food_item = FoodItem.objects.get(pk=food_item_id)
        recipe_detail = food_item.recipe_detail
        serializer = RecipeDetailSerializer(recipe_detail)
        return Response(serializer.data)
    except FoodItem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except RecipeDetail.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([AllowAny])
def create_food_item(request):
    serializer = FoodItemSerializer(data=request.data)
    if serializer.is_valid():
        # If submitted_by is not required, you can either set it to None or handle it based on the use case.
        serializer.save(submitted_by=None)  # or exclude 'submitted_by' if not needed
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)