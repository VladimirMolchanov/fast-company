export function conversionDate (createdAt) {
    const date = new Date(createdAt);
    const diff = new Date() - new Date(createdAt);
    let seconds = Math.floor(diff / 1000);
    let minutes = Math.floor(diff / 1000 / 60);
    let hours = Math.floor(diff / 1000 / 60 / 60);
    let day = Math.floor(diff / 1000 / 60 / 60 / 24);
    let month = Math.floor(diff / 1000 / 60 / 60 / 24 / 30);
    // let year = Math.floor(diff / 1000 / 60 / 60 / 24 / 30 / 365);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    day = (day < 10) ? "0" + day : day;
    month = (month < 10) ? "0" + month : month;
    // year = (year < 10) ? "0" + year : year;

    console.log(day, month);

    if (+seconds <= 60) return "1 минуту назад";
    if (+minutes <= 5) return "5 минут назад";
    if (+minutes <= 10) return "10 минут назад";
    if (+minutes <= 30) return "30 минут назад";
    if (+hours < 24) return `${hours}.${minutes}`;
    if (+day <= 365) return `${date.getDay()}.${date.getMonth()}`;
    return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;
}
