<script setup>
import { ref, watch, onMounted } from 'vue'
import { createHighlighter } from 'shiki'
import { useI18n } from '@/lib/i18n'
import { Check, Copy } from 'lucide-vue-next'

const { t } = useI18n()

const props = defineProps({
  code: {
    type: String,
    required: true
  }
})

const html = ref('')
const highlighter = ref(null)
const copied = ref(false)

onMounted(async () => {
  highlighter.value = await createHighlighter({
    themes: ['vitesse-dark'],
    langs: ['bash', 'batch'],
  })
  updateCode()
})

watch(() => props.code, () => {
  updateCode()
})

const updateCode = () => {
  if (!highlighter.value) return
  try {
    const lang = props.code.startsWith('reinstall.bat') || props.code.startsWith('certutil') ? 'batch' : 'bash'
    html.value = highlighter.value.codeToHtml(props.code, {
      lang,
      theme: 'vitesse-dark'
    })
  } catch (e) {
    console.error(e)
    html.value = `<pre><code>${props.code}</code></pre>`
  }
}

const copy = async () => {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div class="relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#121212] shadow-2xl transition-all duration-300">
    <!-- Mac-like Header -->
    <div class="flex h-9 items-center justify-between border-b border-white/5 bg-[#1e1e1e] px-4">
      <div class="flex gap-2">
        <div class="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
        <div class="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
        <div class="h-3 w-3 rounded-full bg-[#27c93f]"></div>
      </div>
      <div class="text-xs font-medium text-muted-foreground font-mono">reinstall.sh</div>
      <button 
        @click="copy" 
        class="flex items-center gap-1.5 text-xs font-medium transition-colors"
        :class="copied ? 'text-primary' : 'text-muted-foreground hover:text-white'"
      >
        <Check v-if="copied" class="w-3.5 h-3.5" />
        <Copy v-else class="w-3.5 h-3.5" />
        {{ copied ? t('copied') : t('copy') }}
      </button>
    </div>
    
    <!-- Terminal Body -->
    <div class="p-4 overflow-x-auto min-h-[120px]">
      <div v-if="html" v-html="html" class="font-mono text-sm leading-relaxed tracking-wide !bg-transparent"></div>
      <div v-else class="text-muted-foreground font-mono text-sm">Initializing terminal...</div>
    </div>
  </div>
</template>

<style>
/* Override shiki background to be transparent to let our container handle it */
.shiki {
  background-color: transparent !important;
  margin: 0;
  padding: 0;
}
</style>
