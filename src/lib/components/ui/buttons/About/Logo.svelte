<script lang="ts">
    import favicon from "$lib/assets/favicon.svg";


    import SvgIcon from "../../SvgIcon/SvgIcon.svelte";

    import { initState } from "$lib/state";
    import { dialog } from "../../Dialog";

    import About from "./About.svelte";

    const onclick = () => {
        dialog.activate({ id: "info", content: infoDialog, isDrawWindow: false })
    };
</script>

{#snippet infoDialog()}
    <About />
{/snippet}

<button {onclick} class={["z-100 fixed top-0 left-0 m-2 flex-center gap-2", (!initState.completed() || dialog.isOpened()) ? "pointer-events-none" : "pointer-events-auto cursor-pointer"]}>
    <img src={favicon} alt="logo" width={40} height={40} class="">
    <p class={["transition-all duration-300", (dialog.isOpened()) ? "text-2xl" : "hidden xs:block text-sm xs:text-xl", (!initState.completed()) && "text-base-light"]}>画像編集ツール</p>
</button>
