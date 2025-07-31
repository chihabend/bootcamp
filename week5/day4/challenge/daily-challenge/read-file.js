import fs from 'fs';
export function readFile(){
    const data = fs.readFileSync('./files/file-data.txt', 'utf8');
    return data;
}