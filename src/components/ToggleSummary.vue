<script setup lang="ts">
interface ToggleSummaryProps {
  class?: string
}

defineSlots<{
  default?: () => any
}>()

const props = defineProps<ToggleSummaryProps>()
</script>

<template>
  <summary :class="props.class || ''">
    <slot />
  </summary>
</template>
