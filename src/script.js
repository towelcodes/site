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
        return [val, s];
    }

    if (elapsed < msPerMinute) {
        let val = calc(1000);
        return val[0] + ` second${val[1]} ago`;   
    }

    else if (elapsed < msPerHour) {
        let val = calc(msPerMinute)
        return val[0] + ` minute${val[1]} ago`;   
    }

    else if (elapsed < msPerDay) {
        let val = calc(msPerHour)
        return val[0] + ` hour${val[1]} ago`;   
    }

    else if (elapsed < msPerMonth) {
        let val = calc(msPerDay)
        return val[0] + ` day${val[1]} ago`;   
    }

    // else if (elapsed < msPerYear) {
    else {
        let val = calc(msPerMonth);
        return val[0] + ` month${val[1]} ago`;   
    }

    // else {
    //     let val, s = calc(msPerYear)
    //     return val + ` year${s} ago`;   
    // }
}

// thanks MDN
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
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

    // pick a random wooper!
    // const randomWooper = document.querySelector("#random-wooper");
    // randomWooper.setAttribute("src", "/static/wooper/wooper"+(getRandomInt(3)+1)+".gif");
}
window.setInterval(() => timeCheck(), 500);

