<script lang="ts">
	let { image, className = '' }: { image?: string; className?: string } = $props();
</script>

<figure class={className}>
	{#if image}
		<img src={image} alt="" />
	{/if}
</figure>
