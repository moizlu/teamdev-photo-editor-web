<script lang="ts">
    import { fade } from 'svelte/transition';

    import LoadingIcon from '$lib/assets/icons/loading.svelte';

    import { initState } from '$lib/state';

    import SvgIcon from '$lib/components/ui/SvgIcon/SvgIcon.svelte';
    import { onMount } from 'svelte';

    let isOpened = $state(true);

    let progressBar: HTMLProgressElement | undefined = $state(undefined);

    onMount(() => {
        // 処理が早すぎるとチラチラするから必ず少し待つ
        const onInitialized = () => {
            setTimeout(() => {
                isOpened = false;
            }, 300);
        }

        document.addEventListener('initialized', onInitialized);

        return () => {
            document.removeEventListener('initialized', onInitialized);
        }
    });
</script>

{#if isOpened}
    <div transition:fade={{duration: 300}} class="fixed w-dvw h-dvh top-0 left-0 z-100 background-gradient text-base-light">
        <div class="w-full h-full flex flex-col-center">
            <div class="w-80 h-fit p-4 rounded-xl flex flex-col-center bg-black/50">
                <div class="flex-center">
                    <SvgIcon Svg={LoadingIcon} size={50} autoChangeByTheme={false} class="animate-spin fill-base-light" />
                    <p class="text-3xl">読み込み中</p>
                </div>
                <p class="text-lg">{initState.getProgress().progress}%</p>
                <progress bind:this={progressBar} value={initState.getProgress().progress} max={100} class="m-3"></progress>
                <p class="text-md">{initState.getProgress().msg}</p>
            </div>
        </div>
    </div>
{/if}

<style>
    @reference "../../../../routes/layout.css";

    @keyframes gradient-move {
        from {
            background-position: top left;
        }
        50% {
            background-position: bottom right;
        }
        to {
            background-position: top left;
        }
    }
    .background-gradient {
        background-size: 250%;
        background-image: var(--logo-gradient);
        animation: gradient-move 2s ease-out infinite;
    }

    progress::-webkit-progress-bar {
        @apply bg-transparent rounded-sm;
    }
</style>
