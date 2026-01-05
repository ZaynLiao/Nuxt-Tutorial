import type { NavGroup } from "~/types";

export const sidebarGroups: NavGroup[] = [
  {
    id: "start",
    title: "起步走",
    icon: "heroicons:rocket-launch",
    items: [
      {
        label: "導覽",
        to: "/docs",
        icon: "heroicons:book-open",
        description: "文件導覽首頁。",
      },
      {
        label: "安裝與啟動",
        to: "/docs/guide-getting-started/installation",
        icon: "heroicons:command-line",
        description: "建立專案、執行開發模式、理解常用指令。",
      },
      {
        label: "目錄結構",
        to: "/docs/guide-getting-started/directory-structure",
        icon: "heroicons:folder",
        description: "認識 app/、server/、public/ 等目錄的角色。",
      },
      {
        label: "路由系統",
        to: "/docs/guide-getting-started/routing",
        icon: "heroicons:map",
        description: "檔案即路由 (File-based Routing) 的運作機制。",
      },
    ],
  },
  {
    id: "core",
    title: "核心概念",
    icon: "heroicons:cpu-chip",
    items: [
      {
        label: "資料獲取",
        to: "/docs/guide-core-concepts/data-fetching",
        icon: "heroicons:cloud-arrow-down",
        description: "useAsyncData 與 useFetch 的最佳實踐。",
      },
      {
        label: "狀態管理",
        to: "/docs/guide-core-concepts/state-management",
        icon: "heroicons:circle-stack",
        description: "useState 與 Pinia 的使用時機。",
      },
      {
        label: "錯誤處理",
        to: "/docs/guide-core-concepts/error-handling",
        icon: "heroicons:exclamation-triangle",
        description: "如何優雅地處理 404 與 500 錯誤。",
      },
      {
        label: "Composables 與 Utils",
        to: "/docs/guide-core-concepts/composables-utils",
        icon: "heroicons:cube-transparent",
        description: "如何組織與重用邏輯程式碼。",
      },
    ],
  },
  {
    id: "architecture",
    title: "架構設計",
    icon: "heroicons:building-library",
    items: [
      {
        label: "Middleware",
        to: "/docs/guide-architecture/route-middleware",
        icon: "heroicons:shield-check",
        description: "路由守衛與請求攔截。",
      },
      {
        label: "Layouts",
        to: "/docs/guide-architecture/layouts",
        icon: "heroicons:rectangle-group",
        description: "共用版型與巢狀佈局。",
      },
      {
        label: "Plugins",
        to: "/docs/guide-architecture/plugins",
        icon: "heroicons:puzzle-piece",
        description: "擴充 Nuxt 功能與整合第三方套件。",
      },
      {
        label: "Runtime Config",
        to: "/docs/guide-architecture/runtime-config",
        icon: "heroicons:cog-6-tooth",
        description: "環境變數與機密資料管理。",
      },
    ],
  },
  {
    id: "features",
    title: "進階功能",
    icon: "heroicons:sparkles",
    items: [
      {
        label: "SEO 設定",
        to: "/docs/guide-features/seo",
        icon: "heroicons:magnifying-glass",
        description: "Meta Tags 與 Open Graph 設定。",
      },
      {
        label: "靜態資源",
        to: "/docs/guide-features/assets",
        icon: "heroicons:photo",
        description: "圖片、字型與樣式處理。",
      },
      {
        label: "伺服器路由",
        to: "/docs/guide-features/server-routes",
        icon: "heroicons:server",
        description: "建立 API Endpoints 與後端邏輯。",
      },
      {
        label: "TypeScript 支援",
        to: "/docs/guide-features/typescript",
        icon: "heroicons:code-bracket",
        description: "型別安全與開發體驗。",
      },
      {
        label: "渲染模式",
        to: "/docs/guide-features/rendering-modes",
        icon: "heroicons:cpu-chip",
        description: "SSR, CSR, SSG 與 Hybrid Rendering。",
      },
      {
        label: "生命週期",
        to: "/docs/guide-features/lifecycle",
        icon: "heroicons:clock",
        description: "Nuxt 與 Vue 的生命週期鉤子。",
      },
      {
        label: "Nuxt Layers",
        to: "/docs/guide-features/layers",
        icon: "heroicons:square-3-stack-3d",
        description: "多專案繼承與模組化架構。",
      },
      {
        label: "多語言 (i18n)",
        to: "/docs/guide-features/i18n",
        icon: "heroicons:language",
        description: "國際化與本地化設定。",
      },
      {
        label: "效能優化",
        to: "/docs/guide-features/performance",
        icon: "heroicons:chart-pie",
        description: "Bundle 分析與載入效能調校。",
      },
      {
        label: "安全性",
        to: "/docs/guide-features/security",
        icon: "heroicons:shield-check",
        description: "常見資安風險與防護措施。",
      },
      {
        label: "Nuxt 模組",
        to: "/docs/guide-features/modules",
        icon: "heroicons:squares-plus",
        description: "探索與開發 Nuxt Modules。",
      },
      {
        label: "開發工具",
        to: "/docs/guide-features/devtools",
        icon: "heroicons:wrench-screwdriver",
        description: "Nuxt DevTools 的強大功能。",
      },
      {
        label: "測試",
        to: "/docs/guide-features/testing",
        icon: "heroicons:beaker",
        description: "單元測試與 E2E 測試。",
      },
      {
        label: "部署",
        to: "/docs/guide-features/deployment",
        icon: "heroicons:rocket-launch",
        description: "部署到 Vercel, Netlify 或 Cloudflare。",
      },
      {
        label: "Git 版本控制",
        to: "/docs/guide-features/git",
        icon: "heroicons:command-line",
        description: "Git 工作流與協作規範。",
      },
    ],
  },
  {
    id: "ui",
    title: "UI 與樣式",
    icon: "heroicons:paint-brush",
    items: [
      {
        label: "樣式系統",
        to: "/docs/guide-ui/styling",
        icon: "heroicons:paint-brush",
        description: "Tailwind CSS 與 CSS Modules。",
      },
      {
        label: "UI 生態",
        to: "/docs/guide-ui/ui-libraries",
        icon: "heroicons:swatch",
        description: "Nuxt UI 與其他元件庫整合。",
      },
    ],
  },
  {
    id: "components",
    title: "內建元件",
    icon: "heroicons:cube",
    items: [
      {
        label: "NuxtLink",
        to: "/docs/guide-components/nuxt-link",
        icon: "heroicons:link",
        description: "智慧導航連結。",
      },
      {
        label: "NuxtImg",
        to: "/docs/guide-components/nuxt-img",
        icon: "heroicons:photo",
        description: "圖片最佳化。",
      },
      {
        label: "ClientOnly",
        to: "/docs/guide-components/client-only",
        icon: "heroicons:computer-desktop",
        description: "僅在客戶端渲染。",
      },
      {
        label: "更多元件...",
        to: "/docs/guide-components/auto-imports",
        icon: "heroicons:squares-plus",
        description: "查看完整元件列表。",
      },
    ],
  },
];
