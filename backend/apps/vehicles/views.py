from rest_framework.generics import ListAPIView
from .models import Vehicle, VehicleCategory, VehicleStatus
from .serializer import (
    VehicleSerializer,
    VehicleCategorySerializer,
    VehicleStatusSerializer,
)
from rest_framework import viewsets


class VehicleCategoryView(viewsets.ModelViewSet):
    serializer_class = VehicleCategorySerializer
    queryset = VehicleCategory.objects.all()


class VehicleStatusView(viewsets.ModelViewSet):
    serializer_class = VehicleStatusSerializer
    queryset = VehicleStatus.objects.all()


class VehicleView(viewsets.ModelViewSet):
    serializer_class = VehicleSerializer
    queryset = Vehicle.objects.all()
