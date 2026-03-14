<script setup lang="ts">
interface FlexRImageProps {
  image?: string
  class?: string
}

const props = defineProps<FlexRImageProps>()
</script>

<template>
  <figure :class="props.class || ''">
    <img v-if="image" :src="image" alt=""/>
  </figure>
</template>
