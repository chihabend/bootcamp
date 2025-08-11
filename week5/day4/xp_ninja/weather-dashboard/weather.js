import axios from 'axios';
import chalk from 'chalk';

export async function getWeather(city) {
    const apiKey = '124037a0bdeede159698fb756f6d6662';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=fr`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        console.log(
            chalk.bold.cyan(`\n Météo à ${chalk.underline(data.name)} :`)
        );
        console.log(
            `  ${chalk.yellowBright(data.weather[0].description)}`
        );
        console.log(
            `  ${chalk.magenta('Température')}: ${chalk.bold.red(`${data.main.temp}°C`)}`
        );
        console.log(
            `  ${chalk.magenta('Ressenti')}: ${chalk.bold.red(`${data.main.feels_like}°C`)}`
        );
        console.log(
            `  ${chalk.blue('Humidité')}: ${chalk.bold(`${data.main.humidity}%`)}`
        );
        console.log(
            `  ${chalk.green('Vent')}: ${chalk.bold(`${data.wind.speed} m/s`)}\n`
        );
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error(chalk.redBright(`Ville "${city}" non trouvée.`));
        } else {
            console.error(
                chalk.red('Erreur lors de la récupération de la météo :'),
                chalk.red(error.message)
            );
        }
    }
}
