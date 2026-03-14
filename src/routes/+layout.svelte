<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/styles/RatioKit.scss';
	import '$lib/styles/tailwind.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
</svelte:head>

{@render children()}
