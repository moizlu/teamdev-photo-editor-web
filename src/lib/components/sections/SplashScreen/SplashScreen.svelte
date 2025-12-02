<script lang="ts">
    import loadingLight from "$lib/assets/images/light/loading.svg";
    import loadingDark from "$lib/assets/images/dark/loading.svg";

    import { fade } from "svelte/transition";

    import Icon from "$lib/components/ui/Icon/Icon.svelte";
    import { onMount } from "svelte";

    let isReady = false;

    onMount(() => {
        isReady = true;
    })
</script>

{#if !isReady}
    <div transition:fade={{ duration: 300 }} class="fixed top-0 h-screen w-screen z-100000 bg-base flex-col-center">
        <p class="text-2xl">読み込み中...</p>
        <Icon lightSrc={loadingLight} darkSrc={loadingDark} width={100} height={100} fetchpriority="high" class="animate-spin" />
    </div>
{/if}
