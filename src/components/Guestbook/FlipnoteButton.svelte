<script>
  let { icon, label = icon, onclick } = $props();
  /** @type {HTMLDivElement} */
  let tooltip;
  function hover() {
    tooltip.classList.remove("hidden");
    tooltip.animate({
      top: "18px",
      clipPath: "inset(0 0% 0 0)",
    }, { duration: 200, fill: "forwards", easing: "ease-out" });
  }
  function unhover() {
    tooltip.animate({
      top: "1px",
      clipPath: "inset(0 100% 0 0)",
    }, { duration: 200, fill: "forwards", easing: "ease-in"}).addEventListener("finish", () => tooltip.classList.add("hidden"));
  }
</script>

<div class="relative">
    <button class="relative rounded cursor-[var(--stylus)] z-10" {onclick} onmouseenter={hover} onmouseleave={unhover}>
        <img src={`/icon/${icon}.png`} alt={icon} width="16" height="16" />
    </button>
    <div class="absolute top-0 left-0 font-ds text-black text-s bg-white border border-black rounded px-1 h-4 leading-[0.75] z-0 hidden" style="clip-path: inset(0 100% 0 0)" bind:this={tooltip}>
        {label}
    </div>
</div>

<style>
    button {
        transition: transform 0.2s ease-out;
    }

    button:hover {
        transform: scale(1.2);
    }

    button:active:hover {
        transform: scale(0.9) !important;
    }
</style>