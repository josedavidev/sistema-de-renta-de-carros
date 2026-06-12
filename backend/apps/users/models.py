from django.db import models
from django.utils import timezone


class Role(models.Model):
    role_id = models.AutoField(primary_key=True)
    role_name = models.CharField(max_length=50, unique=True)
    role_description = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.role_name


class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    user_username = models.CharField(max_length=50, unique=True)
    user_password = models.CharField(max_length=255)
    user_firstname = models.CharField(max_length=50)
    user_secondname = models.CharField(max_length=50, blank=True, null=True)
    user_lastname = models.CharField(max_length=50)
    user_second_lastname = models.CharField(max_length=50, blank=True, null=True)
    user_genre = models.CharField(max_length=50)
    user_dateofbirth = models.DateField()
    user_cedula = models.CharField(max_length=20, unique=True)
    user_email = models.EmailField(max_length=100, unique=True)
    user_phone = models.CharField(max_length=20, unique=True)
    user_address = models.CharField(max_length=255)
    user_isactive = models.BooleanField(default=True)
    user_created = models.DateTimeField(auto_now_add=True)
    user_updated = models.DateTimeField(auto_now=True)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)

    def __str__(self):
        return self.user_username

    def full_name(self):
        return f"{self.user_firstname} {self.user_lastname}".strip()

    def age(self):
        today = timezone.now().date()
        return (
            today.year
            - self.user_dateofbirth.year
            - (
                (today.month, today.day)
                < (self.user_dateofbirth.month, self.user_dateofbirth.day)
            )
        )
