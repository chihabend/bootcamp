import fs from 'fs';
const contenu = fs.readFileSync('source.txt', 'utf-8');
fs.writeFileSync('destination.txt', contenu);
console.log(contenu);