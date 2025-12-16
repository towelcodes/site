<script lang="ts">
    let { children } = $props();

    let toggleButton: HTMLButtonElement;
    let box: HTMLDivElement;
    let label: HTMLDivElement;
    let close: HTMLDivElement;

    function toggle() {
        let animation = box.animate(
            [
                {
                    transform: `translateX(${expanded ? "0" : "-200"}%)`,
                },
                {
                    transform: `translateX(${expanded ? "-200" : "0"}%)`,
                },
            ],
            {
                duration: 200,
                fill: "both",
                easing: "ease-out",
            },
        );
        if (expanded) {
            animation.onfinish = () => (expanded = false);
        } else {
            expanded = true;
        }
    }

    let expanded = $state(false);
</script>

<aside class="relative top-22">
    <!-- expanded bar -->
    <div class="md:block hidden">
        <div
            bind:this={box}
            class={`rounded border-2 border-ctp-blue absolute top-4 left-8 z-20 md:relative my-2 ${expanded ? "" : "hidden"} md:block bg-ctp-surface0 md:bg-bg`}
        >
            <div
                class="text-xs text-ctp-purple italic font-bold absolute -top-2 px-1 bg-ctp-surface0 md:bg-bg"
            >
                sidebar
            </div>
            <div class="p-2">gulp</div>
            {@render children?.()}
        </div>
    </div>

    <!-- for small viewports -->
    <div
        class="md:hidden relative -left-2 text-xl font-bold italic text-center hover:cursor-default text-nowrap flex flex-col"
    >
        <button
            bind:this={toggleButton}
            onclick={toggle}
            class="sidebar-element"
        >
            nothing playing right now
        </button>
        <button class="sidebar-element"> okokokok </button>
    </div>
</aside>

<style>
    @reference "../styles/global.css";
    @layer components {
        .sidebar-element {
            @apply rounded
            border-2
            border-ctp-subtext0
            mx-2 px-2 pl-2
            backdrop-blur-sm
            text-center
            text-ctp-subtext0
            [writing-mode:vertical-rl]
            overflow-hidden;
        }
    }
</style>
