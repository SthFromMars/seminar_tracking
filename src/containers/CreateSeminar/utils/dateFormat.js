export default function (date) {
    if(date) return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    return null;
}