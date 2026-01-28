<script setup>
import { ref } from 'vue'
import ConfigPanel from './components/ConfigPanel.vue'
import TerminalPreview from './components/TerminalPreview.vue'
import { Terminal, Github, Languages } from 'lucide-vue-next'
import { useI18n } from '@/lib/i18n'

const { t, toggleLocale, locale } = useI18n()
const command = ref('bash reinstall.sh debian 12')
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0a] text-foreground font-sans selection:bg-primary/30 relative overflow-hidden">
    <!-- Ambient Background -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px]"></div>
    </div>

    <div class="relative z-10 container mx-auto px-4 py-8 h-screen flex flex-col max-h-screen">
      <!-- Header -->
      <header class="flex items-center justify-between mb-8 shrink-0">
        <div class="flex items-center gap-3">
          <div class="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl shadow-lg shadow-primary/20">
            <Terminal class="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 class="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              {{ t('title') }}
            </h1>
            <p class="text-xs text-muted-foreground font-medium">{{ t('subtitle') }}</p>
          </div>
        </div>
        
        <div class="flex items-center gap-3">
          <button 
            @click="toggleLocale"
            class="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-2 rounded-full border border-white/5"
            :title="locale === 'en' ? 'Switch to Chinese' : '切换到英文'"
          >
            <Languages class="w-4 h-4" />
            <span>{{ locale === 'en' ? 'CN' : 'EN' }}</span>
          </button>
          
          <a href="https://github.com/bin456789/reinstall" target="_blank" class="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/5">
            <Github class="w-4 h-4" />
            <span>{{ t('github') }}</span>
          </a>
        </div>
      </header>

      <!-- Main Content -->
      <main class="grid lg:grid-cols-12 gap-8 flex-1 min-h-0">
        <!-- Left: Configuration -->
        <div class="lg:col-span-5 flex flex-col min-h-0">
          <ConfigPanel v-model="command" />
        </div>

        <!-- Right: Preview -->
        <div class="lg:col-span-7 flex flex-col justify-center min-h-0">
          <div class="space-y-6 sticky top-8">
            <div class="space-y-2">
              <h2 class="text-lg font-medium text-white/90 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                {{ t('generatedCommand') }}
              </h2>
              <p class="text-sm text-muted-foreground">
                {{ t('generatedCommandDesc') }}
              </p>
            </div>
            
            <TerminalPreview :code="command" />

            <!-- Quick Tips -->
            <div class="grid grid-cols-2 gap-4 mt-8">
              <div class="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                 <h4 class="text-sm font-semibold text-white mb-1">{{ t('rootAccess') }}</h4>
                 <p class="text-xs text-muted-foreground">{{ t('rootAccessDesc') }}</p>
              </div>
              <div class="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                 <h4 class="text-sm font-semibold text-white mb-1">{{ t('dataBackup') }}</h4>
                 <p class="text-xs text-muted-foreground">{{ t('dataBackupDesc') }}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer class="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground shrink-0">
        <div class="flex items-center gap-4">
          <span>{{ t('footerCopyright') }}</span>
          <span class="w-1 h-1 rounded-full bg-white/20"></span>
          <a href="https://github.com/bin456789/reinstall/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">{{ t('footerLicense') }}</a>
        </div>
        <div class="flex items-center gap-4">
          <span>{{ t('footerHosted') }}</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<style>
/* Global overrides if needed */
body {
  overflow: hidden; /* Prevent body scroll, handle inside main */
}
@media (max-width: 1024px) {
  body {
    overflow: auto;
  }
}
</style>
