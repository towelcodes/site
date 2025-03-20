<script lang="ts">
    import { onMount } from "svelte";
    let { data, width, height, classes = "" }: { data: Uint8ClampedArray, width: number, height: number, classes? :string } = $props();
    console.log("loading:",data);
    let canvas: HTMLCanvasElement;
    onMount(() => {
        const ctx = canvas.getContext("2d")!;
        ctx.putImageData(new ImageData(data, width, height), 0, 0);
    });
</script>

<canvas {width} {height} style="image-rendering: pixelated;" class={classes} bind:this={canvas}>your browser does not support canvas :(></canvas>