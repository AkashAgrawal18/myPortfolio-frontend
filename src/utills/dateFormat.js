
export const dateMMYYYY = (datet) => {
    if (datet != undefined && datet != null) {
        let datefor = new Date(datet).toDateString().split(" ");
        let dateSting = `${datefor[1]} ${datefor[3]}`;
        return dateSting;
    } else {
        return "present";
    }

}

export const dateStr = (datet) => {
    if (datet != undefined && datet != null) {
        let datefor = new Date(datet).toDateString()
        return datefor;
    } else {
        return "present";
    }

}