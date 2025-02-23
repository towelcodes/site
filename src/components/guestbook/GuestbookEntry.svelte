<script lang="ts">
    import StaticCanvas from "./StaticCanvas.svelte";
    let { id, created_at, from = undefined, text_content = undefined, img_content = undefined}: {
        id: number,
        created_at: string,
        from?: string,
        text_content?: string,
        img_content?: Uint8ClampedArray,
    } = $props();
</script>

<div class="relative font-ds">
    <div class="absolute bg-blue rounded text-black px-1 text-sm inline-block align-text-top bottom-2 pb-4 z-0 shadow-black shadow-md">{from ?? "anon"}</div>
    <div class="bg-surface2 rounded shadow-card relative mt-5 font-ds z-10 text-lg px-1">
        {text_content ?? "no text content"}
    </div>
    {#if img_content}
        <StaticCanvas data={img_content} width={190} height={126} />
    {/if}
</div>