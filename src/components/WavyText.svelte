<script lang="ts">
    import {onMount} from "svelte";

    let { title }: { title: string} = $props();
    let componentRoot: HTMLElement;

    onMount(() => {
        componentRoot.querySelectorAll("span").forEach((c, i) => {
            c.style.animationDelay = (-200 * i) + "ms";
        });
    })
</script>

<h1 class="block text-7xl font-jersey font-bold text-transparent bg-clip-text mx-4" bind:this={componentRoot}>
    {#each title.split('') as char}
        <span class="bg-clip-text bg-gradient-to-r from-pink to-mauve
      duration-500 ease-out cursor-default animate-wave inline-block drop-shadow-glow">{char}</span>
    {/each}
</h1>