#include <WiFi.h>
#include <HTTPClient.h>
#include "DHT.h"

/* ---------------- PIN DEFINITIONS ---------------- */
#define TRIG_PIN 5
#define ECHO_PIN 18
#define RELAY_PIN 23
#define DHT_PIN 4
#define DHT_TYPE DHT11   // Change to DHT22 if using DHT22

/* ---------------- WIFI DETAILS ---------------- */
const char* ssid = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASSWORD";

/* ---------------- DJANGO API ---------------- */
const char* serverUrl = "http://192.168.1.100:8000/api/sensor-data/";

/* ---------------- SYSTEM CONSTANTS ---------------- */
const int MAX_HEIGHT_CM = 300;     // Height of tank / river reference
const int MOTOR_ON_LEVEL = 80;     // %
const int MOTOR_OFF_LEVEL = 60;    // %

DHT dht(DHT_PIN, DHT_TYPE);
bool motorState = false;

/* ---------------- SETUP ---------------- */
void setup() {
  Serial.begin(9600);

  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(RELAY_PIN, OUTPUT);

  digitalWrite(RELAY_PIN, LOW);   // Motor OFF initially
  dht.begin();

  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi Connected");
  Serial.print("ESP32 IP: ");
  Serial.println(WiFi.localIP());
}

/* ---------------- ULTRASONIC DISTANCE ---------------- */
long getDistanceCM() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH, 30000);
  if (duration == 0) return -1;

  return duration * 0.034 / 2;
}

/* ---------------- LOOP ---------------- */
void loop() {

  long distance = getDistanceCM();
  if (distance < 0) {
    Serial.println("Sensor error");
    delay(1000);
    return;
  }

  int waterLevel = MAX_HEIGHT_CM - distance;
  if (waterLevel < 0) waterLevel = 0;

  int percentage = (waterLevel * 100) / MAX_HEIGHT_CM;

  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  /* -------- MOTOR CONTROL LOGIC (HYSTERESIS) -------- */
  if (percentage >= MOTOR_ON_LEVEL && !motorState) {
    digitalWrite(RELAY_PIN, HIGH);
    motorState = true;
  }

  if (percentage <= MOTOR_OFF_LEVEL && motorState) {
    digitalWrite(RELAY_PIN, LOW);
    motorState = false;
  }

  /* -------- DEBUG OUTPUT -------- */
  Serial.println("------ SENSOR DATA ------");
  Serial.print("Water Level: ");
  Serial.print(waterLevel);
  Serial.println(" cm");

  Serial.print("Percentage: ");
  Serial.print(percentage);
  Serial.println(" %");

  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println(" °C");

  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.println(" %");

  Serial.print("Motor: ");
  Serial.println(motorState ? "ON" : "OFF");

  /* -------- SEND DATA TO DJANGO -------- */
  if (WiFi.status() == WL_CONNECTED) {

    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    String payload = "{";
    payload += "\"water_level_cm\":" + String(waterLevel) + ",";
    payload += "\"temperature\":" + String(temperature) + ",";
    payload += "\"humidity\":" + String(humidity) + ",";
    payload += "\"motor_status\":\"" + String(motorState ? "ON" : "OFF") + "\"";
    payload += "}";

    int httpResponseCode = http.POST(payload);
    Serial.print("HTTP Response: ");
    Serial.println(httpResponseCode);

    http.end();
  }

  delay(1000); // Send data every second
}
