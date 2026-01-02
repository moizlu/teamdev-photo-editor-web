<script lang="ts">
    import type { IconProps } from './_Icon.svelte';
    import Icon from './_Icon.svelte';

    const props: IconProps = $props();
</script>

<Icon {...props}>
    <path d="M160-160v-200h40v131.69l144-144L372.31-344l-144 144H360v40H160Zm440 0v-40h131.69l-144-144L616-372.31l144 144V-360h40v200H600ZM344-587.69l-144-144V-600h-40v-200h200v40H228.31l144 144L344-587.69Zm272 0L587.69-616l144-144H600v-40h200v200h-40v-131.69l-144 144Z"/>
</Icon>
