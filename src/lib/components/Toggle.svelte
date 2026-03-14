<script lang="ts">
	let { className = '' }: { className?: string } = $props();
</script>

<details class="Toggle {className}">
	<slot />
</details>
