from rest_framework import serializers
from .models import Ayuda


class AyudaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ayuda
        fields = ["correo_usuario", "descripcion", "fecha_creacion"]
