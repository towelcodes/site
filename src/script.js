// i stole this from https://stackoverflow.com/a/6109105 btw
function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

const timeCheck = () => {
    let opt = {
        timeZone: 'Europe/London',
        hour: 'numeric',
        minute: 'numeric',
    };

    formatter = new Intl.DateTimeFormat([], opt);
    document.querySelectorAll(".localTime").forEach((e) => e.innerHTML = formatter.format(new Date()));
}

window.onload = () => {
    // check the local time
    timeCheck()

    // format the build time
    const buildTime = document.querySelector("#buildTime").textContent;
    console.log(Date.now());
    console.log(buildTime);
    document.querySelectorAll(".buildTime").forEach((e) => e.textContent = timeDifference(Date.now(), buildTime));

    // apply random animation delays
    const randomDelay = document.querySelectorAll(".rand-delay");
    randomDelay.forEach(el => {
        el.style.animationDelay = (Math.random()*2) + "s";
    })
}
window.setInterval(() => timeCheck(), 500);

