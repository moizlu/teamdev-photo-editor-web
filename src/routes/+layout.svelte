<script lang="ts">
	import './layout.css';

	import favicon from '$lib/assets/favicon.svg';

	import SplashScreen from '$lib/components/sections/SplashScreen/SplashScreen.svelte';
	import Header from '$lib/components/sections/Header/Header.svelte';
	import Footer from '$lib/components/sections/Footer/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<meta property="og:url" content="https://imageeditor.moizlu.com/" />
	<meta property="og:type" content="profile" />
	<meta property="og:title" content="画像編集ツール(Web版)" />
	<meta property="og:image" content="https://imageeditor.moizlu.com/ogp.png" />
	<meta property="og:site_name" content="画像編集ツール(Web版)" />
	<meta property="og:description" content="画像編集ツール(Web版)" />

    <title>画像編集ツール(Web版)</title>
</svelte:head>

<SplashScreen />

<Header />
<div class="w-dvw h-dvh pt-[55px]">
	{@render children()}
</div>
<Footer />
