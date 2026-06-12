from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Ayuda
from .serializers import AyudaSerializer


class CrearAyudaView(APIView):
    def post(self, request):
        serializer = AyudaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Reporte enviado con éxito."},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListarAyudasView(APIView):
    def get(self, request):
        reportes = Ayuda.objects.all().order_by("-fecha_creacion")
        serializer = AyudaSerializer(reportes, many=True)
        return Response(serializer.data)
