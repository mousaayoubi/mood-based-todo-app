require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// Use cors middleware
app.use(cors());

app.use(express.json());

// Serve frontend
app.use(express.static('public'));

// Route to get weather by coordinates
app.get('/weather', async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    try {
        const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
            params: {
                key: WEATHER_API_KEY,
                q: `${lat},${lon}`,
                aqi: 'no'
            }
        });

        const data = response.data;

        res.json({
            location: {
                name: data.location.name,
                region: data.location.region,
                country: data.location.country,
                localtime: data.location.localtime
            },
            current: {
                temp_c: data.current.temp_c,
                temp_f: data.current.temp_f,
                condition: data.current.condition.text,
                icon: data.current.condition.icon,
                wind_kph: data.current.wind_kph,
                humidity: data.current.humidity,
                feelslike_c: data.current.feelslike_c
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather', details: error.response?.data || error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
