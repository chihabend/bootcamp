import { Command } from 'commander';
import { greet } from './commands/greet.js';
import { fetchWeather } from './commands/fetch.js';
import { readFile } from './commands/read.js';

const program = new Command();

program
  .name('ninja-utility')
  .description('Un utilitaire CLI pour les ninjas du code')
  .version('1.0.0');

program
  .command('greet')
  .description('Affiche un message de bienvenue')
  .action(() => {
    greet();
  });

program
  .command('weather [city]')
  .description('Affiche la météo actuelle pour une ville (par défaut : Paris)')
  .action((city = 'Paris') => {
    fetchWeather(city);
  });

program
  .command('read <file>')
  .description('Lit et affiche le contenu d\'un fichier')
  .action((file) => {
    readFile(file);
  });

if (process.argv.length > 2) {
  program.parse(process.argv);
} else {
  program.help();
}
