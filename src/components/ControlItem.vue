<script setup>
import Label from './ui/Label.vue'

defineProps({
  label: String,
  description: String,
  vertical: Boolean
})
</script>

<template>
  <div :class="['flex w-full py-4 border-b border-border/40 last:border-0', vertical ? 'flex-col gap-3' : 'items-center justify-between gap-4']">
    <div class="space-y-0.5">
      <Label class="text-base font-medium text-foreground/90">{{ label }}</Label>
      <p v-if="description" class="text-xs text-muted-foreground max-w-[90%]">
        {{ description }}
      </p>
    </div>
    <div :class="[vertical ? 'w-full' : 'shrink-0']">
      <slot />
    </div>
  </div>
</template>
