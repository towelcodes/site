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
        clipPath: "inset(0 0% 0 0)",
        transform: "scale(1)",
        opacity: "0.7"
    }, { duration: 300, fill: "forwards", easing: "ease-out"});
}

const hide = () => {
    base.animate({
        clipPath: "inset(0 100% 0 0)",
        transform: "scale(0.4)",
        opacity: "0.2"
    }, { duration: 300, fill: "forwards", easing: "ease-in"});
};

// FIXME this needs to be called each time page data changes
document.querySelectorAll("[data-tooltip]").forEach((e) => {
    e.addEventListener("mouseover", () => hover(e.dataset.tooltip));
    e.addEventListener("mouseleave", hide);
});