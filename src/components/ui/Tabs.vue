<script setup>
import { TabsRoot } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  class: String,
  modelValue: String,
  defaultValue: String
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <TabsRoot
    v-bind="$attrs"
    :model-value="modelValue"
    :default-value="defaultValue"
    @update:model-value="emit('update:modelValue', $event)"
    :class="cn('', props.class)"
  >
    <slot />
  </TabsRoot>
</template>
