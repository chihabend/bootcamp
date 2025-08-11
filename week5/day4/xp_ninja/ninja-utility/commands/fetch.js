import axios from 'axios';
export async function fetchWeather(city) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current_weather=true`;
        const response = await axios.get(url);
        const weather = response.data.current_weather;
        console.log(`Météo actuelle à Paris :`);
        console.log(`Température : ${weather.temperature}°C`);
        console.log(`Vitesse du vent : ${weather.windspeed} km/h`);
    } catch (error) {
        console.error("Erreur lors de la récupération des données météo :", error.message);
    }
}
