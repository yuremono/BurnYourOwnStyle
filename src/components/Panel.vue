<script setup lang="ts">
interface PanelProps {
  class?: string
  style?: Record<string, string>
}

defineSlots<{
  default?: () => any
}>()

const props = defineProps<PanelProps>()
</script>

<template>
  <div :class="`Panel ${props.class || ''}`" :style="props.style">
    <slot />
  </div>
</template>
