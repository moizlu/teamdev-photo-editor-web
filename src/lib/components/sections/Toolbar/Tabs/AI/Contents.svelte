<script lang="ts">
    import { inferenceProgress } from "./state.svelte";
    import { BgRemoval } from "./functions";
</script>

<div class="w-full h-full flex flex-col justify-center lg:justify-start items-center">
    <!-- プログレスバー -->
    <div class="p-2">
        <progress value={inferenceProgress._progress} max={100} class={[!inferenceProgress.isProcessing() && "invisible"]}></progress>
    </div>
    <BgRemoval />
</div>