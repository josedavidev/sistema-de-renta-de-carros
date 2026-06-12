from django.db import models


class Payment(models.Model):
    PAYMENT_METHOD_CHOICES = [
        ("efectivo", "Efectivo"),
        ("tarjeta", "Tarjeta"),
        ("transferencia", "Transferencia"),
        ("otro", "Otro"),
    ]
    PAYMENT_STATUS_CHOICES = [
        ("pendiente", "Pendiente"),
        ("completado", "Completado"),
        ("fallido", "Fallido"),
    ]
    payment_id = models.AutoField(primary_key=True)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES)
    payment_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)
    reservation = models.ForeignKey("rents.Reservation", on_delete=models.CASCADE)

    def __str__(self):
        return (
            f"Pago #{self.payment_id} - {self.payment_method} - {self.payment_status}"
        )


class Invoice(models.Model):
    INVOICE_STATUS_CHOICES = [
        ("pendiente", "Pendiente"),
        ("pagada", "Pagada"),
        ("vencida", "Vencida"),
        ("cancelada", "Cancelada"),
    ]
    invoice_id = models.AutoField(primary_key=True)
    invoice_number = models.CharField(max_length=50, unique=True)
    invoice_date = models.DateField(auto_now_add=True)
    invoice_total = models.DecimalField(max_digits=10, decimal_places=2)
    invoice_status = models.CharField(max_length=20, choices=INVOICE_STATUS_CHOICES)
    invoice_notes = models.TextField(blank=True, null=True)

    reservation = models.ForeignKey(
        "rents.Reservation", on_delete=models.CASCADE, related_name="invoices"
    )
    vehicle = models.ForeignKey("vehicles.Vehicle", on_delete=models.CASCADE)

    def __str__(self):
        return f"Factura #{self.invoice_number} - {self.invoice_status}"
