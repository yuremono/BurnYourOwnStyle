<script setup lang="ts">
interface CardsProps {
  class?: string
  style?: Record<string, string>
}

defineSlots<{
  default?: () => any
}>()

const props = defineProps<CardsProps>()
</script>

<template>
  <div :class="`Cards ${props.class || ''}`" :style="props.style">
    <slot />
  </div>
</template>
