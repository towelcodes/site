<script>
    import {onMount} from "svelte";

    onMount(() => {
      const canvas = document.querySelector("canvas");
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let down = false;
      canvas.addEventListener("mousedown", (e) => {
        down = true;
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor(e.clientX - rect.left);
        const y = Math.floor(e.clientY - rect.top);
        ctx.fillStyle = "#000000";
        ctx.fillRect(x, y, 2, 2);
        const circle = new Path2D();
        circle.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill(circle);
      });

      canvas.addEventListener("mouseup", () => {
        down = false;
      });

      canvas.addEventListener("mousemove", (e) => {
        if (down) {
          const rect = canvas.getBoundingClientRect();
          const x = Math.floor(e.clientX - rect.left);
          const y = Math.floor(e.clientY - rect.top);
          ctx.fillStyle = "#000000";
          ctx.fillRect(x, y, 2, 2);
          const circle = new Path2D();
          circle.arc(x, y, 3, 0, 2 * Math.PI);
          ctx.fill(circle);
        }
      });

      // const id = ctx.createImageData(canvas.width, canvas.height);
    });
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

    <canvas width="190" height="126" class="mx-auto">
        canvas is not supported on your browser.
        please use a text message instead.
    </canvas>

        <!--<form action="{{ API_BASE }}/guestbook" method="POST">-->
        <!--    <label for="guestbook-input-name" hidden>name</label>-->
        <!--    <input type="text" id="guestbook-input-name" placeholder="who are you?">-->

        <!--    <label for="guestbook-input-msg" hidden>message</label>-->
        <!--    <input type="text" id="guestbook-input-msg" placeholder="enter your message here!">-->

        <!--    <input type="submit" id="guestbook-input-submit" value="Submit" class="card clickable hover-zoom"/>-->
        <!--</form>-->
</div>
