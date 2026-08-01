<script lang="ts">
    import Teatowel from "../assets/typography/teatowels.svg?raw";
    import Home from "../assets/typography/home.svg?raw";
    let { path = "" } = $props();
</script>

<div class="flex gap-2 *:hover:cursor-default *:block items-center">
    <div class="h-[36px] relative">
        {@html Teatowel}
    </div>
    <div class="h-[36px] relative drop-shadow-glow drop-shadow-ctp-green">
        {@html Home}
    </div>
</div>
