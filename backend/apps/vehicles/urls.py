from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r"vehicles", views.VehicleView, "vehicles")
router.register(
    r"vehicles-categories", views.VehicleCategoryView, "vehicles-categories"
)
router.register(r"vehicles-status", views.VehicleStatusView, "vehicles-status")

urlpatterns = [
    path("api/", include(router.urls)),
]
