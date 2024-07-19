from django.db import migrations, models

def update_submitted_by(apps, schema_editor):
    FoodItem = apps.get_model('recipes', 'FoodItem')
    User = apps.get_model('auth', 'User')  # Adjust if necessary

    # Assuming you want to set submitted_by to None for existing records
    for food_item in FoodItem.objects.all():
        food_item.submitted_by = None  # Or set to a different user instance
        food_item.save()

class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0003_fooditem_submittedby_alter_user_email'),
    ]

    operations = [
        migrations.RunPython(update_submitted_by),
    ]
