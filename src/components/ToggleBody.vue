<script setup lang="ts">
interface ToggleBodyProps {
  class?: string
}

defineSlots<{
  default?: () => any
}>()

const props = defineProps<ToggleBodyProps>()
</script>

<template>
  <div :class="props.class || ''">
    <slot />
  </div>
</template>
