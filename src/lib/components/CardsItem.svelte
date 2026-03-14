<script lang="ts">
	let { image, className = '' }: { image?: string; className?: string } = $props();
</script>

<div class="item gap-0 {className}">
	{#if image}
		<figure><img src={image} alt="" /></figure>
	{/if}
	<div class="p-4 rounded-lg shadow-lg flex-1">
		<slot />
	</div>
</div>
