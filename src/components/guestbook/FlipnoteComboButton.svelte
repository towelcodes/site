<script>
    import FlipnoteButton from "./FlipnoteButton.svelte";
    let { iconL, iconR, labelL = iconL, labelR = iconR } = $props();
</script>

<FlipnoteButton icon="undo" label="undo" />
<FlipnoteButton icon="redo" label="redo" />