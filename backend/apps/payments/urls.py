from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r"payments", views.PaymentView, "payments")
router.register(r"invoices", views.InvoiceView, "invoices")

urlpatterns = [
    path("api/", include(router.urls)),
]
