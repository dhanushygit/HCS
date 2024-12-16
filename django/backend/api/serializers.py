from rest_framework import serializers
from .models import Product_table

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_table
        fields = '__all__'
