from rest_framework import permissions, renderers, viewsets
from api.models import Attribute, Product
from api.serializers import AttributeSerializer, ProductSerializer


class AttributeViewSet(viewsets.ModelViewSet):
    queryset = Attribute.objects.all()
    serializer_class = AttributeSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
