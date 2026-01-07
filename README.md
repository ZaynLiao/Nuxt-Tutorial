# Nuxt-Tutorial (Nuxt 4 繁體中文教學)

![Nuxt 4](https://img.shields.io/badge/Nuxt-4.0-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Nuxt UI](https://img.shields.io/badge/Nuxt_UI-v4-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Nuxt 4 Tutorial** 是一個專為繁體中文開發者打造的現代化教學專案。基於 **Nuxt 4 (Compatibility v4)**、**Nuxt UI v4** 與 **Tailwind CSS v4** 構建。

內容深入淺出，涵蓋核心概念（路由、資料獲取、狀態管理）與進階主題（渲染模式、Nuxt Layers、i18n 多語言、安全性與效能優化）。這不僅是一個教學網站，更是展示 Nuxt 4 最佳實踐與極致開發體驗的範本。

## 📚 教學內容 (Table of Contents)

本專案包含以下完整的教學模組：

### 🚀 開始使用 (Getting Started)

- **目錄結構**: Nuxt 4 標準目錄架構解析 (`app/`, `server/`)
- **安裝與設定**: 環境建置與 `nuxt.config.ts` 基礎配置
- **路由系統**: 檔案路由 (File-based Routing) 與動態路由

### ⚡ 核心功能 (Core Features)

- **資料獲取**: `useFetch` 與 `useAsyncData` 的最佳實踐
- **狀態管理**: `useState` 與 Pinia 的應用
- **Composables 與 Utils**: 邏輯複用與自動引入機制 (Auto-imports)
- **SEO 設定**: `useHead` 與 `useSeoMeta` 管理
- **中間件**: Route Middleware 的權限控制應用

### 🎨 UI 與樣式 (UI & Styling)

- **樣式系統**: Tailwind CSS v4 (`@theme`) 與 CSS 架構
- **UI 生態**: Nuxt UI、Nuxt Icon 與 Nuxt Fonts 的整合應用

### 🛡️ 進階主題 (Advanced Topics)

- **TypeScript**: 全端型別安全與 API 型別推斷
- **渲染模式**: SSR, CSR, Hybrid Rendering 與 Route Rules
- **生命週期**: Nitro Server, Nuxt App 與 Vue Component Hooks 解析
- **Nuxt Layers**: 多專案繼承與架構設計
- **多語言 (i18n)**: 路由策略與翻譯管理
- **安全性**: Zod 輸入驗證與安全標頭設定
- **效能優化**: Bundle 分析、Lazy Loading 與建置快取
- **測試**: Vitest 單元測試與 Playwright E2E 測試
- **部署**: Cloudflare Pages 部署指南

## 🛠️ 技術堆疊 (Tech Stack)

- **Framework**: [Nuxt 4](https://nuxt.com) (Future Compatibility)
- **UI Library**: [Nuxt UI v4](https://ui.nuxt.com)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Icons**: [Nuxt Icon](https://nuxt.com/modules/icon) (Iconify)
- **Validation**: [Zod](https://zod.dev)
- **Package Manager**: [pnpm](https://pnpm.io)

## 💻 本地開發 (Development)

本專案強制使用 **pnpm** 進行套件管理。

```bash
# 1. 安裝依賴
pnpm install

# 2. 啟動開發伺服器
pnpm dev
```

瀏覽器開啟 [http://localhost:3000](http://localhost:3000) 即可看到教學網站。

## ☁️ 部署 (Deployment)

本專案針對 **Cloudflare Pages** 進行優化。

1. Fork 此專案到您的 GitHub。
2. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com)。
3. 進入 **Workers & Pages** > **Create Application** > **Connect to Git**。
4. 選擇此 Repository。
5. Build Settings (通常會自動偵測):
   - **Framework Preset**: `Nuxt`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `.output/public`
6. 點擊 **Deploy**。

## 📄 License

MIT License © 2026 Nuxt Tutorial
