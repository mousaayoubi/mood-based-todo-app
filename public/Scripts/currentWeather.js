const output = document.getElementById('weather-output');

const weather = localStorage.getItem("weather");

const weather_json = JSON.parse(weather);

output.innerHTML = `
<img id="weather_icon" alt="weather icon" width="100" height="100" src="https:${weather_json.icon}" alt="icon"></p>
                    <p id="current_temperature">${weather_json.temp_c}°C</p>
                    <p id="current_condition">${weather_json.condition}</p>
                    <p id="current_humidity">Humidity: ${weather_json.humidity}%</p>;
`

