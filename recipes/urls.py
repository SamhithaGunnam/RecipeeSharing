from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from recipes.views import food_items_api_view, create_food_item, recipe_detail_api_view, register_user, user_list_api_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/food_items/', food_items_api_view, name='food_items_api'),
    path('api/create_food_item/', create_food_item, name='create_food_item'),
    path('api/recipe_detail/<int:food_item_id>/', recipe_detail_api_view, name='recipe_detail_api'),
    path('api/register/', register_user, name='register-user'),
    path('api/users/', user_list_api_view, name='user-list-api'),  # Ensure this line is present
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
]

# Static and media URL patterns
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)