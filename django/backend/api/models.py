from django.db import models

# Create your models here.
from django.db import models

class Product_table(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='images/')  # Use an image field
