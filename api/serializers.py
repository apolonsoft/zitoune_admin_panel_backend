from rest_framework import serializers
from api.models import Attribute, Product


class ParentAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attribute
        fields = ('id',
                  'name',
                  'description',
                  'active')


class AttributeSerializer(serializers.ModelSerializer):
    parent_attribute = ParentAttributeSerializer(many=False, read_only=True)

    class Meta:
        model = Attribute
        fields = ('id',
                  'parent_attribute',
                  'name',
                  'description',
                  'active')


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id',
                  'title',
                  'ref',
                  'barcode',
                  'description',
                  'attributes',
                  'group_attributes',
                  'selling_price',
                  'published')
