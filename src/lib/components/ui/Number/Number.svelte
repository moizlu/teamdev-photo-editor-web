
<script lang="ts">
    const LONG_PRESS_DURATION = 500;
    const INTERVAL = 100;

    import type { HTMLInputAttributes } from "svelte/elements";

    import arrowLight from "$lib/assets/images/light/arrow.svg";
    import arrowDark from "$lib/assets/images/dark/arrow.svg";

    import minusLight from "$lib/assets/images/light/minus.svg";
    import minusDark from "$lib/assets/images/dark/minus.svg";
    import plusLight from "$lib/assets/images/light/plus.svg";
    import plusDark from "$lib/assets/images/dark/plus.svg";

    import Icon from "../Icon/Icon.svelte";
    import { onMount } from "svelte";

    interface Props extends Omit<HTMLInputAttributes, 'value'> {
        value?: number;
    }
    let { value = $bindable(0), step, class: className, ...props }: Props = $props();

    const changeEvent = new Event('change', { bubbles: true });

    step = Number(step);
    if (!step) {
        step = 1;
    }

    let inputElement: HTMLInputElement | undefined = $state(undefined);

    let longPressTimerId: NodeJS.Timeout | undefined = $state(undefined);
    let contInputTimerId: NodeJS.Timeout | undefined = $state(undefined);
    let spinButtonUppedTimer: NodeJS.Timeout | undefined = $state(undefined);

    const clearTimers = () => {
        clearTimeout(longPressTimerId);
        clearInterval(contInputTimerId);
        longPressTimerId = undefined;
        contInputTimerId = undefined;
    }

    const onDecrementDown = () => {
        value -= step;

        longPressTimerId = setTimeout(() => {
            contInputTimerId = setInterval(() => {
                value -= step;

                // inputElement?.dispatchEvent(changeEvent);
                // inputElement?.dispatchEvent(inputEvent);
            }, INTERVAL);
        }, LONG_PRESS_DURATION);
    };

    const onIncrementDown = () => {
        value += step;

        longPressTimerId = setTimeout(() => {
            contInputTimerId = setInterval(() => {
                value += step;

                // inputElement?.dispatchEvent(changeEvent);
                // inputElement?.dispatchEvent(inputEvent);
            }, INTERVAL);
        }, LONG_PRESS_DURATION);
    };

    const onSpinButtonUpped = () => {
        clearTimeout(spinButtonUppedTimer);
        spinButtonUppedTimer = setTimeout(() => {
            inputElement?.dispatchEvent(changeEvent);
        }, 100);
        clearTimers();
    };
</script>

<div class="flex items-center">
    <input type="number" bind:this={inputElement} bind:value={value} class={[className, "h-10"]} {...props}>

    <button type="button" aria-label="decrement" onpointerdown={onDecrementDown} onpointerup={onSpinButtonUpped} onpointerleave={clearTimers} class="cursor-pointer button-general mx-1">
        <Icon lightSrc={minusLight} darkSrc={minusDark} width={50} height={50} />
    </button>
    <button type="button" aria-label="increment" onpointerdown={onIncrementDown} onpointerup={onSpinButtonUpped} onpointerleave={clearTimers} class="cursor-pointer button-general mx-1">
        <Icon lightSrc={plusLight} darkSrc={plusDark} width={50} height={50} />
    </button>
</div>