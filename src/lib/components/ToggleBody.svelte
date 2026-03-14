<script lang="ts">
	let { className = '' }: { className?: string } = $props();
</script>

<div class={className}>
	<slot />
</div>
