import { ref, computed } from 'vue'
import { createGlobalState } from '@vueuse/core'

const translations = {
  en: {
    title: "Reinstall Web",
    subtitle: "System Reinstallation Generator",
    seoTitle: "Reinstall Web | System Reinstallation Generator",
    seoDescription: "Generate reinstall.sh commands for VPS and dedicated servers. Supports Linux, Windows, DD, rescue mode, and Netboot.xyz.",
    seoKeywords: "reinstall.sh, server reinstall, VPS reinstall, Linux installer, Windows installer, Netboot.xyz, DD image",
    github: "GitHub",
    generatedCommand: "Generated Command",
    generatedCommandDesc: "Run this command in your server's terminal (SSH) to start the reinstallation.",
    rootAccess: "Root Access",
    rootAccessDesc: "Ensure you are logged in as root before running the script.",
    dataBackup: "Data Backup",
    dataBackupDesc: "This script will wipe your entire hard drive. Backup first!",
    copy: "Copy",
    copied: "Copied!",
    footerCopyright: "Copyright © 2025 bin456789 | WebUI By Mapleawaa",
    footerLicense: "MIT License",
    footerHosted: "Hosted on GitHub Pages & Cloudflare Pages",
    
    // Tabs
    tabLinux: "Linux",
    tabWindows: "Windows",
    tabDD: "DD",
    tabRescue: "Rescue",
    tabNetboot: "Netboot",
    
    // Config Panel
    selectDistro: "Select Distro",
    version: "Version",
    minimalInstall: "Minimal Install",
    minimalInstallDesc: "Use minimal Ubuntu image",
    installationMode: "Installation Mode",
    installationModeDesc: "Auto-download ISO or provide custom URL",
    auto: "Auto",
    manual: "Manual",
    imageName: "Image Name",
    imageNameDesc: "Exact name from ISO (e.g., Windows 11 Pro)",
    language: "Language",
    languageDesc: "ISO Language code",
    isoUrl: "ISO URL",
    isoUrlDesc: "Direct link or Magnet link",
    imageUrl: "Image URL",
    imageUrlDesc: "Raw image (.xz, .gz, .vhd) URL",
    
    // Rescue & Netboot descriptions
    rescueTitle: "Rescue Mode (Alpine Live)",
    rescueDesc: "Reboots into Alpine RAM system. Use this to manually fix partitions, rescue data, or install custom systems via SSH.",
    netbootTitle: "Netboot.xyz",
    netbootDesc: "Reboots into netboot.xyz. Use VNC to install a wide variety of OSes interactively.",
    
    // Network & Access
    networkAccess: "Network & Access",
    setPassword: "Set Password",
    setPasswordDesc: "Root/Admin password",
    sshKey: "SSH Key",
    sshKeyDesc: "Public key for passwordless login",
    sshPort: "SSH Port",
    sshPortDesc: "Default: 22",
    webPort: "Web Port",
    webPortDesc: "Default: 80",
    holdMode: "Hold Mode",
    holdModeDesc: "Debug/Manual intervention",
    holdOff: "Off (Auto Reboot)",
    holdRam: "Hold in RAM (No Install)",
    holdInstall: "Hold after Install",
    
    passwordPlaceholder: "SecureP@ssw0rd",
    sshKeyPlaceholder: "ssh-rsa AAAAB3...",
    isoUrlPlaceholder: "https://...",
    imageUrlPlaceholder: "https://example.com/image.raw.xz",
    winImageNamePlaceholder: "Windows 11 Enterprise LTSC 2024",

    // Network Config Section
    networkConfig: "Network Configuration",
    networkConfigDesc: "Static IP or DHCP settings",
    ipAddress: "IP Address",
    ipAddressPlaceholder: "192.168.1.100",
    gateway: "Gateway",
    gatewayPlaceholder: "192.168.1.1",
    netmask: "Netmask",
    netmaskPlaceholder: "255.255.255.0",
    dnsServer: "DNS Server",
    dnsServerPlaceholder: "8.8.8.8",
    ipv6Address: "IPv6 Address",
    ipv6AddressPlaceholder: "2001:db8::1",
    ipv6Gateway: "IPv6 Gateway",
    ipv6GatewayPlaceholder: "2001:db8::ff",
    ipv6Dns: "IPv6 DNS",
    ipv6DnsPlaceholder: "2001:4860:4860::8888",
    dhcpAuto: "DHCP (Auto)",
    dhcpAutoDesc: "Automatically get IP via DHCP",
    macAddress: "MAC Address",
    macAddressPlaceholder: "00:11:22:33:44:55",

    // Disk Config Section
    diskConfig: "Disk Configuration",
    diskConfigDesc: "Target disk and partition settings",
    targetDisk: "Target Disk",
    targetDiskPlaceholder: "/dev/sda",
    bootPartition: "Boot Partition",
    bootPartitionPlaceholder: "/dev/sda1",
    resetBtrfs: "Reset BTRFS",
    resetBtrfsDesc: "Reset BTRFS subvolumes",
    resetLvm: "Reset LVM",
    resetLvmDesc: "Reset LVM volumes",

    // Linux Advanced
    linuxAdvanced: "Linux Advanced",
    customMirror: "Custom Mirror",
    customMirrorPlaceholder: "https://mirror.example.com",
    grubDevice: "GRUB Device",
    grubDevicePlaceholder: "/dev/sda",
    consoleOutput: "Console Output",
    consoleOutputPlaceholder: "tty0",
    cloudKernel: "Cloud Kernel",
    cloudKernelDesc: "Use cloud-optimized kernel",

    // Windows Advanced
    windowsAdvanced: "Windows Advanced",
    virtioDrivers: "VirtIO Drivers URL",
    virtioDriversPlaceholder: "https://example.com/virtio.iso",
    virtioIso: "VirtIO ISO",
    virtioIsoPlaceholder: "https://example.com/virtio.iso",
    autoLogin: "Auto Login",
    autoLoginDesc: "Enable administrator auto-login",
    domainJoin: "Domain Join",
    domainJoinPlaceholder: "domain.example.com",

    // DD Advanced
    ddAdvanced: "DD Advanced",
    imagePassword: "Image Password",
    imagePasswordDesc: "Decryption password for encrypted image",
    imageKey: "Image Key",
    imageKeyDesc: "Decryption key for encrypted image",
    autoMatch: "Auto Match",
    autoMatchPlaceholder: "Match patterns",

    // Other Options
    otherOptions: "Other Options",
    skipDd: "Skip DD",
    skipDdDesc: "Skip DD installation step",
    noReboot: "No Reboot",
    noRebootDesc: "Do not reboot after installation",
    debugMode: "Debug Mode",
    debugModeDesc: "Enable verbose debug output",
    cancelInstall: "Cancel Installation",
    cancelInstallDesc: "Cancel pending reinstallation (run on existing system)",

    // Sections
    sectionNetwork: "Network",
    sectionDisk: "Disk",
    sectionAdvanced: "Advanced",
    sectionOther: "Other",

    // Network Warning
    networkWarningTitle: "Manual Config Risk",
    networkWarningDesc: "Manual IP configuration may cause connection loss if the settings are incorrect. Please verify your network information before proceeding."
  },
  zh: {
    title: "Reinstall Web",
    subtitle: "系统重装脚本代码生成器",
    seoTitle: "Reinstall Web | 系统重装脚本代码生成器",
    seoDescription: "为 VPS 和独立服务器生成 reinstall.sh 重装命令。支持 Linux、Windows、DD、救援模式和 Netboot.xyz。",
    seoKeywords: "reinstall.sh, 服务器重装, VPS 重装, Linux 安装器, Windows 安装器, Netboot.xyz, DD 镜像",
    github: "GitHub",
    generatedCommand: "生成命令",
    generatedCommandDesc: "在服务器终端 (SSH) 运行此命令以开始重装。",
    rootAccess: "Root 权限",
    rootAccessDesc: "运行脚本前请确保已登录为 root 用户。",
    dataBackup: "数据备份",
    dataBackupDesc: "脚本将擦除整个硬盘数据，请务必先备份！",
    copy: "复制",
    copied: "已复制！",
    footerCopyright: "版权所有 © 2025 bin456789 | WebUI By Mapleawaa",
    footerLicense: "MIT 许可证",
    footerHosted: "托管于 GitHub Pages & Cloudflare Pages",
    
    // Tabs
    tabLinux: "Linux",
    tabWindows: "Windows",
    tabDD: "DD",
    tabRescue: "救援模式",
    tabNetboot: "网络启动",
    
    // Config Panel
    selectDistro: "选择发行版",
    version: "版本",
    minimalInstall: "最小化安装",
    minimalInstallDesc: "使用 Ubuntu 最小化镜像",
    installationMode: "安装模式",
    installationModeDesc: "自动下载 ISO 或提供自定义链接",
    auto: "自动",
    manual: "手动",
    imageName: "映像名称",
    imageNameDesc: "ISO 中的确切名称 (如 Windows 11 Pro)",
    language: "语言",
    languageDesc: "ISO 语言代码",
    isoUrl: "ISO 链接",
    isoUrlDesc: "直链或磁力链接",
    imageUrl: "镜像链接",
    imageUrlDesc: "Raw 镜像 (.xz, .gz, .vhd) 链接",
    
    // Rescue & Netboot descriptions
    rescueTitle: "救援模式 (Alpine Live)",
    rescueDesc: "重启进入 Alpine 内存系统。用于手动修复分区、救援数据或通过 SSH 手动安装系统。",
    netbootTitle: "Netboot.xyz",
    netbootDesc: "重启进入 netboot.xyz。使用 VNC 交互式安装多种操作系统。",
    
    // Network & Access
    networkAccess: "网络与访问",
    setPassword: "设置密码",
    setPasswordDesc: "Root/管理员 密码",
    sshKey: "SSH 公钥",
    sshKeyDesc: "用于免密登录的公钥",
    sshPort: "SSH 端口",
    sshPortDesc: "默认: 22",
    webPort: "Web 端口",
    webPortDesc: "默认: 80",
    holdMode: "Hold 模式",
    holdModeDesc: "调试/手动干预",
    holdOff: "关闭 (自动重启)",
    holdRam: "RAM 中暂停 (不安装)",
    holdInstall: "安装后暂停",
    
    passwordPlaceholder: "SecureP@ssw0rd",
    sshKeyPlaceholder: "ssh-rsa AAAAB3...",
    isoUrlPlaceholder: "https://...",
    imageUrlPlaceholder: "https://example.com/image.raw.xz",
    winImageNamePlaceholder: "Windows 11 Enterprise LTSC 2024",

    // Network Config Section
    networkConfig: "网络配置",
    networkConfigDesc: "静态 IP 或 DHCP 设置",
    ipAddress: "IP 地址",
    ipAddressPlaceholder: "192.168.1.100",
    gateway: "网关",
    gatewayPlaceholder: "192.168.1.1",
    netmask: "子网掩码",
    netmaskPlaceholder: "255.255.255.0",
    dnsServer: "DNS 服务器",
    dnsServerPlaceholder: "8.8.8.8",
    ipv6Address: "IPv6 地址",
    ipv6AddressPlaceholder: "2001:db8::1",
    ipv6Gateway: "IPv6 网关",
    ipv6GatewayPlaceholder: "2001:db8::ff",
    ipv6Dns: "IPv6 DNS",
    ipv6DnsPlaceholder: "2001:4860:4860::8888",
    dhcpAuto: "DHCP (自动)",
    dhcpAutoDesc: "通过 DHCP 自动获取 IP",
    macAddress: "MAC 地址",
    macAddressPlaceholder: "00:11:22:33:44:55",

    // Disk Config Section
    diskConfig: "磁盘配置",
    diskConfigDesc: "目标磁盘和分区设置",
    targetDisk: "目标磁盘",
    targetDiskPlaceholder: "/dev/sda",
    bootPartition: "引导分区",
    bootPartitionPlaceholder: "/dev/sda1",
    resetBtrfs: "重置 BTRFS",
    resetBtrfsDesc: "重置 BTRFS 子卷",
    resetLvm: "重置 LVM",
    resetLvmDesc: "重置 LVM 卷",

    // Linux Advanced
    linuxAdvanced: "Linux 高级选项",
    customMirror: "自定义镜像源",
    customMirrorPlaceholder: "https://mirror.example.com",
    grubDevice: "GRUB 设备",
    grubDevicePlaceholder: "/dev/sda",
    consoleOutput: "控制台输出",
    consoleOutputPlaceholder: "tty0",
    cloudKernel: "云内核",
    cloudKernelDesc: "使用云优化内核",

    // Windows Advanced
    windowsAdvanced: "Windows 高级选项",
    virtioDrivers: "VirtIO 驱动链接",
    virtioDriversPlaceholder: "https://example.com/virtio.iso",
    virtioIso: "VirtIO ISO",
    virtioIsoPlaceholder: "https://example.com/virtio.iso",
    autoLogin: "自动登录",
    autoLoginDesc: "启用管理员自动登录",
    domainJoin: "加域",
    domainJoinPlaceholder: "domain.example.com",

    // DD Advanced
    ddAdvanced: "DD 高级选项",
    imagePassword: "镜像密码",
    imagePasswordDesc: "加密镜像解密密码",
    imageKey: "镜像密钥",
    imageKeyDesc: "加密镜像解密密钥",
    autoMatch: "自动匹配",
    autoMatchPlaceholder: "匹配模式",

    // Other Options
    otherOptions: "其他选项",
    skipDd: "跳过 DD",
    skipDdDesc: "跳过 DD 安装步骤",
    noReboot: "禁止重启",
    noRebootDesc: "安装后不重启",
    debugMode: "调试模式",
    debugModeDesc: "启用详细调试输出",
    cancelInstall: "取消重装",
    cancelInstallDesc: "取消待执行的重装 (在现有系统上运行)",

    // Sections
    sectionNetwork: "网络",
    sectionDisk: "磁盘",
    sectionAdvanced: "高级",
    sectionOther: "其他",

    // Network Warning
    networkWarningTitle: "手动配置风险",
    networkWarningDesc: "手动配置 IP 地址可能导致失联，如设置错误将无法连接服务器。请务必确认网络信息准确后再执行！"
  }
}

export const useI18n = createGlobalState(() => {
  // Default to English, or check navigator.language if needed
  const locale = ref('en')
  
  // Simple check for browser language on init
  if (typeof navigator !== 'undefined' && navigator.language.startsWith('zh')) {
    locale.value = 'zh'
  }

  const t = (key) => {
    return translations[locale.value][key] || key
  }

  const toggleLocale = () => {
    locale.value = locale.value === 'en' ? 'zh' : 'en'
  }

  return {
    locale,
    t,
    toggleLocale
  }
})
