# Reinstall CLI Generator (WebUI)

![License](https://img.shields.io/github/license/bin456789/reinstall?style=flat-square)
![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat-square&logo=tailwindcss)

## 介绍

这是一个为 [reinstall.sh](https://github.com/bin456789/reinstall) 脚本设计的高保真交互式 Web 生成器。本项目的目标是通过提供可视化的点击界面，简化服务器重装的复杂性，帮助用户快速生成所需的精确命令。

## ✨ 特性

- **可视化配置**：通过开关和下拉菜单配置，无需查阅冗长的文档。
- **实时预览**：更改设置时，生成的命令会即时更新。
- **Apple HIG 设计**：灵感源自 macOS 和 Vitesse 的精美深色主题界面。
- **全面支持**：覆盖脚本的所有功能，包括 Linux 发行版、Windows ISO、DD 镜像、救援模式和 Netboot.xyz。
- **参数校验**：确保不会遗漏镜像 URL 或密码等必要参数。

## 🛠️ 技术栈

- **框架**: [Vue 3](https://vuejs.org/) (Composition API)
- **构建工具**: [Vite](https://vitejs.dev/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **UI 组件**: [Shadcn-vue](https://www.shadcn-vue.com/) (Radix Vue)
- **代码高亮**: [Shiki](https://shiki.style/)

## 🚀 开发

### 前置要求

- Node.js 18+
- pnpm

### 设置

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### 构建

```bash
# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 📄 许可证

本项目采用 [MIT 许可证](./LICENSE) 进行授权。

## 💗 感谢
- [reinstall.sh](https://github.com/bin456789/reinstall) 项目的作者和维护者。

