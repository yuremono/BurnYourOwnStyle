<script setup lang="ts">
interface CardsItemProps {
  image?: string
  class?: string
}

defineSlots<{
  default?: () => any
}>()

const props = defineProps<CardsItemProps>()
</script>

<template>
  <div :class="`item gap-0 ${props.class || ''}`">
    <figure v-if="image"><img :src="image" alt=""/></figure>
    <div class="p-4 rounded-lg shadow-lg flex-1">
      <slot />
    </div>
  </div>
</template>
