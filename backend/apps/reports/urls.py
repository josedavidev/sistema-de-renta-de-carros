from django.urls import path
from .views import CrearAyudaView, ListarAyudasView

urlpatterns = [
    path("crear/", CrearAyudaView.as_view(), name="crear-ayuda"),
    path("listar/", ListarAyudasView.as_view(), name="listar-ayudas"),
]
