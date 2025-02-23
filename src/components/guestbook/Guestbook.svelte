<script>
    import DrawableCanvas from "./DrawableCanvas.svelte";
</script>

<div class="p-2">
    <strong class="font-display text-2xl text-shadow shadow-black text-green highlight highlight-[#7f849c] highlight-variant-7 p-2 m-2">guestbook!!</strong>
    <div id="guestbook-entries">
        <hr>
        <div class="guestbook-entry">
            <div class="guestbook-name">john</div>
            <div class="guestbook-msg">i love you!!1 pls kiss me bro i want u so baddddd :3333</div>
        </div>
        <hr>
        <div class="guestbook-entry">
            <div class="guestbook-name">wooper</div>
            <div class="guestbook-msg">shut up i'm a wooper</div>
        </div>
        <hr>
    </div>

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
