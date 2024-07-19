from django.db import migrations, models

def update_submitted_by(apps, schema_editor):
    FoodItem = apps.get_model('recipes', 'FoodItem')
    
    # Update submitted_by field for existing records
    for food_item in FoodItem.objects.all():
        # Set submitted_by to a valid user instance if needed, or set to None
        food_item.submitted_by = None  # Replace with the appropriate user instance if available
        food_item.save()

class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0010_merge_0008_auto_20240715_1705_0009_auto_20240715_1724'),
    ]

    operations = [
        migrations.RunPython(update_submitted_by),
    ]
