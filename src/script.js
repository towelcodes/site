// i stole this from https://stackoverflow.com/a/6109105 btw
function timeDifference(current, previous) {

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = current - previous;

    const calc = (div) => {
        const val = Math.round(elapsed / div);
        const s = val > 1 ? 's' : '';
        return (val, s);
    }

    if (elapsed < msPerMinute) {
        let val, s = calc(1000);
        return val + ` second${s} ago`;   
    }

    else if (elapsed < msPerHour) {
        let val, s = calc(msPerMinute)
        return val + ` minute${s} ago`;   
    }

    else if (elapsed < msPerDay) {
        let val, s = calc(msPerHour)
        return val + ` hour${s} ago`;   
    }

    else if (elapsed < msPerMonth) {
        let val, s = calc(msPerDay)
        return val + ` day${s} ago`;   
    }

    // else if (elapsed < msPerYear) {
    else {
        let val, s = calc(msPerMonth);
        return val + ` month${s} ago`;   
    }

    // else {
    //     let val, s = calc(msPerYear)
    //     return val + ` year${s} ago`;   
    // }
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

