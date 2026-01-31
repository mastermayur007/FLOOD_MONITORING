from django.db import models

class WaterLevel(models.Model):
    STAGE_CHOICES = (
        ('NORMAL', 'Normal'),
        ('WARNING', 'Warning'),
        ('DANGER', 'Danger'),
    )

    water_level_cm = models.FloatField()
    percentage = models.FloatField()
    stage = models.CharField(max_length=10, choices=STAGE_CHOICES)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.stage} - {self.water_level_cm} cm"
