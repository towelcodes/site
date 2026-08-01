<script lang="ts">
    import { onMount } from "svelte";
    import type {
        Activity,
        LanyardResponse,
        Spotify,
        WebsocketData,
    } from "./activity_types";

    let { accent = "ctp-green" } = $props();

    /*
    using lanyard API
    */
    const uid = "951330347541491802";

    const MAX_AGE = 60; // seconds
    async function getCached(endpoint: string): Promise<any> {
        const cached = localStorage.getItem(endpoint);
        if (cached) {
            const expires = localStorage.getItem(`expiry ${endpoint}`);
            if (expires) {
                if (parseInt(expires) > Date.now() / 1000) {
                    return cached;
                }
            }
        }

        const res = await (await fetch(endpoint)).json();
        localStorage.setItem(endpoint, res);
        localStorage.setItem(
            `expiry ${endpoint}`,
            `${Date.now() / 1000 + MAX_AGE}`,
        );
        return res;
    }

    let online_status = $state("offline");
    let activites: Activity[] | undefined = $state();
    let listening_to_spotify = $state(false);
    let spotify: Spotify | undefined = $state();
    let root: HTMLDivElement | undefined = $state();

    /**
     * TODO: use websocket
     */
    onMount(async () => {
        // const endpoint = `https://api.lanyard.rest/v1/users/${uid}`;
        // // connect to the websocket
        // const socket = new WebSocket("wss://api.lanyard.rest/socket");
        // socket.addEventListener("open", (e) => {
        //     console.info("socket opened");
        // });
        // socket.addEventListener("message", (e) => {
        //     console.info(`socket: ${e.data}`);
        //     const data = JSON.parse(e.data) as WebsocketData;
        //     switch (data.op) {
        //         case 0:
        //             break;
        //         default:
        //             console.warn("unknown op:", data.op);
        //     }
        // });
        // const presence_data = (await getCached(endpoint)) as LanyardResponse;
        // online_status = presence_data.data.discord_status;
        // activites = presence_data.data.activities;
        // listening_to_spotify = presence_data.data.listening_to_spotify;
        // spotify = presence_data.data.spotify;
    });

    $effect(() => {
        if (root) {
            const revealKeyframes = [
                {
                    opacity: "0",
                },
                {
                    opacity: "1",
                },
            ];
            root.animate(revealKeyframes, {
                duration: 200,
                fill: "forwards",
            }).play();
        }
    });
</script>

{#if online_status != "offline" && listening_to_spotify}
    <div
        bind:this={root}
        style="opacity: 0;"
        class="absolute -z-10 border-{accent} border-2 rounded px-2 right-2 -top-7 bg-bg"
    >
        {#if spotify}
            <div class="flex font-pixel">
                <span class="text-ctp-subtext0">listening to&nbsp;</span>
                <span>{spotify!.song}</span>
                <span class="text-ctp-subtext0">&nbsp;-&nbsp;</span>
                <span>{spotify!.artist}</span>
            </div>
        {:else}
            <span>online</span>
        {/if}
    </div>
{/if}
