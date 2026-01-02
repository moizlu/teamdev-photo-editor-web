<script lang="ts">
    import DevicesIcon from "$lib/assets/icons/devices.svelte";
    import LightIcon from "$lib/assets/icons/light.svelte";
    import DarkIcon from "$lib/assets/icons/dark.svelte";
    import CloseIcon from "$lib/assets/icons/close.svelte";

    import SvgIcon from "../../SvgIcon/SvgIcon.svelte";

    import { dialog } from "../../Dialog";

    import type { SystemTheme } from "$lib/state";
    import { theme } from "$lib/state";


    const onChangeThemeRadio = () => {
        theme.set((document.querySelector('input[name="theme"]:checked') as HTMLInputElement)?.value as SystemTheme);
    }
</script>

<div class="relative flex-col-center">
    <button onclick={() => dialog.deactivate()} title="閉じる" class="absolute top-0 right-0 cursor-pointer">
        <SvgIcon Svg={CloseIcon} size={60} />
    </button>

    <h1 class="text-4xl text-center my-2">設定</h1>
    <form class="w-full flex flex-col gap-2 justify-center items-stretch text-xl">
        <p class="text-2xl text-center">テーマカラー</p>
        <label class="flex justify-start">
            <input type="radio" name="theme" value="system" checked={theme.getRaw() === "system"} onchange={onChangeThemeRadio}>
            <SvgIcon Svg={DevicesIcon} size={30} class="flex-none" />
            <p class="flex-1 text-center mx-2">システム</p>
        </label>
        <label class="flex justify-start">
            <input type="radio" name="theme" value="light" checked={theme.getRaw() === "light"} onchange={onChangeThemeRadio}>
            <SvgIcon Svg={LightIcon} size={30} class="flex-none" />
            <p class="flex-1 text-center mx-2">ライトモード</p>
        </label>
        <label class="flex justify-start">
            <input type="radio" name="theme" value="dark" checked={theme.getRaw() === "dark"} onchange={onChangeThemeRadio}>
            <SvgIcon Svg={DarkIcon} size={30} class="flex-none" />
            <p class="flex-1 text-center mx-2">ダークモード</p>
        </label>
    </form>
</div>