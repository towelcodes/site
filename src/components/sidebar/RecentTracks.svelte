<script lang="ts">
    import { onMount } from "svelte";
    import { blur } from "svelte/transition";

    interface ListenBrainzRecording {
        artist_name: string;
        artists: {
            artist_credit_name: string;
            artist_mbid?: string;
        }[];
        release_name: string;
        track_name: string;
        listen_count: number;
        recording_mbid: string;
        release_mbid: string;
        caa_release_mbid: string;
        caa_recording_mbid: string;
    }

    interface SongsResponse {
        payload: {
            count: number;
            total_recording_count: number;
            recordings: ListenBrainzRecording[];
        };
    }

    interface AlbumsResponse {
        payload: {
            count: number;
            total_recording_count: number;
            recordings: ListenBrainzRecording[];
        };
    }

    let recordings: ListenBrainzRecording[] = $state([]);

    // load data
    onMount(async () => {
        const res = await fetch("/music/songs");
        if (!res.ok) {
            console.error(res);
            return;
        }
        const data = (await res.json()) as SongsResponse;
        recordings = data.payload.recordings;
    });
</script>

<div>
    <div class="font-pixel text-ctp-subtext0">top tracks this week</div>

    <div class="w-xs h-16 bg-ctp-surface0 border-ctp-surface0 border-4 rounded">
        {#if recordings.length === 0}
            <div
                class="flex h-full items-center px-2 font-pixel text-ctp-subtext0"
            >
                nothing here currently
            </div>
        {:else}
            <div
                class="inline-flex items-center justify-center gap-2 h-full w-max"
            >
                {#each recordings as recording}
                    <div
                        class="group relative shrink-0 flex gap-1 hover:scale-125 border-0 border-ctp-surface1 hover:border-2 transition ease-out"
                        transition:blur={{ duration: 200 }}
                    >
                        <object
                            data={recording.release_mbid
                                ? `https://coverartarchive.org/release/${recording.caa_release_mbid}/front-250`
                                : "/placeholder.svg"}
                            aria-label={recording.track_name}
                            class="h-14 w-14 overflow-clip transition-opacity opacity-0 bg-ctp-crust"
                            onload={(e) => {
                                e.currentTarget.classList.replace(
                                    "opacity-0",
                                    "opacity-100",
                                );
                            }}
                        >
                            <img
                                src="/placeholder.svg"
                                alt={recording.track_name}
                            />
                        </object>
                        <div
                            class="hidden group-hover:block absolute top-16 w-min text-nowrap text-tiny font-pixel *:bg-ctp-surface2 *:px-1"
                        >
                            <div class="leading-2.5">
                                {recording.track_name}
                            </div>
                            <div class="text-ctp-subtext0">
                                {recording.artist_name}
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>
