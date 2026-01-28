<script setup>
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps({
  modelValue: [String, Number],
  class: String,
})

const emit = defineEmits(['update:modelValue'])

const model = useVModel(props, 'modelValue', emit)
</script>

<template>
  <input
    v-model="model"
    :class="cn(
      'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
      props.class
    )"
  />
</template>
