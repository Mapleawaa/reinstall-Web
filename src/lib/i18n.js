import { ref, computed } from 'vue'
import { createGlobalState } from '@vueuse/core'

const translations = {
  en: {
    title: "Reinstall Web",
    subtitle: "System Reinstallation Generator",
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
    winImageNamePlaceholder: "Windows 11 Enterprise LTSC 2024"
  },
  zh: {
    title: "Reinstall Web",
    subtitle: "系统重装脚本代码生成器",
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
    winImageNamePlaceholder: "Windows 11 Enterprise LTSC 2024"
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
