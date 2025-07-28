import path from 'path';
import fs from 'fs';
const file = 'example.txt';
const dir = 'data';
const filePath = path.join(process.cwd(), dir, file);
export const ca = () => {
  const exists = fs.existsSync(filePath);
  console.log(`Le fichier existe : ${exists ? 'Oui' : 'Non'}`);
  if (exists) {
    const stats = fs.statSync(filePath);
    console.log(`Taille du fichier : ${stats.size} octets`);
    console.log(`Date de création : ${stats.birthtime}`);
  }
};
