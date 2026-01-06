<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'nuxt-ui', label: 'Nuxt UI' },
            { id: 'icons', label: '圖標系統' },
            { id: 'fonts', label: '字型優化' }
        ]
    })

    useHead({
        title: 'UI 生態 (UI Ecosystem)',
        meta: [
            { name: 'description', content: 'Nuxt 4 UI 生態系介紹：使用 Nuxt UI 快速建構介面，透過 Nuxt Icon 管理圖標，以及使用 Nuxt Fonts 優化網頁字型。' }
        ]
    })
</script>

<template>
    <TutorialPage title="UI 生態系 (UI Ecosystem)"
        description="Nuxt 擁有豐富的 UI 生態系，讓開發者能專注於邏輯而非重複造輪子。本章介紹三個核心模組：Nuxt UI、Nuxt Icon 與 Nuxt Fonts。"
        :badges="[{ label: 'Nuxt UI', color: 'primary' }, { label: 'Icons', color: 'neutral' }]">

        <!-- Section 1: Nuxt UI -->
        <TutorialSection id="nuxt-ui" title="Nuxt UI" icon="logos:nuxt-icon" separator>
            <p class="text-slate-400 leading-relaxed mb-6">
                Nuxt UI 是官方推薦的 UI 元件庫。它基於 Headless UI 與 Tailwind CSS，提供了一套美觀、無障礙且可高度客製化的元件。
            </p>

            <AppWindow type="code" title="Install Nuxt UI" :no-padding="true" class="mb-8">
                <div class="p-4 font-mono text-sm text-slate-300">
                    <span class="text-emerald-400">$</span> npx nuxi@latest module add ui
                </div>
            </AppWindow>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div class="p-4 rounded-xl bg-slate-950 border border-slate-800/50 text-center">
                    <div class="mb-2 flex justify-center">
                        <Icon name="heroicons:moon" class="w-8 h-8 text-emerald-400" />
                    </div>
                    <h4 class="text-white font-medium text-sm">Dark Mode</h4>
                    <p class="text-xs text-slate-500 mt-1">開箱即用的深色模式支援</p>
                </div>
                <div class="p-4 rounded-xl bg-slate-950 border border-slate-800/50 text-center">
                    <div class="mb-2 flex justify-center">
                        <Icon name="heroicons:keyboard" class="w-8 h-8 text-blue-400" />
                    </div>
                    <h4 class="text-white font-medium text-sm">Keyboard</h4>
                    <p class="text-xs text-slate-500 mt-1">完整的鍵盤導航支援</p>
                </div>
                <div class="p-4 rounded-xl bg-slate-950 border border-slate-800/50 text-center">
                    <div class="mb-2 flex justify-center">
                        <Icon name="heroicons:paint-brush" class="w-8 h-8 text-purple-400" />
                    </div>
                    <h4 class="text-white font-medium text-sm">Themable</h4>
                    <p class="text-xs text-slate-500 mt-1">透過 App Config 全域設定</p>
                </div>
            </div>

            <p class="text-slate-400 mb-4">
                在 <code class="text-emerald-400">app.config.ts</code> 中設定全域樣式：
            </p>

            <AppCodeBlock language="typescript" :code="`export default defineAppConfig({
  ui: {
    primary: 'emerald',
    gray: 'slate',
    button: {
      default: {
        variant: 'solid',
        color: 'primary'
      }
    }
  }
})`" filename="app.config.ts" />
        </TutorialSection>

        <!-- Section 2: Icons -->
        <TutorialSection id="icons" title="圖標系統 (Nuxt Icon)" icon="heroicons:star" separator>
            <p class="text-slate-400 mb-6">
                <code class="text-emerald-400">@nuxt/icon</code> 模組讓您可以存取超過 100,000 個圖標 (Iconify)。
            </p>

            <AppWindow type="code" title="Install Icons" :no-padding="true" class="mb-8">
                <div class="p-4 font-mono text-sm text-slate-300">
                    <span class="text-emerald-400">$</span> npx nuxi@latest module add icon
                </div>
            </AppWindow>

            <div class="p-6 rounded-xl bg-slate-900/50 border border-slate-800/50">
                <div class="flex flex-wrap gap-8 justify-center mb-8">
                    <div class="text-center">
                        <Icon name="heroicons:home" class="w-8 h-8 text-emerald-400 mb-2" />
                        <div class="text-xs font-mono text-slate-500">heroicons:home</div>
                    </div>
                    <div class="text-center">
                        <Icon name="logos:vue" class="w-8 h-8 mb-2" />
                        <div class="text-xs font-mono text-slate-500">logos:vue</div>
                    </div>
                    <div class="text-center">
                        <Icon name="ph:rocket-duotone" class="w-8 h-8 text-purple-400 mb-2" />
                        <div class="text-xs font-mono text-slate-500">ph:rocket-duotone</div>
                    </div>
                </div>

                <AppCodeBlock language="vue" :code="`<template>
  <!-- 使用 Icon 元件 -->
  <Icon name=&quot;heroicons:home&quot; class=&quot;w-6 h-6 text-emerald-500&quot; />
  
  <Icon name=&quot;logos:nuxt-icon&quot; size=&quot;24&quot; />
</template>`" filename="components/IconDemo.vue" />
            </div>
        </TutorialSection>

        <!-- Section 3: Fonts -->
        <TutorialSection id="fonts" title="字型優化 (Nuxt Fonts)" icon="heroicons:language" separator>
            <p class="text-slate-400 mb-6">
                <code class="text-emerald-400">@nuxt/fonts</code> 模組會自動下載並優化您使用的 Web Fonts，消除 Layout Shift (CLS)
                並提升載入速度。
            </p>

            <AppWindow type="code" title="Install Fonts" :no-padding="true" class="mb-8">
                <div class="p-4 font-mono text-sm text-slate-300">
                    <span class="text-emerald-400">$</span> npx nuxi@latest module add fonts
                </div>
            </AppWindow>

            <AppCodeBlock language="css" :code="`/* assets/css/main.css */
@theme {
  /* 直接使用 Google Fonts 名稱，Nuxt 會自動處理 */
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}`" filename="assets/css/main.css" />
        </TutorialSection>

    </TutorialPage>
</template>