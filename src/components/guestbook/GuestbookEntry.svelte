<script lang="ts">
    import StaticCanvas from "./StaticCanvas.svelte";
    import {decompressCanvasData} from "../../scripts/db.js";
    let { id, created_at, from = undefined, text_content = undefined, img_content = undefined, index = 1}: {
        id: number,
        created_at: string,
        from?: string,
        text_content?: string,
        img_content?: Uint8ClampedArray,
        index: number
    } = $props();
</script>

<div class="relative font-ds">
    <div class="flex flex-row flex-nowrap relative [&>*]:text-nowrap [&>*]:cursor-default">
        <!-- note: we have to use z-index in style block because tailwind won't generate the styles otherwise -->
        <div class="bg-blue rounded text-black px-1 text-sm inline-block align-text-top pb-4 shadow-black shadow-md relative" style="z-index: {index}2">{from ?? "anon"}</div>
        <div class="bg-green rounded text-black px-1 pl-5 -left-4 text-sm inline-block align-text-top pb-4 shadow-black shadow-md relative" style="z-index: {index}1">{created_at}bumerclut</div>
        <div class="bg-overlay2 rounded text-text px-1 pl-5 -left-8 text-sm inline-block align-text-top pb-4 shadow-black shadow-md relative" style="z-index: {index}0">#{id}</div>
    </div>
    <div class="bg-surface2 rounded shadow-card relative font-ds text-lg px-1 -mt-5" style="z-index: {index}3">
        {#if text_content}
            {text_content}
        {:else}
            <span class="text-subtext1 italic text-s">[no text content]</span>
        {/if}
        {#if img_content}
            <div class="inline-block">
                <StaticCanvas data={decompressCanvasData(img_content)} width={190} height={126} classes="w-full rounded" />
            </div>
        {/if}
    </div>
</div>