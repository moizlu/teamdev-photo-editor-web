<script lang="ts">
    // import { GaussianBlur } from "./functions";

    let factors = $state({
        blur: 0,
        monochrome: false
    });

    const onchange = (name: string) => {
        return () => {
            console.log(name)
        }
    }
</script>

<div class="w-full h-full flex flex-col justify-center lg:justify-start items-center">
    <!-- <GaussianBlur /> -->
     <div class="flex-center gap-1">
        <p>ぼかし</p>
        <input type="range" min={0} max={1} step={0.1} onchange={onchange('blur')} bind:value={factors.blur} class="w-50">
        <p>{factors.blur.toFixed(1)}</p>
     </div>
</div>
