<script>
    import DrawableCanvas from "./DrawableCanvas.svelte";
    import GuestbookEntry from "./GuestbookEntry.svelte";
    import {postgrest, hexToU8IntClampedArray} from "../../scripts/db.ts";
    import {onMount} from "svelte";

    let entries = $state();
    onMount(() => {
        postgrest.from("entries").select("*").then(({ data, error }) => {
            if (error) console.error("failed to fetch guestbook entries", error);
            if (data) entries = data;
        });
    });
</script>

<div class="p-2">
    <strong class="font-display text-2xl text-shadow shadow-black text-green highlight highlight-[#7f849c] highlight-variant-7 p-2 m-2">guestbook!!</strong>
    <ul>
        {#each entries as entry}
            <li class="relative h-10">
                <div class="absolute">
                    <GuestbookEntry id={entry.id} time={entry.created_at} from={entry.from} text_content={entry.text_content} img_content={entry.img_content ? hexToU8IntClampedArray(entry.img_content) : undefined}/>
                </div>
            </li>
        {/each}
    </ul>

    <button class="button w-full mx-auto">submit!</button>

    <DrawableCanvas/>

        <!--<form action="{{ API_BASE }}/guestbook" method="POST">-->
        <!--    <label for="guestbook-input-name" hidden>name</label>-->
        <!--    <input type="text" id="guestbook-input-name" placeholder="who are you?">-->

        <!--    <label for="guestbook-input-msg" hidden>message</label>-->
        <!--    <input type="text" id="guestbook-input-msg" placeholder="enter your message here!">-->

        <!--    <input type="submit" id="guestbook-input-submit" value="Submit" class="card clickable hover-zoom"/>-->
        <!--</form>-->
</div>
