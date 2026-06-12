from rest_framework import viewsets
from .serializer import PaymentSerializer, InvoiceSerializer
from .models import Payment, Invoice


class PaymentView(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()


class InvoiceView(viewsets.ModelViewSet):
    serializer_class = InvoiceSerializer
    queryset = Invoice.objects.all()
