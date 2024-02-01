const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; 

app.use(bodyParser.json());

app.post('/getWeather', async (req, res) => {
    try {
        const { cities } = req.body;
        const weatherData = {};

        for (const city of cities) {
            const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=630cc513da0f4ac4a88123753240102&q=${city}`);
            const temperature = response.data.current.temp_c + 'C';
            weatherData[city] = temperature;
        }

        res.json({ weather: weatherData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
