const base = document.querySelector("#tooltip");

document.onmousemove = ((e) => {
    base.animate({
        left: `${e.clientX}px`,
        top: `${e.clientY-26}px`
    }, { duration: 1000, fill: "forwards"});
});

const hover = (text) => {
    base.textContent = text;
    base.classList.remove("hidden");
    show();
}

const show = () => {
    base.animate({
        maxWidth: "1000px"
    }, { duration: 1000, fill: "forwards"});
}

const hide = () => {
    base.animate({
        maxWidth: "0px"
    }, { duration: 1000, fill: "forwards"});
};

document.querySelectorAll("[data-tooltip]").forEach((e) => {
    e.addEventListener("mouseover", () => hover(e.dataset.tooltip));
    e.addEventListener("mouseleave", hide);
});