<script lang="ts">
    import {onMount} from "svelte";

    let { title }: { title: string} = $props();
    let componentRoot: HTMLElement;

    onMount(() => {
        componentRoot.querySelectorAll("span").forEach((c, i) => {
            c.style.animationDelay = (200*i) + "ms";
        });
    })
</script>

<h1 class="block text-6xl relative bg-clip-text mx-4" bind:this={componentRoot}>
    {#each title.split('') as char}
        <span class="relative bg-clip-text bg-gradient-to-r from-pink to-mauve
        top-0 transition duration-500 ease-out cursor-default animate-bounce">{char}</span>
    {/each}
</h1>