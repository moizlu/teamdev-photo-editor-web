<script lang="ts">
    import type { ClassValue, HTMLImgAttributes } from "svelte/elements";

    interface Props extends Omit<HTMLImgAttributes, "src"> {
        lightSrc: string;
        darkSrc: string;

        imgClassName?: ClassValue;
        lightImgClassName?: ClassValue;
        darkImgClassName?: ClassValue;
    }
    const { lightSrc, darkSrc, imgClassName, lightImgClassName, darkImgClassName, class: className, ...props }: Props = $props();

    const transition = "transition-opacity duration-300";
</script>

<div class={[className, "relative pointer-events-none"]}>
    <img src={lightSrc} class={[imgClassName, lightImgClassName, transition, "absolute opacity-100 dark:opacity-0"]} {...props} />
    <img src={darkSrc} class={[imgClassName, darkImgClassName, transition, "opacity-0 dark:opacity-100"]} {...props} />
</div>
