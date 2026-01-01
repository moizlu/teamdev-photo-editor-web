<script lang="ts">
    import { onMount } from "svelte";

    import AddPhotoIcon from "$lib/assets/icons/add-photo.svelte";
    import ArrowIcon from "$lib/assets/icons/arrow.svelte";

    import SvgIcon from "../../SvgIcon/SvgIcon.svelte";
    import { dialog } from "../../Dialog";

    let mouseStalkerDisappearTimer: NodeJS.Timeout | undefined = $state(undefined);
    let mouseStalkerElement: HTMLDivElement | undefined = $state(undefined);

    const activate = () => {
        dialog.activate({ id: "dragging-over", content: draggingOverlay, isDrawWindow: false, priority: 0 });
    }

    const deactivate = () => {
        dialog.deactivate("dragging-over");
    };

    const ondragover = (event: DragEvent) => {
        event.preventDefault();
        activate();

        if (!mouseStalkerElement) { return; }

        const rect = mouseStalkerElement.getBoundingClientRect();

        mouseStalkerElement.style.transform = `translate(${event.clientX - (rect.width / 2)}px, ${event.clientY}px)`;

        clearTimeout(mouseStalkerDisappearTimer);
        mouseStalkerElement.style.opacity = "1";
        mouseStalkerDisappearTimer = setTimeout(() => {
            if (!mouseStalkerElement) { return; }
            mouseStalkerElement.style.opacity = "0";
        }, 100);
    };
    const ondrop = (event: DragEvent) => {
        event.preventDefault();
        dialog.deactivate();
    };
    const onpointerdown = () => { deactivate(); };
    const onpointerleave = () => { deactivate(); }

    onMount(() => {
        document.addEventListener('dragover', ondragover);
        document.addEventListener('drop', ondrop);
        document.addEventListener('pointerdown', onpointerdown);
        document.addEventListener('pointerleave', onpointerleave);

        return () => {
            document.removeEventListener('dragover', ondragover);
            document.removeEventListener('drop', ondrop);
            document.removeEventListener('pointerdown', onpointerdown);
            document.removeEventListener('pointerleave', onpointerleave);
        };
    });
</script>

{#snippet draggingOverlay()}
    <div class="w-full flex-col-center">
        <div class="flex-col-center">
            <div class="arrow-bounce rotate-180"><SvgIcon Svg={ArrowIcon} size={100} /></div>
            <div class="flex-center">
                <div class="arrow-bounce rotate-90"><SvgIcon Svg={ArrowIcon} size={100} /></div>
                <SvgIcon Svg={AddPhotoIcon} size={200} class="" />
                <div class="arrow-bounce rotate-270"><SvgIcon Svg={ArrowIcon} size={100} /></div>
            </div>
            <div class="arrow-bounce rotate-0"><SvgIcon Svg={ArrowIcon} size={100} /></div>
        </div>
        <p class="text-xl sm:text-3xl text-nowrap">ドラッグ&ドロップで画像を追加</p>
    </div>

    <!-- マウスストーカー -->
    <div bind:this={mouseStalkerElement} class="mt-5 pointer-events-none fixed top-0 left-0 transition-opacity duration-300 flex flex-col-center">
        <!-- <SvgIcon Svg={AddPhotoIcon} size={100} class="" />
        <p>+画像を追加</p> -->

        <SvgIcon Svg={AddPhotoIcon} size={60} class="" />
        <p class="text-sm text-nowrap">+画像を追加</p>
    </div>
{/snippet}

<style>
    @keyframes arrow-bounce-keyframe {
        from {
            transform: translate(0, -1rem);
        }

        50% {
            transform: translate(0, 1rem);
        }

        to {
            transform: translate(0, -1rem);
        }
    }

    @keyframes arrow-bounce-small-keyframe {
        from {
            transform: translate(0, -0.3rem);
        }

        50% {
            transform: translate(0, 0.3rem);
        }

        to {
            transform: translate(0, -0.3rem);
        }
    }

    .arrow-bounce {
        animation: arrow-bounce-keyframe 1s ease-in-out infinite;
    }
    /* .arrow-small-bounce {
        animation: arrow-bounce-small-keyframe 1s ease-in-out infinite;
    } */
</style>
