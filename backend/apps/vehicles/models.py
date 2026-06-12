from django.db import models


class VehicleCategory(models.Model):
    category_id = models.AutoField(primary_key=True)
    category_name = models.CharField(max_length=100)
    category_description = models.TextField(blank=True)

    def __str__(self):
        return self.category_name


class VehicleStatus(models.Model):
    status_id = models.AutoField(primary_key=True)
    status_name = models.CharField(max_length=100)
    status_description = models.TextField(blank=True)

    def __str__(self):
        return self.status_name


class Vehicle(models.Model):
    vehicle_id = models.AutoField(primary_key=True)
    vehicle_license_plate = models.CharField(max_length=10, unique=True)
    vehicle_brand = models.CharField(max_length=100)
    vehicle_model = models.CharField(max_length=100)
    vehicle_year = models.PositiveIntegerField()
    vehicle_color = models.CharField(max_length=50)
    vehicle_seats = models.PositiveIntegerField()
    vehicle_doors = models.PositiveIntegerField()
    vehicle_engine_type = models.CharField(max_length=100)
    vehicle_transmission = models.CharField(max_length=100)
    vehicle_mileage = models.PositiveIntegerField()
    vehicle_score = models.DecimalField(
        max_digits=3, decimal_places=1, blank=True, null=True
    )
    vehicle_hour_rate = models.DecimalField(max_digits=8, decimal_places=2)
    vehicle_location = models.CharField(max_length=100)
    vehicle_description = models.TextField(blank=True)
    vehicle_image = models.JSONField()
    vehicle_created = models.DateTimeField(auto_now_add=True)
    vehicle_updated = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(VehicleCategory, on_delete=models.CASCADE)
    status = models.ForeignKey(VehicleStatus, on_delete=models.CASCADE)

    def __str__(self):
        return (
            f"{self.vehicle_brand} {self.vehicle_model} ({self.vehicle_license_plate})"
        )
