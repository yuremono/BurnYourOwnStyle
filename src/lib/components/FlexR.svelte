<script lang="ts">
	let { className = '' }: { className?: string } = $props();
</script>

<div class="FlexR {className}">
	<slot />
</div>
