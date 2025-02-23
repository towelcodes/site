<script lang="ts">
    import { onMount } from "svelte";
    let { data, width, height }: { data: Uint8ClampedArray, width: number, height: number } = $props();
    console.log("loading:",data);
    onMount(() => {
        const canvas = document.querySelector("canvas");
        if (canvas == null) throw new Error("no canvas");
        const ctx = canvas.getContext("2d")!;
        ctx.putImageData(new ImageData(data, width, height), 0, 0);
    });
</script>

<canvas {width} {height} style="image-rendering: pixelated;">your browser does not support canvas :(></canvas>