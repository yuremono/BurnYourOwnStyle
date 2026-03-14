<script lang="ts">
	let { className = '' }: { className?: string } = $props();
</script>

<div class="Cards {className}">
	<slot />
</div>
