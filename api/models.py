from django.db import models
from django.contrib.postgres.indexes import GinIndex
from django.contrib.postgres.fields import ArrayField


class Attribute(models.Model):
    name = models.CharField(max_length=100, blank=False, default='')
    parent_attribute = models.ForeignKey('self', null=True, on_delete=models.CASCADE)
    description = models.CharField(max_length=200, null=True, default='')
    active = models.BooleanField(null=True, default=True)


class Product(models.Model):
    title = models.CharField(max_length=70, blank=False, default='')
    image = models.CharField(max_length=70, null=True)
    ref = models.CharField(max_length=20, unique=True)
    barcode = models.CharField(max_length=20, unique=True)
    description = models.CharField(max_length=200, null=True)
    published = models.BooleanField(null=True, default=False)
    attributes = ArrayField(models.IntegerField(), null=True)
    group_attributes = ArrayField(models.IntegerField(), null=True)
    selling_price = models.PositiveIntegerField(default=0, null=True)
    class Meta:
        indexes = [GinIndex(fields=['attributes', 'group_attributes'])]
