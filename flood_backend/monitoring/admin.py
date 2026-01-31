from django.contrib import admin
from .models import WaterLevel

@admin.register(WaterLevel)
class WaterLevelAdmin(admin.ModelAdmin):
    list_display = ('water_level_cm', 'percentage', 'stage', 'timestamp')
    list_filter = ('stage',)
    ordering = ('-timestamp',)

