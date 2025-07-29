import { format, addDays } from "date-fns";
export function getFormattedFutureDate() {
    const now = new Date();
    const futureDate = addDays(now, 5);
    const formattedDate = format(futureDate, "yyyy-MM-dd HH:mm:ss");
    console.log("Date dans 5 jours :", formattedDate);
    return formattedDate;
}
