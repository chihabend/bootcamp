import fs from 'fs';
import path from 'path';

export function readFile(filePath) {
    const resolvedPath = path.resolve(filePath);
    fs.readFile(resolvedPath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Erreur lors de la lecture du fichier : ${err.message}`);
            return;
        }
        console.log(`Contenu du fichier "${filePath}" :\n`);
        console.log(data);
    });
}
