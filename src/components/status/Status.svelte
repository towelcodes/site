<script lang="ts">
    import { onMount } from "svelte";
    import type {
        Activity,
        LanyardResponse,
        Spotify,
        WebsocketData,
    } from "./activity_types";

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
                    return JSON.parse(cached);
                }
            }
        }

        const res = await (await fetch(endpoint)).json();
        localStorage.setItem(endpoint, JSON.stringify(res));
        localStorage.setItem(
            `expiry ${endpoint}`,
            `${Date.now() / 1000 + MAX_AGE}`,
        );
        return res;
    }

    let online_status = $state("offline");
    let online = $derived(online_status !== "offline");

    let activites: Activity[] | undefined = $state();
    let listening_to_spotify = $state(false);
    let spotify: Spotify | undefined = $state();
    let root: HTMLDivElement | undefined = $state();

    /**
     * TODO: use websocket
     */
    onMount(async () => {
        const endpoint = `https://api.lanyard.rest/v1/users/${uid}`;

        // connect to the websocket
        const socket = new WebSocket("wss://api.lanyard.rest/socket");
        socket.addEventListener("open", (e) => {
            console.info("socket opened");
        });
        socket.addEventListener("message", (e) => {
            console.info(`socket: ${e.data}`);
            const data = JSON.parse(e.data) as WebsocketData;
            switch (data.op) {
                case 0:
                    break;
                default:
                    console.warn("unknown op:", data.op);
            }
        });

        const presence_data = (await getCached(endpoint)) as LanyardResponse;
        online_status = presence_data.data.discord_status;
        activites = presence_data.data.activities;
        listening_to_spotify = presence_data.data.listening_to_spotify;
        spotify = presence_data.data.spotify;
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

<div class="flex flex-col gap-2 font-pixel">
    <div class="w-min px-2 flex">
        <svg
            class="{online
                ? 'fill-ctp-green'
                : 'fill-ctp-surface0'} w-3 h-3 self-center mr-2 transition-colors"
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="6" cy="6" r="6" />
        </svg>
        {online_status}
    </div>

    {#if listening_to_spotify}
        <div>
            {#if spotify}
                <div class="relative">
                    <div class="text-ctp-subtext0">listening to</div>
                    <div class="relative left-5">
                        {spotify!.song}
                        <span class="text-ctp-subtext0">-</span>
                        {spotify!.artist}
                    </div>
                </div>
            {/if}
        </div>
    {/if}
</div>
