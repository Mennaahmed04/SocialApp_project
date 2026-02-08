
export function formateDate(myDate){
    const isoString =myDate;
    const date = new Date(isoString);

    const options ={
        month:"long",
        day:"numeric",
        hour:"numeric",
        minute:"2-digit",
        hour12:true,
    };

    const formatted = new Intl.DateTimeFormat("en-US",options).format(date);
    return formatted
    
}