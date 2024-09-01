const timeCheck = () => {
    let opt = {
        timeZone: 'Europe/London',
        hour: 'numeric',
        minute: 'numeric',
    };

    formatter = new Intl.DateTimeFormat([], opt);
    document.getElementById("localTime").innerHTML =
        "time for me: " +
        formatter.format(new Date());
}

window.onLoad = () => timeCheck();
window.setInterval(() => timeCheck(), 500);