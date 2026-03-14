<script setup lang="ts">
interface ToggleProps {
  class?: string
  style?: Record<string, string>
}

defineSlots<{
  default?: () => any
}>()

const props = defineProps<ToggleProps>()
</script>

<template>
  <details :class="`Toggle ${props.class || ''}`" :style="props.style">
    <slot />
  </details>
</template>
