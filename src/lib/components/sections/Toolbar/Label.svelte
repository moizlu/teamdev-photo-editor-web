<script lang="ts">
    import type { ClassValue } from "svelte/elements";

    import { activeTab, isModalOperating } from "./state.svelte";

    import { basicInfo } from "./Tabs/Basic";
    import { effectsInfo } from "./Tabs/Effects";
    import { aiInfo } from "./Tabs/Ai";
    // import { settingsInfo } from "./Tabs/Settings";

    import SvgIcon from "$lib/components/ui/SvgIcon/SvgIcon.svelte";

    const tabs = [
        basicInfo,
        effectsInfo,
        aiInfo,
        // settingsInfo
    ];

    interface Props {
        class?: ClassValue;
    }
    const { class: className }: Props = $props();

    const onLabelClicked = (id: string) => {
        return () => {
            activeTab.set(id);
        };
    };
</script>

<div class={[className, "mx-auto w-[95%] lg:w-full lg:pt-2"]}>
    <div class="m-2 flex lg:flex-col justify-start items-center gap-5">
        {#each tabs as tab}
            <button onclick={onLabelClicked(tab.id)} disabled={isModalOperating.get() && !activeTab.isActive(tab.id)} class={["h-15 flex-col-center button-general", (tab.id === "settings") ? "w-15" : "max-lg:flex-1 lg:w-15", !isModalOperating.get() && ((activeTab.isActive(tab.id)) ? "scale-110 bg-turn-on/30 shadow-lg/100" : "bg-base hover:bg-label/10 active:bg-label/50")]}>
                <SvgIcon Svg={tab.icon} size={30} />
                <p class="text-[10px]">{tab.name}</p>
            </button>
        {/each}
    </div>
</div>
