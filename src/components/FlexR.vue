<script setup lang="ts">
interface FlexRProps {
  class?: string
  style?: Record<string, string>
}

defineSlots<{
  default?: () => any
}>()

const props = defineProps<FlexRProps>()
</script>

<template>
  <div :class="`FlexR ${props.class || ''}`" :style="props.style">
    <slot />
  </div>
</template>
