import chalk from 'chalk';

export function greet() {
    const message = chalk.green.bold('Bienvenue dans Ninja Utility!') + ' ' + chalk.blue('Prêt à devenir un ninja du code?');
    console.log(message);
}