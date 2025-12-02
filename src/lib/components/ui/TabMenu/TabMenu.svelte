<script lang="ts">
    import type { Component, Snippet } from "svelte";
    import type { ClassValue } from "svelte/elements";

    import { slide } from "svelte/transition";

    export interface Tab {
        header: Snippet,
        content: Component
    }
    interface Props {
        tabs: Record<string, Tab>;
        activeTabId?: string;
        class?: ClassValue;
        tabClass?: ClassValue;
        tabItemClass?: ClassValue;
        activeTabItemClass?: ClassValue;
        contentClass?: ClassValue;
        contentItemClass?: ClassValue;
    }
    let { tabs, activeTabId = $bindable(),
          class: className, tabClass, tabItemClass , activeTabItemClass,
          contentClass, contentItemClass }: Props = $props();

    const onHeaderClick = (key: string) => {
        return () => {
            activeTabId = key;
        };
    };
</script>

<div role="toolbar" class={className}>
    <div class={tabClass}>
        {#each Object.entries(tabs) as [key, tab] (key)}
            {#if tab.header}
                <button type="button" aria-label="editor-tab" onclick={onHeaderClick(key)} class={[tabItemClass, (activeTabId === key) ? activeTabItemClass : ""]}>
                    {@render tab.header()}
                </button>
            {/if}
        {/each}
    </div>
    <div class={[contentClass, "relative"]}>
        {#each Object.entries(tabs) as [key, tab] (key)}
            <div class={[contentItemClass, "absolute top-0 left-0 w-full h-full transition-all duration-200", ((activeTabId === key)) ? "opacity-100" : "opacity-0 -translate-x-5 pointer-events-none"]}>
                <tab.content />
            </div>
            <!-- いちいちDOMから付け消しするとイベントリスナーとかがややこしいことになる -->
            <!-- {#if tab.content && (activeTabId === key)}
                <div transition:slide={{ duration: 300 }} class={contentItemClass}>
                    <tab.content />
                </div>
            {/if} -->
        {/each}
    </div>
</div>
