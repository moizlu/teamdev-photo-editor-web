<script lang="ts">
    import { Logo } from "$lib/components/ui/buttons/About";
    import AddPhotoButton from "$lib/components/ui/buttons/AddPhotoButton";
    import DownloadPhotoButton from "$lib/components/ui/buttons/DownloadPhotoButton";
    import DeleteAllButton from "$lib/components/ui/buttons/DeleteAllButton";
    import SettingsButton from "$lib/components/ui/buttons/SettingsButton";
    import { AboutButton } from "$lib/components/ui/buttons/About";

    import { canvasState } from "$lib/state";
</script>

<Logo />

<header class="z-98 h-full flex justify-end items-center px-5 bg-base shadow-black shadow-md/100">
    <div class="w-30 xs:60 sm:w-90 flex justify-end items-center gap-2">
        <AddPhotoButton class="hidden xs:flex-1" />
        <DownloadPhotoButton class={["xs:flex-1", (!canvasState.isCreated()) && "invisible"]} />
        <DeleteAllButton class={["sm:flex-1", (!canvasState.isCreated()) && "invisible"]} />
        <SettingsButton class="flex-none" />
        <AboutButton class="flex-none" />
    </div>
</header>