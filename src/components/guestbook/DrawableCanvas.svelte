<script lang="ts">
    import {
        postgrest,
        u8IntClampedArrayToHex,
        compressCanvasData,
    } from "../../scripts/db.ts";
  import {onMount} from "svelte";
  import {Howl} from "howler";
  import FlipnoteButton from "./FlipnoteButton.svelte";

  let { ctx = $bindable() }: { ctx: CanvasRenderingContext2D } = $props();

  const drawSound = new Howl({
    src: ["/sfx/draw.wav"],
    loop: true,
    volume: 0.8
  });

  const clearSound = new Howl({
    src: ["/sfx/erase.wav"],
    loop: false,
    volume: 1
  });

  let brushSize = $state(8);
  let root = $state();
  let arrow = $state();
  let tooltip = $state();

  onMount(async () => {
    const canvas = document.querySelector("canvas");
    if (canvas == null) throw new Error("no canvas");
    ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let down = false;
    let px: number | undefined;
    let py: number | undefined;

    let pauseTask: NodeJS.Timeout | undefined;

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

    const { data, error  } = await postgrest.from("appstate").select();
    if (error) { return console.error("failed to get appstate", error) }
  });

  function clearCanvas() {
    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 190, 126);
      clearSound.play();
    }
  }

  async function submit() {
    if (ctx) {
        const data = ctx.getImageData(0, 0, 190, 126).data;
        const compressed = compressCanvasData(data);
        const { error } = await postgrest.from("entries").insert({ from: "anon", img_content: u8IntClampedArrayToHex(compressed) });
        if (error) console.error("failed to submit", error);
    }
  }
</script>

<style>
    canvas {
        image-rendering: pixelated;
        cursor: url("/cursor/circle8nf.png") 2 2, auto;
        border: 2px orange solid;
        border-radius: 2px;
    }
</style>

<div class="p-1 bg-orange-200 rounded shadow-card w-[190px]" style="image-rendering: pixelated;" bind:this={root}>
    <canvas width="190" height="126" class="mx-auto shadow-card">
        canvas is not supported on your browser.
    </canvas>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="flex mt-1 cursor-[var(--stylus)] [&>*]:mr-1 last:mr-0">
        <FlipnoteButton icon="erase" onclick={clearCanvas} classes="border border-fliporange rounded"/>
        <FlipnoteButton icon="submit" onclick={submit} classes="border border-flipgreen rounded"/>
    </div>
    <span class="text-black font-ds">blep</span>
</div>