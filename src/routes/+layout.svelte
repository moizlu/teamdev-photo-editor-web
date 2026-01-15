<script lang="ts">
	import { onMount } from 'svelte';

	import './layout.css';

	import { greeting } from '$lib/utils';
	import { init as initState } from '$lib/state';

	import favicon from '$lib/assets/favicon.svg';

	import SplashScreen from '$lib/components/sections/SplashScreen';
	import Header from '$lib/components/sections/Header';
	import { DialogEntrypoint } from '$lib/components/ui/Dialog';

	import { canvasState } from '$lib/state';

	let { children } = $props();

	onMount(async () => {
		await initState();
		greeting();
	});

	onMount(() => {
		window.addEventListener('beforeunload', (event) => {
			if (canvasState.isCreated()) {
				// event.preventDefault();
			}
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<meta property="og:url" content="https://photoeditor.moizlu.com/" />
	<meta property="og:type" content="profile" />
	<meta property="og:title" content="画像編集ツール(Web版)" />
	<meta property="og:image" content="https://photoeditor.moizlu.com/ogp.png" />
	<meta property="og:site_name" content="画像編集ツール(Web版)" />
	<meta property="og:description" content="画像編集ツール(Web版)" />

    <title>画像編集ツール(Web版)</title>
</svelte:head>

<DialogEntrypoint />

<SplashScreen />

<div class="w-dvw h-dvh grid grid-rows-[60px_1fr]">
	<Header />
	{@render children()}
</div>
