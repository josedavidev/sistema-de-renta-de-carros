from django.db import models


class Ayuda(models.Model):
    correo_usuario = models.EmailField()  # Correo del usuario que reporta
    descripcion = models.TextField()  # Descripción del problema
    fecha_creacion = models.DateTimeField(
        auto_now_add=True
    )  # Fecha de creación del reporte

    def __str__(self):
        return f"Reporte de {self.correo_usuario} el {self.fecha_creacion.strftime('%d/%m/%Y %H:%M')}"
