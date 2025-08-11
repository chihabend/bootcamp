import Holidays from 'date-holidays';
export function holiday_waiting(){
    let date = new Date()
    const hd = new Holidays('FR')
    const holidays = hd.getHolidays(date.getFullYear());
    
    const todayHoliday = holidays.find(holiday => 
        new Date(holiday.date).toDateString() === date.toDateString()
    );
    
    if (todayHoliday) {
        console.log("c'est un jour férié c'est le " + todayHoliday.name);
    } else {
        console.log("la date est : " + date.toString());
        const jourferier = holidays.find(holiday => new Date(holiday.date) > date);
        console.log("votre plus proche jour férié est le " + (jourferier ? jourferier.name : "aucun"));
    }
}
