<script setup lang="ts">
interface ImgTextProps {
  image?: string
  class?: string
  style?: Record<string, string>
}

defineSlots<{
  default?: () => any
}>()

const props = defineProps<ImgTextProps>()
</script>

<template>
  <div :class="`ImgText ${props.class || ''}`" :style="props.style">
    <figure v-if="image"><img :src="image" alt=""/></figure>
    <div class="">
      <slot />
    </div>
  </div>
</template>
