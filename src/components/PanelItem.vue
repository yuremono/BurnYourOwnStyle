<script setup lang="ts">
interface PanelItemProps {
  image?: string
  class?: string
}

defineSlots<{
  default?: () => any
}>()

const props = defineProps<PanelItemProps>()
</script>

<template>
  <div :class="`item ${props.class || ''}`">
    <figure v-if="image"><img :src="image" alt=""/></figure>
    <div>
      <slot />
    </div>
  </div>
</template>
