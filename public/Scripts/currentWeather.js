const output = document.getElementById('weather-output');

const weatherData = localStorage.getItem("weather");

if (weatherData) {
    const weather = JSON.parse(weatherData);

    // Get the template script
    const source = document.getElementById("weather-template").innerHTML;

    // Compile the template
    const template = Handlebars.compile(source);

    // Render template with data
    const html = template(weather);

    // Insert into DOM
    output.innerHTML = html;
} else {
    output.innerHTML = "<p>No weather data available.</p>";
}
