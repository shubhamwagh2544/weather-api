Weather-API is a RESTful API that provides real-time weather forecasts based on geographical locations. 
The API fetches data from an external weather service and expose endpoints to retrieve weather information for specific locations.

Location management
- Users can add, retrieve, update, and delete locations. Each location should have a name, latitude, and longitude.

Weather Forecast:
- Users can request weather forecasts for a specific location.
- The API fetches real-time weather data from a weather service (e.g., OpenWeatherMap, WeatherAPI).
- It Provides forecasts for parameters like temperature, humidity, wind speed, etc.

Endpoints:
- /locations (GET, POST): Get all locations or add a new location
- /locations/<location_id> (GET, PUT, DELETE): Get, update, or delete a specific location by ID
- /weather/<location_id> (GET): Get the weather forecast for a specific location
- /history (last 7 days, last 15 days, last 30 days) (GET): Get the historical data and show the summary.

Features:
- Caching
- Rate limiting
- Logging
- Error Handling
