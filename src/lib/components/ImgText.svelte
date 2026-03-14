<script lang="ts">
	let { image, className = '' }: { image?: string; className?: string } = $props();
</script>

<div class="ImgText {className}">
	{#if image}
		<figure><img src={image} alt="" /></figure>
	{/if}
	<div class="">
		<slot />
	</div>
</div>
