from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import WaterLevel
from .serializers import WaterLevelSerializer


MAX_WATER_LEVEL_CM = 300  # based on sensor height


def calculate_stage(percentage):
    """
    Flood classification logic
    """
    if percentage < 70:
        return "NORMAL"
    elif percentage < 80:
        return "WARNING"
    else:
        return "DANGER"


@api_view(["POST"])
def receive_water_data(request):
    """
    Receives data from ESP32 or demo source
    """

    try:
        water_level_cm = float(request.data.get("water_level_cm"))
    except (TypeError, ValueError):
        return Response(
            {"error": "Valid water_level_cm is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Optional sensor values
    temperature = request.data.get("temperature")
    humidity = request.data.get("humidity")
    motor_status = request.data.get("motor_status", "OFF")

    # Calculate percentage & stage
    percentage = (water_level_cm / MAX_WATER_LEVEL_CM) * 100
    percentage = round(percentage, 2)
    stage = calculate_stage(percentage)

    # Save to database
    data = WaterLevel.objects.create(
        water_level_cm=water_level_cm,
        percentage=percentage,
        stage=stage,
        temperature=temperature,
        humidity=humidity,
        motor_status=motor_status,
    )

    serializer = WaterLevelSerializer(data)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def live_water_data(request):
    """
    Sends recent data to frontend
    """
    records = WaterLevel.objects.order_by("-timestamp")[:50]
    serializer = WaterLevelSerializer(records, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
