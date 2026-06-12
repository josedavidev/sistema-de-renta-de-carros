from rest_framework import viewsets
from .serializer import ReservationSerializer
from .models import Reservation
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status


class ReservationView(viewsets.ModelViewSet):
    serializer_class = ReservationSerializer
    queryset = Reservation.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            reservation = serializer.save()  # Aquí guardamos la reserva
            return Response(
                ReservationSerializer(reservation).data, status=status.HTTP_201_CREATED
            )  # Devolvemos la reserva completa
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
