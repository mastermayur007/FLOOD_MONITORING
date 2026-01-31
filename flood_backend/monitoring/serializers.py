# from rest_framework import serializers
# from .models import WaterLevel

# class WaterLevelSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = WaterLevel
#         fields = '__all__'


from rest_framework import serializers
from .models import WaterLevel


class WaterLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaterLevel
        fields = (
            'id',
            'water_level_cm',
            'percentage',
            'stage',
            'temperature',
            'humidity',
            'motor_status',
            'timestamp',
        )

        read_only_fields = (
            'percentage',
            'stage',
            'timestamp',
        )

