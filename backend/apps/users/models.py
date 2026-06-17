from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)


class Role(models.Model):
    ROLE_CHOICES = [
        ("admin", "Admin"),
        ("customer", "Customer"),
        ("receptionist", "Receptionist"),
        ("delivery", "Delivery Personnel"),
        ("reception", "Reception Personnel"),
    ]
    name = models.CharField(
        max_length=50, unique=True, choices=ROLE_CHOICES, default="customer"
    )
    description = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.get_name_display()


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The User must have an email address")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        role_admin, _ = Role.objects.get_or_create(name="admin")
        extra_fields.setdefault("role", role_admin)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    NOTIFICATION_CHOICES = [("email", "Email"), ("sms", "SMS")]
    GENRE_CHOICES = [("M", "Male"), ("F", "Female"), ("O", "Other")]

    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=GENRE_CHOICES)
    birthdate = models.DateField()
    phone = models.CharField(max_length=20, unique=True)
    role = models.ForeignKey(Role, on_delete=models.PROTECT)
    notification_preference = models.CharField(
        max_length=10, choices=NOTIFICATION_CHOICES, default="email"
    )
    avatar = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "first_name",
        "last_name",
        "phone",
    ]

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"


class CustomerProfile(models.Model):
    DOCUMENT_CHOICES = [("cedula", "Cédula"), ("nit", "NIT")]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    document_type = models.CharField(max_length=10, choices=DOCUMENT_CHOICES)
    document_number = models.CharField(max_length=20, unique=True)
    document_issued_at = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    license_number = models.CharField(max_length=50, unique=True)
    license_expiry = models.DateField()
    is_blacklisted = models.BooleanField(default=False)
    blacklist_reason = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Profile of {self.user.email}"
