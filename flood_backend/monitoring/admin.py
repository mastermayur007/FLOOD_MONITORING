from django.contrib import admin
from .models import WaterLevel


@admin.register(WaterLevel)
class WaterLevelAdmin(admin.ModelAdmin):

    list_display = (
        'water_level_cm',
        'percentage',
        'stage',
        'temperature',
        'humidity',
        'motor_status',
        'timestamp',
    )

    list_filter = (
        'stage',
        'motor_status',
    )

    search_fields = (
        'stage',
    )

    ordering = ('-timestamp',)

    readonly_fields = ('timestamp',)

