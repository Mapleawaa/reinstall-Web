<script setup>
import { ref, computed, watch } from 'vue'
import { LINUX_DISTROS, WINDOWS_VERSIONS, WINDOWS_LANGUAGES, COMMON_FLAGS, NETWORK_FLAGS, DISK_FLAGS, LINUX_FLAGS, WINDOWS_FLAGS, DD_FLAGS, OTHER_FLAGS } from '@/constants/distros'
import Tabs from '@/components/ui/Tabs.vue'
import TabsList from '@/components/ui/TabsList.vue'
import TabsTrigger from '@/components/ui/TabsTrigger.vue'
import TabsContent from '@/components/ui/TabsContent.vue'
import Switch from '@/components/ui/Switch.vue'
import Input from '@/components/ui/Input.vue'
import ControlItem from '@/components/ControlItem.vue'
import { Check, Download, ShieldAlert, Server, HardDrive, LifeBuoy, Globe, Network, Cpu, Settings, ChevronDown, ChevronRight } from 'lucide-vue-next'
import { cn, getSimpleIcon } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

const { t } = useI18n()

const props = defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])

// --- State ---
const activeTab = ref('linux')

// Linux State
const selectedDistroId = ref('debian')
const selectedVersion = ref('')
const minimalInstall = ref(false)

// Windows State
const winMode = ref('auto')
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
const holdMode = ref('0')

// Network State
const useDhcp = ref(false)
const ip = ref('')
const gateway = ref('')
const netmask = ref('')
const dns = ref('')
const ipv6 = ref('')
const ip6Gateway = ref('')
const ip6Dns = ref('')
const mac = ref('')

// Disk State
const disk = ref('')
const boot = ref('')
const resetBtrfs = ref(false)
const resetLvm = ref(false)

// Linux Advanced
const mirror = ref('')
const grub = ref('')
const console = ref('')
const cloud = ref(false)

// Windows Advanced
const drivers = ref('')
const virtio = ref('')
const autologin = ref(false)
const ad = ref('')

// DD Advanced
const imgPassword = ref('')
const imgKey = ref('')
const imgMatch = ref('')

// Other Options
const noDd = ref(false)
const noReboot = ref(false)
const debug = ref(false)

// Section collapse state
const showNetwork = ref(false)
const showDisk = ref(false)
const showAdvanced = ref(false)

// --- Computed ---
const currentDistro = computed(() => LINUX_DISTROS.find(d => d.id === selectedDistroId.value))

const getDistroIcon = (slug) => {
  return getSimpleIcon(slug, 24)
}

watch(selectedDistroId, (newId) => {
  const distro = LINUX_DISTROS.find(d => d.id === newId)
  if (distro && !distro.isRolling && distro.defaultVersion) {
    selectedVersion.value = distro.defaultVersion
  } else {
    selectedVersion.value = ''
  }
  minimalInstall.value = false
})

// --- Command Generation ---
const generatedCommand = computed(() => {
  let cmd = 'bash reinstall.sh'

  if (activeTab.value === 'linux') {
    if (!currentDistro.value) return cmd
    
    cmd += ` ${currentDistro.value.cmd || currentDistro.value.id}`
    
    if (currentDistro.value.isCustomImg) {
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
  } else if (activeTab.value === 'cancel') {
    cmd = 'bash reinstall.sh reset'
  }

  // Network
  if (activeTab.value !== 'netboot' && activeTab.value !== 'cancel') {
    if (useDhcp.value) {
      cmd += ' --dhcp'
    } else {
      if (ip.value) cmd += ` --ip ${ip.value}`
      if (gateway.value) cmd += ` --gateway ${gateway.value}`
      if (netmask.value) cmd += ` --netmask ${netmask.value}`
      if (dns.value) cmd += ` --dns ${dns.value}`
      if (ipv6.value) cmd += ` --ipv6 ${ipv6.value}`
      if (ip6Gateway.value) cmd += ` --ip6-gateway ${ip6Gateway.value}`
      if (ip6Dns.value) cmd += ` --ip6-dns ${ip6Dns.value}`
    }
    if (mac.value) cmd += ` --mac ${mac.value}`
  }

  // Disk (Linux/DD)
  if ((activeTab.value === 'linux' || activeTab.value === 'dd') && activeTab.value !== 'cancel') {
    if (disk.value) cmd += ` --disk ${disk.value}`
    if (boot.value) cmd += ` --boot ${boot.value}`
    if (resetBtrfs.value) cmd += ' --reset-btrfs'
    if (resetLvm.value) cmd += ' --reset-lvm'
  }

  // Common Flags
  if (activeTab.value !== 'netboot' && activeTab.value !== 'cancel') {
    if (passwordEnabled.value && password.value) {
      cmd += ` --password "${password.value}"`
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
    if (activeTab.value !== 'rescue') {
      if (holdMode.value === '1') cmd += ' --hold 1'
      if (holdMode.value === '2') cmd += ' --hold 2'
    }
  }

  // Linux Advanced
  if (activeTab.value === 'linux' && activeTab.value !== 'cancel') {
    if (mirror.value) cmd += ` --mirror ${mirror.value}`
    if (grub.value) cmd += ` --grub ${grub.value}`
    if (console.value) cmd += ` --console ${console.value}`
    if (cloud.value) cmd += ' --cloud'
  }

  // Windows Advanced
  if (activeTab.value === 'windows' && activeTab.value !== 'cancel') {
    if (drivers.value) cmd += ` --drivers "${drivers.value}"`
    if (virtio.value) cmd += ` --virtio "${virtio.value}"`
    if (autologin.value) cmd += ' --autologin'
    if (ad.value) cmd += ` --ad "${ad.value}"`
  }

  // DD Advanced
  if (activeTab.value === 'dd' && activeTab.value !== 'cancel') {
    if (imgPassword.value) cmd += ` --img-password "${imgPassword.value}"`
    if (imgKey.value) cmd += ` --img-key "${imgKey.value}"`
    if (imgMatch.value) cmd += ` --img-match ${imgMatch.value}`
  }

  // Other Options
  if (activeTab.value !== 'cancel') {
    if (noDd.value) cmd += ' --no-dd'
    if (noReboot.value) cmd += ' --no-reboot'
    if (debug.value) cmd += ' --debug'
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
      <TabsList class="w-full grid grid-cols-6 mb-6 bg-black/20 p-1.5 rounded-xl">
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
        <TabsTrigger value="cancel" class="rounded-lg data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
          <ShieldAlert class="w-4 h-4 mr-2" /> {{ t('cancelInstall') }}
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
                <span v-if="getDistroIcon(distro.logo)" class="w-6 h-6" :class="selectedDistroId === distro.id ? 'text-primary' : 'text-white/60'" v-html="getDistroIcon(distro.logo)"></span>
                <span v-else class="w-6 h-6 flex items-center justify-center text-xs font-bold" :class="selectedDistroId === distro.id ? 'text-primary' : 'text-white/60'">{{ distro.name.charAt(0) }}</span>
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

        <!-- Rescue Tab -->
        <TabsContent value="rescue" class="mt-0">
           <div class="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-200 text-sm flex gap-3">
              <ShieldAlert class="w-5 h-5 shrink-0" />
              <div>
                 <p class="font-bold mb-1">{{ t('rescueTitle') }}</p>
                 <p class="opacity-80">{{ t('rescueDesc') }}</p>
              </div>
           </div>
        </TabsContent>

        <!-- Netboot Tab -->
        <TabsContent value="netboot" class="mt-0">
           <div class="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-200 text-sm flex gap-3">
              <Globe class="w-5 h-5 shrink-0" />
              <div>
                 <p class="font-bold mb-1">{{ t('netbootTitle') }}</p>
                 <p class="opacity-80">{{ t('netbootDesc') }}</p>
              </div>
           </div>
        </TabsContent>

        <!-- Cancel Tab -->
        <TabsContent value="cancel" class="mt-0">
           <div class="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex gap-3">
              <ShieldAlert class="w-5 h-5 shrink-0" />
              <div>
                 <p class="font-bold mb-1">{{ t('cancelInstall') }}</p>
                 <p class="opacity-80">{{ t('cancelInstallDesc') }}</p>
              </div>
           </div>
        </TabsContent>

        <!-- Network Section (Linux/Windows/DD/Rescue) -->
        <div v-if="activeTab !== 'netboot' && activeTab !== 'cancel'" class="pt-6 border-t border-white/5 space-y-4">
          <button @click="showNetwork = !showNetwork" class="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wider hover:text-white transition-colors w-full">
            <component :is="showNetwork ? ChevronDown : ChevronRight" class="w-4 h-4" />
            <Network class="w-4 h-4" />
            {{ t('networkConfig') }}
          </button>

          <div v-if="showNetwork" class="space-y-4 pl-6 animate-in fade-in">
            <div v-if="!useDhcp" class="p-3 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2">
              <ShieldAlert class="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <div>
                <p class="font-semibold text-amber-300">{{ t('networkWarningTitle') }}</p>
                <p class="mt-1 opacity-80">{{ t('networkWarningDesc') }}</p>
              </div>
            </div>

            <ControlItem :label="t('dhcpAuto')" :description="t('dhcpAutoDesc')">
               <Switch :checked="useDhcp" @update:checked="useDhcp = $event" />
            </ControlItem>

            <div v-if="!useDhcp" class="space-y-4 animate-in fade-in">
              <div class="grid grid-cols-2 gap-4">
                <ControlItem :label="t('ipAddress')" vertical>
                  <Input v-model="ip" :placeholder="t('ipAddressPlaceholder')" />
                </ControlItem>
                <ControlItem :label="t('gateway')" vertical>
                  <Input v-model="gateway" :placeholder="t('gatewayPlaceholder')" />
                </ControlItem>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <ControlItem :label="t('netmask')" vertical>
                  <Input v-model="netmask" :placeholder="t('netmaskPlaceholder')" />
                </ControlItem>
                <ControlItem :label="t('dnsServer')" vertical>
                  <Input v-model="dns" :placeholder="t('dnsServerPlaceholder')" />
                </ControlItem>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <ControlItem :label="t('ipv6Address')" vertical>
                  <Input v-model="ipv6" :placeholder="t('ipv6AddressPlaceholder')" />
                </ControlItem>
                <ControlItem :label="t('ipv6Gateway')" vertical>
                  <Input v-model="ip6Gateway" :placeholder="t('ipv6GatewayPlaceholder')" />
                </ControlItem>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <ControlItem :label="t('ipv6Dns')" vertical>
                  <Input v-model="ip6Dns" :placeholder="t('ipv6DnsPlaceholder')" />
                </ControlItem>
                <ControlItem :label="t('macAddress')" vertical>
                  <Input v-model="mac" :placeholder="t('macAddressPlaceholder')" />
                </ControlItem>
              </div>
            </div>
          </div>
        </div>

        <!-- Disk Section (Linux/DD) -->
        <div v-if="activeTab === 'linux' || activeTab === 'dd'" class="pt-6 border-t border-white/5 space-y-4">
          <button @click="showDisk = !showDisk" class="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wider hover:text-white transition-colors w-full">
            <component :is="showDisk ? ChevronDown : ChevronRight" class="w-4 h-4" />
            <HardDrive class="w-4 h-4" />
            {{ t('diskConfig') }}
          </button>

          <div v-if="showDisk" class="space-y-4 pl-6 animate-in fade-in">
            <div class="grid grid-cols-2 gap-4">
              <ControlItem :label="t('targetDisk')" vertical>
                <Input v-model="disk" :placeholder="t('targetDiskPlaceholder')" />
              </ControlItem>
              <ControlItem :label="t('bootPartition')" vertical>
                <Input v-model="boot" :placeholder="t('bootPartitionPlaceholder')" />
              </ControlItem>
            </div>
            <ControlItem :label="t('resetBtrfs')" :description="t('resetBtrfsDesc')">
               <Switch :checked="resetBtrfs" @update:checked="resetBtrfs = $event" />
            </ControlItem>
            <ControlItem :label="t('resetLvm')" :description="t('resetLvmDesc')">
               <Switch :checked="resetLvm" @update:checked="resetLvm = $event" />
            </ControlItem>
          </div>
        </div>

        <!-- Advanced Section -->
        <div v-if="activeTab !== 'netboot' && activeTab !== 'cancel'" class="pt-6 border-t border-white/5 space-y-4">
          <button @click="showAdvanced = !showAdvanced" class="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wider hover:text-white transition-colors w-full">
            <component :is="showAdvanced ? ChevronDown : ChevronRight" class="w-4 h-4" />
            <Settings class="w-4 h-4" />
            {{ t('sectionAdvanced') }}
          </button>

          <div v-if="showAdvanced" class="space-y-6 pl-6 animate-in fade-in">
            <!-- Common -->
            <div class="space-y-4">
              <h4 class="text-xs font-medium text-muted-foreground uppercase tracking-wider">{{ t('networkAccess') }}</h4>
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

              <ControlItem v-if="activeTab !== 'rescue'" :label="t('holdMode')" :description="t('holdModeDesc')">
                  <select v-model="holdMode" class="bg-transparent border border-input rounded-md h-9 text-sm px-2 w-full max-w-[200px] focus:outline-none focus:border-primary">
                    <option value="0" class="bg-[#1e1e1e]">{{ t('holdOff') }}</option>
                    <option value="1" class="bg-[#1e1e1e]">{{ t('holdRam') }}</option>
                    <option value="2" class="bg-[#1e1e1e]">{{ t('holdInstall') }}</option>
                  </select>
              </ControlItem>
            </div>

            <!-- Linux Advanced -->
            <div v-if="activeTab === 'linux'" class="space-y-4 pt-4 border-t border-white/5">
              <h4 class="text-xs font-medium text-muted-foreground uppercase tracking-wider">{{ t('linuxAdvanced') }}</h4>
              <ControlItem :label="t('customMirror')" vertical>
                <Input v-model="mirror" :placeholder="t('customMirrorPlaceholder')" />
              </ControlItem>
              <ControlItem :label="t('grubDevice')" vertical>
                <Input v-model="grub" :placeholder="t('grubDevicePlaceholder')" />
              </ControlItem>
              <ControlItem :label="t('consoleOutput')" vertical>
                <Input v-model="console" :placeholder="t('consoleOutputPlaceholder')" />
              </ControlItem>
              <ControlItem :label="t('cloudKernel')" :description="t('cloudKernelDesc')">
                 <Switch :checked="cloud" @update:checked="cloud = $event" />
              </ControlItem>
            </div>

            <!-- Windows Advanced -->
            <div v-if="activeTab === 'windows'" class="space-y-4 pt-4 border-t border-white/5">
              <h4 class="text-xs font-medium text-muted-foreground uppercase tracking-wider">{{ t('windowsAdvanced') }}</h4>
              <ControlItem :label="t('virtioDrivers')" vertical>
                <Input v-model="drivers" :placeholder="t('virtioDriversPlaceholder')" />
              </ControlItem>
              <ControlItem :label="t('virtioIso')" vertical>
                <Input v-model="virtio" :placeholder="t('virtioIsoPlaceholder')" />
              </ControlItem>
              <ControlItem :label="t('autoLogin')" :description="t('autoLoginDesc')">
                 <Switch :checked="autologin" @update:checked="autologin = $event" />
              </ControlItem>
              <ControlItem :label="t('domainJoin')" vertical>
                <Input v-model="ad" :placeholder="t('domainJoinPlaceholder')" />
              </ControlItem>
            </div>

            <!-- DD Advanced -->
            <div v-if="activeTab === 'dd'" class="space-y-4 pt-4 border-t border-white/5">
              <h4 class="text-xs font-medium text-muted-foreground uppercase tracking-wider">{{ t('ddAdvanced') }}</h4>
              <ControlItem :label="t('imagePassword')" :description="t('imagePasswordDesc')" vertical>
                <Input v-model="imgPassword" type="password" :placeholder="t('imagePasswordDesc')" />
              </ControlItem>
              <ControlItem :label="t('imageKey')" :description="t('imageKeyDesc')" vertical>
                <Input v-model="imgKey" :placeholder="t('imageKeyDesc')" />
              </ControlItem>
              <ControlItem :label="t('autoMatch')" vertical>
                <Input v-model="imgMatch" :placeholder="t('autoMatchPlaceholder')" />
              </ControlItem>
            </div>

            <!-- Other Options -->
            <div class="space-y-4 pt-4 border-t border-white/5">
              <h4 class="text-xs font-medium text-muted-foreground uppercase tracking-wider">{{ t('otherOptions') }}</h4>
              <ControlItem :label="t('skipDd')" :description="t('skipDdDesc')">
                 <Switch :checked="noDd" @update:checked="noDd = $event" />
              </ControlItem>
              <ControlItem :label="t('noReboot')" :description="t('noRebootDesc')">
                 <Switch :checked="noReboot" @update:checked="noReboot = $event" />
              </ControlItem>
              <ControlItem :label="t('debugMode')" :description="t('debugModeDesc')">
                 <Switch :checked="debug" @update:checked="debug = $event" />
              </ControlItem>
            </div>
          </div>
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
