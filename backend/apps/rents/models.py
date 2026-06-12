from django.db import models
from django.conf import settings


class Reservation(models.Model):
    reservation_id = models.AutoField(primary_key=True)
    pickup_location = models.CharField(max_length=100)
    dropoff_location = models.CharField(max_length=100)
    pickup_date = models.DateField()
    dropoff_date = models.DateField()
    pickup_time = models.TimeField()
    dropoff_time = models.TimeField()

    # Datos del cliente (si no está registrado)
    reservation_firstname = models.CharField(max_length=100)
    reservation_secondname = models.CharField(max_length=100, blank=True, null=True)
    reservation_lastname = models.CharField(max_length=100)
    reservation_second_lastname = models.CharField(
        max_length=100, blank=True, null=True
    )
    reservation_dateofbirth = models.DateField()
    reservation_cedula = models.CharField(max_length=30)
    reservation_email = models.EmailField()
    reservation_phone = models.CharField(max_length=20)
    reservation_address = models.CharField(max_length=255)
    reservation_genre = models.CharField(max_length=50)

    # Datos de licencia
    license_number = models.CharField(max_length=50)
    license_expiry_date = models.DateField()
    license_country = models.CharField(max_length=50)

    # Estado y timestamps
    reservation_status = models.CharField(max_length=30)
    reservation_created = models.DateTimeField(auto_now_add=True)
    reservation_updated = models.DateTimeField(auto_now=True)

    # Relaciones
    user = models.ForeignKey(
        "users.User", on_delete=models.SET_NULL, null=True, blank=True
    )
    vehicle = models.ForeignKey("vehicles.Vehicle", on_delete=models.CASCADE)

    def __str__(self):
        return f"Reserva #{self.reservation_id} - {self.pickup_date} - {self.reservation_firstname}"
