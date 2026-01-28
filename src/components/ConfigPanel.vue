<script setup>
import { ref, computed, watch } from 'vue'
import { LINUX_DISTROS, WINDOWS_VERSIONS, WINDOWS_LANGUAGES, COMMON_FLAGS } from '@/constants/distros'
import Tabs from '@/components/ui/Tabs.vue'
import TabsList from '@/components/ui/TabsList.vue'
import TabsTrigger from '@/components/ui/TabsTrigger.vue'
import TabsContent from '@/components/ui/TabsContent.vue'
import Switch from '@/components/ui/Switch.vue'
import Input from '@/components/ui/Input.vue'
import ControlItem from '@/components/ControlItem.vue'
import { Check, Download, ShieldAlert, Server, HardDrive, LifeBuoy, Globe } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

const { t } = useI18n()

const props = defineProps({
  modelValue: String // The generated command
})
const emit = defineEmits(['update:modelValue'])

// --- State ---
const activeTab = ref('linux')

// Linux State
const selectedDistroId = ref('debian')
const selectedVersion = ref('')
const minimalInstall = ref(false)

// Windows State
const winMode = ref('auto') // auto | manual
const winImageName = ref('Windows 11 Enterprise LTSC 2024')
const winLang = ref('zh-cn')
const winIsoUrl = ref('')

// DD State
const ddImageUrl = ref('')

// Common Flags
const passwordEnabled = ref(false)
const password = ref('')
const sshKeyEnabled = ref(false)
const sshKey = ref('')
const sshPort = ref('22')
const webPort = ref('80')
const holdMode = ref('0') // 0=off, 1=ram, 2=disk

// --- Computed ---
const currentDistro = computed(() => LINUX_DISTROS.find(d => d.id === selectedDistroId.value))

// Initialize default version when distro changes
watch(selectedDistroId, (newId) => {
  const distro = LINUX_DISTROS.find(d => d.id === newId)
  if (distro && !distro.isRolling && distro.defaultVersion) {
    selectedVersion.value = distro.defaultVersion
  } else {
    selectedVersion.value = ''
  }
  // Reset specific flags
  minimalInstall.value = false
})

// --- Command Generation ---
const generatedCommand = computed(() => {
  let cmd = 'bash reinstall.sh'

  if (activeTab.value === 'linux') {
    if (!currentDistro.value) return cmd
    
    cmd += ` ${currentDistro.value.cmd || currentDistro.value.id}`
    
    if (currentDistro.value.isCustomImg) {
       // RedHat special case logic if needed, but README says: bash reinstall.sh redhat --img="..."
       // For now simple implementation based on README
    } else if (!currentDistro.value.isRolling && selectedVersion.value) {
      cmd += ` ${selectedVersion.value}`
    }

    if (currentDistro.value.id === 'ubuntu' && minimalInstall.value) {
      cmd += ' --minimal'
    }
  } else if (activeTab.value === 'windows') {
    cmd += ' windows'
    cmd += ` --image-name "${winImageName.value}"`
    
    if (winMode.value === 'auto') {
      cmd += ` --lang ${winLang.value}`
    } else {
      if (winIsoUrl.value) cmd += ` --iso "${winIsoUrl.value}"`
    }
  } else if (activeTab.value === 'dd') {
    cmd += ' dd'
    if (ddImageUrl.value) cmd += ` --img "${ddImageUrl.value}"`
  } else if (activeTab.value === 'rescue') {
    cmd += ' alpine --hold 1'
  } else if (activeTab.value === 'netboot') {
    cmd += ' netboot.xyz'
  }

  // Common Flags (Skip for netboot/rescue if not applicable, but README says "Optional Parameters" exist for most)
  // Rescue supports password, ssh-port, ssh-key.
  // Netboot doesn't list many optional parameters in README explicitly for the netboot command itself, but let's assume standard ones might not apply or be needed. 
  // Actually README says: bash reinstall.sh netboot.xyz. No args listed.
  
  if (activeTab.value !== 'netboot') {
    if (passwordEnabled.value && password.value) {
      cmd += ` --password ${password.value}`
    }
    if (sshKeyEnabled.value && sshKey.value) {
      cmd += ` --ssh-key "${sshKey.value}"`
    }
    if (sshPort.value && sshPort.value !== '22') {
      cmd += ` --ssh-port ${sshPort.value}`
    }
    if (webPort.value && webPort.value !== '80') {
      cmd += ` --web-port ${webPort.value}`
    }
    
    // Hold mode logic
    // For Rescue tab, hold is already 1.
    if (activeTab.value !== 'rescue') {
        if (holdMode.value === '1') cmd += ' --hold 1'
        if (holdMode.value === '2') cmd += ' --hold 2'
    }
  }

  return cmd
})

watch(generatedCommand, (val) => {
  emit('update:modelValue', val)
}, { immediate: true })

</script>

<template>
  <div class="glass-card rounded-2xl p-6 h-full flex flex-col overflow-hidden">
    <Tabs v-model="activeTab" class="w-full h-full flex flex-col">
      <TabsList class="w-full grid grid-cols-5 mb-6 bg-black/20 p-1.5 rounded-xl">
        <TabsTrigger value="linux" class="rounded-lg data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
          <Server class="w-4 h-4 mr-2" /> {{ t('tabLinux') }}
        </TabsTrigger>
        <TabsTrigger value="windows" class="rounded-lg data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
          <img src="https://blogs.windows.com/wp-content/uploads/prod/2022/09/cropped-Windows11IconTransparent512-32x32.png" class="w-4 h-4 mr-2" /> {{ t('tabWindows') }}
        </TabsTrigger>
        <TabsTrigger value="dd" class="rounded-lg data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
          <HardDrive class="w-4 h-4 mr-2" /> {{ t('tabDD') }}
        </TabsTrigger>
        <TabsTrigger value="rescue" class="rounded-lg data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
          <LifeBuoy class="w-4 h-4 mr-2" /> {{ t('tabRescue') }}
        </TabsTrigger>
        <TabsTrigger value="netboot" class="rounded-lg data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
          <Globe class="w-4 h-4 mr-2" /> {{ t('tabNetboot') }}
        </TabsTrigger>
      </TabsList>

      <div class="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
        <!-- Linux Tab -->
        <TabsContent value="linux" class="space-y-6 mt-0">
          <div class="space-y-4">
            <h3 class="text-sm font-medium text-muted-foreground uppercase tracking-wider">{{ t('selectDistro') }}</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              <button
                v-for="distro in LINUX_DISTROS"
                :key="distro.id"
                @click="selectedDistroId = distro.id"
                :class="cn(
                  'flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 text-left',
                  selectedDistroId === distro.id 
                    ? 'bg-primary/10 border-primary/50 ring-1 ring-primary/50' 
                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                )"
              >
                <img :src="distro.logo" :alt="distro.name" class="w-6 h-6 object-contain" />
                <span class="text-sm font-medium" :class="selectedDistroId === distro.id ? 'text-primary' : 'text-foreground'">{{ distro.name }}</span>
              </button>
            </div>
          </div>

          <div v-if="currentDistro && !currentDistro.isRolling" class="space-y-4 animate-in fade-in slide-in-from-top-4">
            <h3 class="text-sm font-medium text-muted-foreground uppercase tracking-wider">{{ t('version') }}</h3>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="ver in currentDistro.versions"
                :key="ver"
                @click="selectedVersion = ver"
                :class="cn(
                  'px-4 py-2 rounded-lg text-sm font-medium border transition-all',
                  selectedVersion === ver
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-muted-foreground'
                )"
              >
                {{ ver }}
              </button>
            </div>
          </div>
          
          <div v-if="currentDistro?.id === 'ubuntu'" class="space-y-4 animate-in fade-in">
             <ControlItem :label="t('minimalInstall')" :description="t('minimalInstallDesc')">
                <Switch :checked="minimalInstall" @update:checked="minimalInstall = $event" />
             </ControlItem>
          </div>
        </TabsContent>

        <!-- Windows Tab -->
        <TabsContent value="windows" class="space-y-6 mt-0">
          <ControlItem :label="t('installationMode')" :description="t('installationModeDesc')">
            <div class="flex bg-muted rounded-lg p-1">
               <button 
                 @click="winMode = 'auto'"
                 :class="cn('px-3 py-1 text-xs rounded-md transition-all', winMode === 'auto' ? 'bg-background shadow text-foreground' : 'text-muted-foreground')"
               >{{ t('auto') }}</button>
               <button 
                 @click="winMode = 'manual'"
                 :class="cn('px-3 py-1 text-xs rounded-md transition-all', winMode === 'manual' ? 'bg-background shadow text-foreground' : 'text-muted-foreground')"
               >{{ t('manual') }}</button>
            </div>
          </ControlItem>

          <ControlItem :label="t('imageName')" :description="t('imageNameDesc')" vertical>
             <Input v-model="winImageName" :placeholder="t('winImageNamePlaceholder')" />
             <!-- Could add a datalist or suggestions here -->
             <div class="flex flex-wrap gap-2 mt-2">
                <span 
                  v-for="s in WINDOWS_VERSIONS.slice(0, 3)" 
                  :key="s" 
                  class="text-[10px] bg-white/5 px-2 py-1 rounded cursor-pointer hover:bg-white/10 text-muted-foreground"
                  @click="winImageName = s"
                >{{ s }}</span>
             </div>
          </ControlItem>

          <div v-if="winMode === 'auto'" class="animate-in fade-in">
            <ControlItem :label="t('language')" :description="t('languageDesc')">
              <select v-model="winLang" class="bg-transparent border border-input rounded-md h-9 text-sm px-2 w-[180px] focus:outline-none focus:border-primary">
                <option v-for="l in WINDOWS_LANGUAGES" :key="l.code" :value="l.code" class="bg-[#1e1e1e]">{{ l.name }}</option>
              </select>
            </ControlItem>
          </div>

          <div v-else class="animate-in fade-in">
            <ControlItem :label="t('isoUrl')" :description="t('isoUrlDesc')" vertical>
              <Input v-model="winIsoUrl" :placeholder="t('isoUrlPlaceholder')" />
            </ControlItem>
          </div>
        </TabsContent>

        <!-- DD Tab -->
        <TabsContent value="dd" class="space-y-6 mt-0">
           <ControlItem :label="t('imageUrl')" :description="t('imageUrlDesc')" vertical>
              <Input v-model="ddImageUrl" :placeholder="t('imageUrlPlaceholder')" />
           </ControlItem>
        </TabsContent>

        <!-- Rescue & Netboot Tabs -->
        <TabsContent value="rescue" class="mt-0">
           <div class="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-200 text-sm flex gap-3">
              <ShieldAlert class="w-5 h-5 shrink-0" />
              <div>
                 <p class="font-bold mb-1">{{ t('rescueTitle') }}</p>
                 <p class="opacity-80">{{ t('rescueDesc') }}</p>
              </div>
           </div>
        </TabsContent>
        
        <TabsContent value="netboot" class="mt-0">
           <div class="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-200 text-sm flex gap-3">
              <Globe class="w-5 h-5 shrink-0" />
              <div>
                 <p class="font-bold mb-1">{{ t('netbootTitle') }}</p>
                 <p class="opacity-80">{{ t('netbootDesc') }}</p>
              </div>
           </div>
        </TabsContent>

        <!-- Common Flags -->
        <div v-if="activeTab !== 'netboot'" class="pt-6 border-t border-white/5 space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <h3 class="text-sm font-medium text-muted-foreground uppercase tracking-wider">{{ t('networkAccess') }}</h3>
          
          <ControlItem :label="t('setPassword')" :description="t('setPasswordDesc')">
             <Switch :checked="passwordEnabled" @update:checked="passwordEnabled = $event" />
          </ControlItem>
          <div v-if="passwordEnabled" class="animate-in fade-in slide-in-from-top-2">
             <Input v-model="password" type="password" :placeholder="t('passwordPlaceholder')" />
          </div>

          <ControlItem :label="t('sshKey')" :description="t('sshKeyDesc')">
             <Switch :checked="sshKeyEnabled" @update:checked="sshKeyEnabled = $event" />
          </ControlItem>
          <div v-if="sshKeyEnabled" class="animate-in fade-in slide-in-from-top-2">
             <Input v-model="sshKey" :placeholder="t('sshKeyPlaceholder')" />
          </div>

          <div class="grid grid-cols-2 gap-4">
             <ControlItem :label="t('sshPort')" :description="t('sshPortDesc')">
                <Input v-model="sshPort" class="w-20 font-mono text-center" />
             </ControlItem>
             <ControlItem :label="t('webPort')" :description="t('webPortDesc')">
                <Input v-model="webPort" class="w-20 font-mono text-center" />
             </ControlItem>
          </div>

          <ControlItem :label="t('holdMode')" :description="t('holdModeDesc')">
              <select v-model="holdMode" class="bg-transparent border border-input rounded-md h-9 text-sm px-2 w-full max-w-[200px] focus:outline-none focus:border-primary">
                <option value="0" class="bg-[#1e1e1e]">{{ t('holdOff') }}</option>
                <option value="1" class="bg-[#1e1e1e]">{{ t('holdRam') }}</option>
                <option value="2" class="bg-[#1e1e1e]">{{ t('holdInstall') }}</option>
              </select>
          </ControlItem>
        </div>
      </div>
    </Tabs>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
</style>
