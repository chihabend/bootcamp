import fs from 'fs';
export function writeFile(){
    fs.writeFile("Hello World.txt","Hello world", "utf8",()=>{
        console.log("le fichier a bien été créee");
    });
}
export function readFile(){
    fs.readFile("Hello World.txt", "utf8", (err, data) => {
        console.log("le fichier a bien été lu");
        console.log(data);
    });
}

