<script lang="ts">
    import { onMount } from "svelte";

    let { accent = "ctp-green" } = $props();

    /*
    using lanyard API
    */
    const uid = "951330347541491802";

    interface Spotify {
        album: string;
        album_art_url: string;
        artist: string;
        song: string;
        timestamps: {
            end: number;
            start: number;
        };
        track_id: string;
    }

    interface Activity {
        id: string;
        name: string;
        state: string;
        details: string;
        timestamps: {
            end: number;
            start: number;
        };
        assets: {
            large_image: string;
            large_text: string;
            small_image: string;
            small_text: string;
        };
    }

    interface LanyardResponse {
        success: boolean;
        data: {
            discord_user: {
                avatar: string;
                display_name: string;
                global_name: string;
                id: string;
                username: string;
                primary_guild?: string;
            };
            activities: Activity[];
            discord_status: string;
            listening_to_spotify: boolean;
            spotify?: Spotify;
        };
    }

    let online_status = $state("offline");
    let activites: Activity[] | undefined = $state();
    let listening_to_spotify = $state(false);
    let spotify: Spotify | undefined = $state();
    let root: HTMLDivElement | undefined = $state();

    /**
     * TODO: use websocket
     * TODO: cache API response
     */
    onMount(async () => {
        const endpoint = `https://api.lanyard.rest/v1/users/${uid}`;
        const presence_data = (await (
            await fetch(endpoint)
        ).json()) as LanyardResponse;
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

{#if online_status != "offline" && listening_to_spotify}
    <div
        bind:this={root}
        style="opacity: 0;"
        class="absolute -z-10 border-{accent} border-2 rounded px-2 right-2 -top-7 bg-bg"
    >
        {#if spotify}
            <div class="flex">
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
