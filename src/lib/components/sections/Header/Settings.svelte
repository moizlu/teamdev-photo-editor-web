<script lang="ts">
    import { fade } from "svelte/transition";

    import settingsLight from "$lib/assets/images/light/settings.svg";
    import settingsDark from "$lib/assets/images/dark/settings.svg";

    import crossLight from "$lib/assets/images/light/cross.svg";
    import crossDark from "$lib/assets/images/dark/cross.svg";

    import Icon from "$lib/components/ui/Icon/Icon.svelte";

    let isOpened = $state(false);
</script>

<button type="button" aria-label="settings" onclick={() => isOpened = !isOpened} title="設定" class="z-11 transition-all duration-200 hover:rotate-30 active:rotate-60 hover:scale-130 active:scale-130">
    {#if isOpened}
        <Icon lightSrc={crossLight} darkSrc={crossDark} width={40} height={40} class="w-full h-full" />
    {:else}
        <Icon lightSrc={settingsLight} darkSrc={settingsDark} width={40} height={40} class="w-full h-full" />
    {/if}
</button>

{#if isOpened}
    <div transition:fade={{ duration: 200 }} class="z-10 fixed top-0 left-0 pt-[60px] w-dvw h-dvh bg-base">
    </div>
{/if}
