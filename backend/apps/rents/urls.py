from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r"reservations", views.ReservationView, "reservation")

urlpatterns = [
    path("api/", include(router.urls)),
]
