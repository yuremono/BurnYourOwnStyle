<script lang="ts">
	let { className = '' }: { className?: string } = $props();
</script>

<summary class={className}>
	<slot />
</summary>
