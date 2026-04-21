export const LINUX_DISTROS = [
  {
    id: "alpine",
    name: "Alpine Linux",
    logo: "alpinelinux",
    versions: ["3.23", "3.22", "3.21", "3.20"],
    defaultVersion: "3.23"
  },
  {
    id: "debian",
    name: "Debian",
    logo: "debian",
    versions: ["13", "12", "11", "10", "9"],
    defaultVersion: "12"
  },
  {
    id: "ubuntu",
    name: "Ubuntu",
    logo: "ubuntu",
    versions: ["25.10", "24.04", "22.04", "20.04", "18.04", "16.04"],
    defaultVersion: "24.04",
    flags: [
      { id: "minimal", label: "Minimal Install", arg: "--minimal" }
    ]
  },
  {
    id: "kali",
    name: "Kali Linux",
    logo: "kalilinux",
    versions: [],
    isRolling: true
  },
  {
    id: "centos",
    name: "CentOS Stream",
    logo: "centos",
    versions: ["10", "9"],
    defaultVersion: "9"
  },
  {
    id: "alma",
    name: "AlmaLinux",
    cmd: "almalinux",
    logo: "almalinux",
    versions: ["10", "9", "8"],
    defaultVersion: "9"
  },
  {
    id: "rocky",
    name: "Rocky Linux",
    cmd: "rocky",
    logo: "rockylinux",
    versions: ["10", "9", "8"],
    defaultVersion: "9"
  },
  {
    id: "fedora",
    name: "Fedora",
    logo: "fedora",
    versions: ["43", "42"],
    defaultVersion: "42"
  },
  {
    id: "openeuler",
    name: "openEuler",
    logo: "openeuler",
    versions: ["25.09", "24.03", "22.03", "20.03"],
    defaultVersion: "24.03"
  },
  {
    id: "opensuse",
    name: "openSUSE",
    logo: "opensuse",
    versions: ["tumbleweed", "16.0", "15.6"],
    defaultVersion: "15.6"
  },
  {
    id: "arch",
    name: "Arch Linux",
    logo: "archlinux",
    versions: [],
    isRolling: true
  },
  {
    id: "gentoo",
    name: "Gentoo",
    logo: "gentoo",
    versions: [],
    isRolling: true
  },
  {
    id: "nixos",
    name: "NixOS",
    logo: "nixos",
    versions: ["25.11"],
    defaultVersion: "25.11"
  },
  {
    id: "oracle",
    name: "Oracle Linux",
    logo: "oracle",
    versions: ["10", "9", "8"],
    defaultVersion: "9"
  },
  {
    id: "anolis",
    name: "Anolis OS",
    logo: "anolis",
    versions: ["23", "8", "7"],
    defaultVersion: "8"
  },
  {
    id: "opencloudos",
    name: "OpenCloudOS",
    logo: "opencloudos",
    versions: ["23", "9", "8"],
    defaultVersion: "9"
  },
  {
    id: "aosc",
    name: "AOSC OS",
    logo: "aosc",
    versions: [],
    isRolling: true
  },
  {
    id: "fnos",
    name: "fnOS (飞牛)",
    logo: "fnos",
    versions: ["1"],
    defaultVersion: "1"
  },
  {
    id: "redhat",
    name: "Red Hat Enterprise Linux",
    logo: "redhat",
    versions: [],
    isCustomImg: true,
    placeholder: "http://access.cdn.redhat.com/xxx.qcow2"
  }
];

export const WINDOWS_VERSIONS = [
  "Windows 11 Enterprise LTSC 2024",
  "Windows 11 Pro",
  "Windows 11 Home",
  "Windows 10 Enterprise LTSC 2021",
  "Windows 10 Pro",
  "Windows Server 2025 SERVERDATACENTER",
  "Windows Server 2022 SERVERDATACENTER",
  "Windows Server 2019 SERVERDATACENTER",
  "Windows Server 2016 SERVERDATACENTER",
  "Windows Server 2012 R2 SERVERDATACENTER",
];

export const WINDOWS_LANGUAGES = [
  { code: "zh-cn", name: "Chinese (Simplified)" },
  { code: "en-us", name: "English (US)" },
  { code: "zh-tw", name: "Chinese (Traditional)" },
  { code: "ja-jp", name: "Japanese" },
  { code: "ko-kr", name: "Korean" },
  { code: "ru-ru", name: "Russian" },
  { code: "de-de", name: "German" },
  { code: "fr-fr", name: "French" },
  // Add more common ones
];

export const COMMON_FLAGS = [
  { id: "password", label: "Set Password", arg: "--password", type: "text" },
  { id: "ssh-key", label: "SSH Public Key", arg: "--ssh-key", type: "text" },
  { id: "ssh-port", label: "SSH Port", arg: "--ssh-port", type: "number", default: 22 },
  { id: "web-port", label: "Web Port", arg: "--web-port", type: "number", default: 80 },
  { id: "hold", label: "Hold Mode (Debug)", arg: "--hold", type: "select", options: [
      { value: "0", label: "Off" },
      { value: "1", label: "Hold in RAM (No Install)" },
      { value: "2", label: "Hold after Install" }
    ] 
  }
];

export const NETWORK_FLAGS = [
  { id: "ip", label: "IP Address", arg: "--ip", type: "text", placeholder: "192.168.1.100" },
  { id: "gateway", label: "Gateway", arg: "--gateway", type: "text", placeholder: "192.168.1.1" },
  { id: "netmask", label: "Netmask", arg: "--netmask", type: "text", placeholder: "255.255.255.0" },
  { id: "dns", label: "DNS Server", arg: "--dns", type: "text", placeholder: "8.8.8.8" },
  { id: "ipv6", label: "IPv6 Address", arg: "--ipv6", type: "text", placeholder: "2001:db8::1" },
  { id: "ip6-gateway", label: "IPv6 Gateway", arg: "--ip6-gateway", type: "text", placeholder: "2001:db8::ff" },
  { id: "ip6-dns", label: "IPv6 DNS", arg: "--ip6-dns", type: "text", placeholder: "2001:4860:4860::8888" },
  { id: "dhcp", label: "DHCP (Auto IP)", arg: "--dhcp", type: "checkbox" },
  { id: "mac", label: "MAC Address", arg: "--mac", type: "text", placeholder: "00:11:22:33:44:55" },
];

export const DISK_FLAGS = [
  { id: "disk", label: "Target Disk", arg: "--disk", type: "text", placeholder: "/dev/sda" },
  { id: "boot", label: "Boot Partition", arg: "--boot", type: "text", placeholder: "/dev/sda1" },
  { id: "reset-btrfs", label: "Reset BTRFS", arg: "--reset-btrfs", type: "checkbox" },
  { id: "reset-lvm", label: "Reset LVM", arg: "--reset-lvm", type: "checkbox" },
];

export const LINUX_FLAGS = [
  { id: "mirror", label: "Custom Mirror", arg: "--mirror", type: "text", placeholder: "https://mirror.example.com" },
  { id: "grub", label: "GRUB Device", arg: "--grub", type: "text", placeholder: "/dev/sda" },
  { id: "console", label: "Console Output", arg: "--console", type: "text", placeholder: "tty0" },
  { id: "cloud", label: "Cloud Kernel", arg: "--cloud", type: "checkbox" },
];

export const WINDOWS_FLAGS = [
  { id: "drivers", label: "VirtIO Drivers", arg: "--drivers", type: "text", placeholder: "https://example.com/virtio.iso" },
  { id: "virtio", label: "VirtIO ISO", arg: "--virtio", type: "text", placeholder: "https://example.com/virtio.iso" },
  { id: "autologin", label: "Auto Login", arg: "--autologin", type: "checkbox" },
  { id: "ad", label: "Domain Join", arg: "--ad", type: "text", placeholder: "domain.example.com" },
];

export const DD_FLAGS = [
  { id: "img-password", label: "Image Password", arg: "--img-password", type: "text" },
  { id: "img-key", label: "Image Key", arg: "--img-key", type: "text" },
  { id: "img-match", label: "Auto Match Image", arg: "--img-match", type: "text", placeholder: "1234" },
];

export const OTHER_FLAGS = [
  { id: "no-dd", label: "Skip DD", arg: "--no-dd", type: "checkbox" },
  { id: "no-reboot", label: "No Reboot", arg: "--no-reboot", type: "checkbox" },
  { id: "debug", label: "Debug Mode", arg: "--debug", type: "checkbox" },
];
