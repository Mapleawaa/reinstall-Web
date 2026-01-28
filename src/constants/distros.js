export const LINUX_DISTROS = [
  {
    id: "alpine",
    name: "Alpine Linux",
    logo: "https://www.alpinelinux.org/alpine-logo.ico",
    versions: ["3.23", "3.22", "3.21", "3.20"],
    defaultVersion: "3.23"
  },
  {
    id: "debian",
    name: "Debian",
    logo: "https://www.debian.org/favicon.ico",
    versions: ["13", "12", "11", "10", "9"],
    defaultVersion: "12"
  },
  {
    id: "ubuntu",
    name: "Ubuntu",
    logo: "https://documentation.ubuntu.com/server/_static/favicon.png",
    versions: ["25.10", "24.04", "22.04", "20.04", "18.04", "16.04"],
    defaultVersion: "24.04",
    flags: [
      { id: "minimal", label: "Minimal Install", arg: "--minimal" }
    ]
  },
  {
    id: "kali",
    name: "Kali Linux",
    logo: "https://github.com/bin456789/reinstall/assets/7548515/f74b3d5b-085f-4df3-bcc9-8a9bd80bb16d",
    versions: [], // Rolling
    isRolling: true
  },
  {
    id: "centos",
    name: "CentOS Stream",
    logo: "https://www.centos.org/assets/icons/favicon.svg",
    versions: ["10", "9"],
    defaultVersion: "9"
  },
  {
    id: "alma",
    name: "AlmaLinux",
    cmd: "almalinux",
    logo: "https://almalinux.org/fav/favicon.ico",
    versions: ["10", "9", "8"],
    defaultVersion: "9"
  },
  {
    id: "rocky",
    name: "Rocky Linux",
    cmd: "rocky",
    logo: "https://rockylinux.org/favicon.png",
    versions: ["10", "9", "8"],
    defaultVersion: "9"
  },
  {
    id: "fedora",
    name: "Fedora",
    logo: "https://fedoraproject.org/favicon.ico",
    versions: ["43", "42"],
    defaultVersion: "42"
  },
  {
    id: "openeuler",
    name: "openEuler",
    logo: "https://www.openeuler.org/favicon.ico",
    versions: ["25.09", "24.03", "22.03", "20.03"],
    defaultVersion: "24.03"
  },
  {
    id: "opensuse",
    name: "openSUSE",
    logo: "https://static.opensuse.org/favicon.ico",
    versions: ["tumbleweed", "16.0", "15.6"],
    defaultVersion: "15.6"
  },
  {
    id: "arch",
    name: "Arch Linux",
    logo: "https://archlinux.org/static/favicon.png",
    versions: [],
    isRolling: true
  },
  {
    id: "gentoo",
    name: "Gentoo",
    logo: "https://www.gentoo.org/assets/img/logo/gentoo-g.png",
    versions: [],
    isRolling: true
  },
  {
    id: "nixos",
    name: "NixOS",
    logo: "https://nixos.org/favicon.svg",
    versions: ["25.11"],
    defaultVersion: "25.11"
  },
  {
    id: "oracle",
    name: "Oracle Linux",
    logo: "https://www.oracle.com/asset/web/favicons/favicon-32.png",
    versions: ["10", "9", "8"],
    defaultVersion: "9"
  },
  {
    id: "anolis",
    name: "Anolis OS",
    logo: "https://img.alicdn.com/imgextra/i1/O1CN01oJnJZg1yK4RzI4Rx2_!!6000000006559-2-tps-118-118.png",
    versions: ["23", "8", "7"],
    defaultVersion: "8"
  },
  {
    id: "opencloudos",
    name: "OpenCloudOS",
    logo: "https://opencloudos.org/qq.ico",
    versions: ["23", "9", "8"],
    defaultVersion: "9"
  },
  {
    id: "aosc",
    name: "AOSC OS",
    logo: "https://aosc.io/distros/aosc-os.svg",
    versions: [],
    isRolling: true
  },
  {
    id: "fnos",
    name: "fnOS (飞牛)",
    logo: "https://www.fnnas.com/favicon.ico",
    versions: ["1"],
    defaultVersion: "1"
  },
  {
    id: "redhat",
    name: "Red Hat Enterprise Linux",
    logo: "https://www.redhat.com/favicon.ico",
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
