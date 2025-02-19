<script>
  import {onMount} from "svelte";
  import {Howl, Howler} from "howler";

  let { ctx = $bindable() } = $props();

  const drawSound = new Howl({
    src: ["/sfx/draw.wav"],
    loop: true,
    volume: 0.8
  });

  let brushSize = $state(8);
  let root = $state();
  let arrow = $state();
  let tooltip = $state();

  onMount(() => {
    const draw = new Audio("/sfx/Sample 30.wav");
    draw.loop = true;
    const canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let down = false;
    let px = undefined;
    let py = undefined;

    let pauseTask = undefined;

    canvas.addEventListener("mousedown", (e) => {
      down = true;
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(e.clientX - rect.left);
      const y = Math.floor(e.clientY - rect.top);
      ctx.fillStyle = "#000000";
      ctx.fillRect(x, y, 2, 2);
      const circle = new Path2D();
      circle.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fill(circle);
      drawSound.play();
      pauseTask = setTimeout(() => {
        drawSound.pause();
      }, 100);
    });

    window.addEventListener("mouseup", () => {
      drawSound.pause();
      down = false;
      px = undefined;
      py = undefined;
    });

    canvas.addEventListener("mousemove", (e) => {
      if (down) {
        if (!drawSound.playing()) { drawSound.play(); }
        if (pauseTask) { clearTimeout(pauseTask); }
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor(e.clientX - rect.left);
        const y = Math.floor(e.clientY - rect.top);
        const dx = x - px;
        const dy = y - py;

        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.lineWidth = 6;
        ctx.moveTo(px ?? x, py ?? y);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = "#000000";
        ctx.fillRect(x, y, 2, 2);
        const circle = new Path2D();
        circle.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill(circle);
        px = x;
        py = y;

        // pause the sound if mouse doesn't move for a bit
        pauseTask = setTimeout(() => {
          drawSound.pause();
        }, 100);
      }
    });

    const arrowParentRect = arrow.parentNode.getBoundingClientRect();
    const arrowTop = arrowParentRect.top + window.scrollY - 35;
    arrow.style.top = `${arrowTop}px`;

    root.onmousemove = ((e) => {
      console.log(e.clientX);
      arrow.animate({
        left: `${e.clientX-16}px`,
        // top: `${e.clientY-26}px`
      }, { duration: 1000, fill: "forwards"});
    });
  });

  const enterButtons = () => {

  };
</script>

<style>
    canvas {
        image-rendering: pixelated;
        cursor: url("/cursor/circle8nf.png") 2 2, auto;
        border: 2px orange solid;
        border-radius: 2px;
    }

    .fn-button {
        transition: transform 0.2s ease-out;
    }

    .fn-button:hover {
        transform: scale(1.2);
    }

    .fn-buttons {
        cursor: url("/cursor/stylus.png") 1 25, auto;
    }
</style>

<div class="p-1 bg-orange-200 rounded shadow-card w-[190px]" style="image-rendering: pixelated;" bind:this={root}>
    <canvas width="190" height="126" class="mx-auto shadow-card">
        canvas is not supported on your browser.
    </canvas>
    <div class="flex mt-1 fn-buttons" onmouseenter={enterButtons()}>
<!--        <div class="absolute flex" bind:this={arrow}>-->
<!--            <img src="/icon/arrow.png" alt="" width="32" height="32" />-->
<!--            <div class="border-black border-2 bg-white rounded text-black font-ds px-1 inline-block" bind:this={tooltip}>Tooltip</div>-->
<!--        </div>-->
        <button class="border-orange-500 border-2 rounded fn-button fn-buttons">
            <img src="/icon/erase.png" alt="erase" width="16" height="16" />
        </button>
    </div>
    <span class="text-black font-ds">blep</span>
</div>