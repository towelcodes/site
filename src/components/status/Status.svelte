<script lang="ts">
    import { onMount } from "svelte";
    import { blur, fade } from "svelte/transition";
    import {
        defaultLanyardResponse,
        type Activity,
        type LanyardResponse,
        type Spotify,
        type WebsocketData,
        type WebsocketHello,
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

    let presence_data = $state(defaultLanyardResponse);
    let online_status = $derived(presence_data.discord_status);
    let online = $derived(online_status !== "offline");
    let activites: Activity[] | undefined = $derived(presence_data.activities);
    let listening_to_spotify = $derived(presence_data.listening_to_spotify);
    let spotify = $derived(presence_data.spotify);

    /**
     * TODO: use websocket
     */
    onMount(async () => {
        const endpoint = `https://api.lanyard.rest/v1/users/${uid}`;

        // connect to the websocket
        const socket = new WebSocket("wss://api.lanyard.rest/socket");
        socket.addEventListener("message", (e) => {
            const data = JSON.parse(e.data) as WebsocketData;
            switch (data.op) {
                case 0:
                    const t = data.t!;
                    if (t == "INIT_STATE") {
                        const update = data.d as any;
                        presence_data = update[uid] as LanyardResponse;
                        break;
                    } else if (t == "PRESENCE_UPDATE") {
                        presence_data = data.d as LanyardResponse;
                    }
                case 1: // hello
                    socket.send(
                        JSON.stringify({
                            op: 2,
                            d: { subscribe_to_ids: [uid] },
                        }),
                    );
                    const d = data.d as WebsocketHello;
                    setInterval(
                        () => socket.send(JSON.stringify({ op: 3 })),
                        d.heartbeat_interval,
                    );
                    break;
                default:
                    console.warn("unknown op:", data.op);
            }
        });
    });
</script>

<div class="flex flex-col gap-2 font-pixel">
    {#key online_status}
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
    {/key}

    {#if listening_to_spotify}
        <div transition:fade={{ duration: 200 }}>
            {#if spotify}
                <div class="relative">
                    <div class="text-ctp-subtext0">listening to</div>
                    {#key spotify.song}
                        <div
                            class="relative left-5"
                            transition:blur={{ duration: 200 }}
                        >
                            {spotify!.song}
                            <span class="text-ctp-subtext0">-</span>
                            {spotify!.artist}
                        </div>
                    {/key}
                </div>
            {/if}
        </div>
    {/if}
</div>
