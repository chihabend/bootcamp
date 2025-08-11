import readline from 'readline';
import { getWeather } from './weather.js';

export function runDashboard() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Entrez le nom de la ville pour obtenir la météo : ', async (city) => {
        if (city.trim() === '') {
            console.log('Aucune ville saisie. Veuillez réessayer.');
            rl.close();
            return;
        }
        await getWeather(city.trim());
        rl.close();
    });
}
