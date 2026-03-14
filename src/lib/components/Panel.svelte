<script lang="ts">
	let { className = '' }: { className?: string } = $props();
</script>

<div class="Panel {className}">
	<slot />
</div>
