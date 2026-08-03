<script lang="ts">
    import Teatowel from "../assets/typography/teatowels.svg?raw";
    import Home from "../assets/typography/home.svg?raw";
    import Music from "../assets/typography/music.svg?raw";
    import Dropdown from "../assets/dropdown.svg?raw";
    import { House } from "lucide-svelte";
    import { onMount } from "svelte";
    let { path = "" } = $props();

    let text: HTMLDivElement | undefined = $state();
    let dropdown: HTMLDivElement | undefined = $state();
    let container: HTMLDivElement | undefined = $state();
    let open = $state(false);
    let musicHovered = $state(false);

    function show() {
      open = true;
      dropdown?.animate([
        { transform: "rotate(0deg)" },
        { transform: "rotate(180deg)" }
      ], {
        duration: 200,
        easing: "ease-in-out",
        fill: "forwards"
      });
    }

    function hide() {
      open = false;
      musicHovered = false;
      dropdown?.animate([
        { transform: "rotate(180deg)" },
        { transform: "rotate(0deg)" }
      ], {
        duration: 200,
        easing: "ease-in-out",
        fill: "forwards",
      });
    }

    function toggle() {
      open ? hide() : show();
    }

    function handleOutsideClick(e: PointerEvent) {
      if (open && container && !container.contains(e.target as Node)) {
        hide();
      }
    }

    function handleContainerClick(e: PointerEvent) {
      // Only toggle on clicks that aren't on the link itself
      const target = e.target as HTMLElement;
      if (!target.closest('a')) {
        toggle();
      }
    }
</script>

<svelte:window onpointerdown={handleOutsideClick} />

<div class="flex gap-2 items-start">
    <!-- home button -->
    <!-- <a class="block p-1 transition hover:bg-ctp-surface0/80 hover:cursor-pointer rounded mr-2 {path == "/" ? "hidden" : ""}" href="/">
        <House />
    </a> -->

    <div class="h-[36px] relative hover:cursor-default">
        {@html Teatowel}
    </div>
    <div
        class="relative pb-12"
        bind:this={container}
        onmouseenter={show}
        onmouseleave={hide}
        onpointerdown={handleContainerClick}
        role="button"
        tabindex="0"
    >
        <div class="flex gap-4 items-center h-9 hover:cursor-default" bind:this={text}>
            <div
                class="h-[36px] w-[96px] relative drop-shadow-glow"
                class:drop-shadow-ctp-green={path == "/"}
                class:drop-shadow-ctp-blue={path.startsWith("/music")}
            >
                {#if path.startsWith("/music")}
                    {@html Music}
                {:else}
                    {@html Home}
                {/if}
            </div>

            <!-- dropdown -->
            <div class="w-5" bind:this={dropdown}>
                {@html Dropdown}
            </div>
        </div>

        <!-- the hidden dropdown of options -->
        <div
            class="absolute top-10 transition-all duration-200 ease-out"
            class:pointer-events-none={!open}
            class:opacity-0={!open}
            class:translate-y-[-4px]={!open}
            class:opacity-100={open}
            class:translate-y-0={open}
        >
            <!-- svelte-ignore a11y_mouse_events_have_key_events -->
            <a
                class="block hover:cursor-pointer transition h-[36px]"
                class:grayscale={!musicHovered}
                href={path == "/" ? "/music" : "/"}
                onmouseenter={() => musicHovered = true}
                onmouseleave={() => musicHovered = false}
            >
                {#if !path.startsWith("/music")}
                    {@html Music}
                {:else}
                    {@html Home}
                {/if}
            </a>
        </div>
    </div>
</div>
