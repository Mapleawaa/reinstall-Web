<script setup>
import { TabsList } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  class: String,
})
</script>

<template>
  <TabsList
    v-bind="$attrs"
    :class="cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
      props.class
    )"
  >
    <slot />
  </TabsList>
</template>
