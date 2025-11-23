const btn = document.getElementById('get-weather');
const output = document.getElementById('weather-output');

btn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        output.textContent = "Geolocation is not supported by your browser.";
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
            const res = await fetch(`/weather?lat=${lat}&lon=${lon}`);
            const data = await res.json();

            if (res.ok) {
                output.innerHTML = `
                    <img id="weather_icon" alt="weather icon" width="100" height="100" src="https:${data.current.icon}" alt="icon"></p>
                    <p id="current_temperature">${data.current.temp_c}°C</p>
		    <p id="current_condition">${data.current.condition}</p>
                    <p id="current_humidity">Humidity: ${data.current.humidity}%</p>
                 
                `;
            } else {
                output.textContent = data.error || "Failed to fetch weather.";
            }
        } catch (err) {
            output.textContent = "Error fetching weather: " + err.message;
        }

    }, (error) => {
        output.textContent = "Geolocation error: " + error.message;
    }, {
        enableHighAccuracy: true,
        timeout: 5000
    });
});
