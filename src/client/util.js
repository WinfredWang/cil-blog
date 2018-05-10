

export function dateFormat(time) {
    if (!time) {
        return "";
    }
    let date = new Date(parseInt(time));
    return `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}