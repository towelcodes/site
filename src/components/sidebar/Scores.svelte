<script lang="ts">
    import { onMount } from "svelte";

    interface TachiScore {
        service: string;
        scoreData: {
            grade: string;
            lamp: string;
            score: number;
            judgements: {
                miss: number;
                near: number;
                critical: number;
            };
        };
        calculatedData: {
            VF6: number;
        };
        timeAchieved: number;
    }

    interface TachiSong {
        title: string;
        artist: string;
    }

    interface TachiScores {
        success: boolean;
        body: {
            scores: TachiScore[];
            songs: TachiSong[];
        };
    }

    let scoreData: TachiScores | undefined = $state(undefined);
    let recentScores: [TachiSong, TachiScore][] = $derived.by(() => {
        if (!scoreData) return [];
        return scoreData.body.songs.slice(0, 6).map((e, i) => {
            return [e, scoreData!!.body.scores[i]];
        });
    });

    onMount(async () => {
        const res = await fetch("https://towel.codes/scores");
        if (!res.ok) {
            console.error(res);
            return;
        }
        scoreData = (await res.json()) as TachiScores;
    });
</script>

<div class="font-pixel">
    <i>note: i haven't played much sdvx so i kind of suck</i>
    <div class="bg-ctp-surface0">
        {#if scoreData}
            <div class="flex gap-1">
                {#each recentScores as [song, score]}
                    <div class="bg-ctp-surface1">
                        <div class="text-tiny">
                            <h6>{song.title}</h6>
                            <h6 class="text-ctp-subtext0">{song.artist}</h6>
                        </div>
                        <div class="text-lg">
                            {score.scoreData.grade}
                            {score.scoreData.score}
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            <p>scores are loading...</p>
        {/if}
    </div>
</div>
