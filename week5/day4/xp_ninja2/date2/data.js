export function temps(time){
    const tableau = time.split("/");
    let totaleminutes = (tableau[0]*24*60) + (tableau[1]*30*24*60) + (tableau[2]*12*30*24*60);
    console.log("vous avez vécu " + totaleminutes);
}