<script lang="ts">
    import { fade } from 'svelte/transition';

    import LoadingIcon from '$lib/assets/icons/loading.svelte';

    import { isInitialized } from '$lib/state';

    import SvgIcon from '$lib/components/ui/SvgIcon/SvgIcon.svelte';

    const isOpened = $derived(!isInitialized());
</script>

{#if isOpened}
    <div transition:fade={{duration: 300}} class="fixed w-dvw h-dvh top-0 left-0 z-100 bg-base">
        <div class="w-full h-full flex flex-col justify-center items-center gap-5">
            <p class="text-3xl">読み込み中...</p>
            <SvgIcon Svg={LoadingIcon} size={100} class="animate-spin" />
        </div>
    </div>
{/if}
