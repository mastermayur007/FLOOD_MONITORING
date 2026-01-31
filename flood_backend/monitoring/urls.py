from django.urls import path
from .views import receive_water_data, live_water_data

urlpatterns = [
    path('sensor-data/', receive_water_data),
    path('live-data/', live_water_data),
]
