from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import WaterLevel
from .serializers import WaterLevelSerializer

MAX_WATER_LEVEL_CM = 300  # adjust based on your sensor

def calculate_stage(percentage):
    if percentage < 40:
        return "NORMAL"
    elif percentage < 70:
        return "WARNING"
    else:
        return "DANGER"


@api_view(['POST'])
def receive_water_data(request):
    water_level_cm = request.data.get('water_level_cm')

    if water_level_cm is None:
        return Response(
            {"error": "water_level_cm is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    percentage = (float(water_level_cm) / MAX_WATER_LEVEL_CM) * 100
    stage = calculate_stage(percentage)

    data = WaterLevel.objects.create(
        water_level_cm=water_level_cm,
        percentage=round(percentage, 2),
        stage=stage
    )

    serializer = WaterLevelSerializer(data)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def live_water_data(request):
    latest = WaterLevel.objects.order_by('-timestamp')[:50]
    serializer = WaterLevelSerializer(latest, many=True)
    return Response(serializer.data)

