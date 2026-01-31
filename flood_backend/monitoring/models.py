from django.db import models


class WaterLevel(models.Model):

    STAGE_CHOICES = (
        ('NORMAL', 'Normal'),
        ('WARNING', 'Warning'),
        ('DANGER', 'Danger'),
    )

    MOTOR_CHOICES = (
        ('ON', 'ON'),
        ('OFF', 'OFF'),
    )

    # Core flood data
    water_level_cm = models.FloatField()
    percentage = models.FloatField()
    stage = models.CharField(max_length=10, choices=STAGE_CHOICES)

    # Environmental data (NEW)
    temperature = models.FloatField(null=True, blank=True)
    humidity = models.FloatField(null=True, blank=True)

    # Actuator status (NEW)
    motor_status = models.CharField(
        max_length=5,
        choices=MOTOR_CHOICES,
        default='OFF'
    )

    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.stage} | {self.water_level_cm} cm | Motor {self.motor_status}"
