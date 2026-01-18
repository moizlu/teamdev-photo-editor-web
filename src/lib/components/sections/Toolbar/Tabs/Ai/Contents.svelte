<script lang="ts">
    import LoadingIcon from "$lib/assets/icons/loading.svelte";

    import SvgIcon from "$lib/components/ui/SvgIcon/SvgIcon.svelte";

    import { inferenceProgress } from "./state.svelte";
    import { BgRemoval } from "./functions";
</script>

<div class="w-full h-full flex flex-col justify-center lg:justify-start items-center">
    <div class={["transition-all duration-300 p-2 flex-center", (!inferenceProgress.isProcessing()) && "opacity-0"]}>
        <SvgIcon Svg={LoadingIcon} size={30} class="animate-spin" />
        <p>推論を実行中...</p>
    </div>
    <BgRemoval />
</div>