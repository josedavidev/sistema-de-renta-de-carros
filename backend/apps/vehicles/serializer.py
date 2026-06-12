from rest_framework import serializers
from .models import Vehicle, VehicleCategory, VehicleStatus


class VehicleCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleCategory
        fields = ["category_id", "category_name", "category_description"]


class VehicleStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleStatus
        fields = ["status_id", "status_name", "status_description"]


class VehicleSerializer(serializers.ModelSerializer):
    category = VehicleCategorySerializer(read_only=True)
    status = VehicleStatusSerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=VehicleCategory.objects.all(), source="category", write_only=True
    )
    status_id = serializers.PrimaryKeyRelatedField(
        queryset=VehicleStatus.objects.all(), source="status", write_only=True
    )

    class Meta:
        model = Vehicle
        fields = [
            "vehicle_id",
            "vehicle_license_plate",
            "vehicle_brand",
            "vehicle_model",
            "vehicle_year",
            "vehicle_color",
            "vehicle_seats",
            "vehicle_doors",
            "vehicle_engine_type",
            "vehicle_transmission",
            "vehicle_mileage",
            "vehicle_score",
            "vehicle_hour_rate",
            "vehicle_location",
            "vehicle_description",
            "vehicle_image",
            "vehicle_created",
            "vehicle_updated",
            "category",  # anidado (solo lectura)
            "status",  # anidado (solo lectura)
            "category_id",  # para creación (solo escritura)
            "status_id",  # para creación (solo escritura)
        ]
