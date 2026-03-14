<script lang="ts">
	let { image, className = '' }: { image?: string; className?: string } = $props();
</script>

<div class="item {className}">
	{#if image}
		<figure><img src={image} alt="" /></figure>
	{/if}
	<div>
		<slot />
	</div>
</div>
