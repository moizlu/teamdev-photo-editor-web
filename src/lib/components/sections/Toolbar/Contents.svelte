<script lang="ts">
    import type { ClassValue } from "svelte/elements";

    import { activeTab, isModalOperating } from "./state.svelte";

    import { basicInfo } from "./Tabs/Basic";
    import { effectsInfo } from "./Tabs/Effects";
    import { aiInfo } from "./Tabs/AI";
    import { settingsInfo } from "./Tabs/Settings";

    interface Props {
        class?: ClassValue;
    }
    const { class: className }: Props = $props();

    const tabs = [
        basicInfo,
        effectsInfo,
        aiInfo,
        settingsInfo
    ];
</script>

<div class={[className, "overflow-auto p-2"]}>
    <div class="relative w-full h-full">
        {#each tabs as tab}
            <div class={["w-full h-full transition-all duration-300", (activeTab.isActive(tab.id)) ? "static pointer-events-auto translate-0 opacity-100" : "w-full pointer-events-none absolute top-0 left-0 max-lg:-translate-x-5 lg:translate-y-5 opacity-0"]}>
                <tab.contents />
            </div>
        {/each}
    </div>
</div>
