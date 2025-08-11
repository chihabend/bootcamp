export function temps(){
  
    let mtn = new Date()
    const now = new Date();
    const nextJan1 = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0, 0);
    const diffMs = nextJan1 - now;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    console.log(`Temps restant jusqu'au 1er janvier : ${diffDays} jours, ${diffHours} heures, ${diffMinutes} minutes, ${diffSeconds} secondes`);
}
