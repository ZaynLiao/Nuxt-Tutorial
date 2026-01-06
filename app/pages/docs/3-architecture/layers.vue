<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'concept', label: '核心概念' },
            { id: 'structure', label: '目錄結構' },
            { id: 'config', label: '設定與繼承' },
            { id: 'use-cases', label: '使用場景' }
        ]
    })

    useHead({
        title: 'Nuxt Layers',
        meta: [
            { name: 'description', content: 'Nuxt 4 Layers 教學：如何使用 Layers 繼承與擴充 Nuxt 應用程式，實現多專案共用配置、元件與邏輯。' }
        ]
    })
</script>

<template>
    <TutorialPage title="Nuxt Layers"
        description="Nuxt Layers 是一個強大的架構功能，允許您將一個 Nuxt 應用程式「繼承」自另一個 Nuxt 應用程式。這使得程式碼共用、主題製作與微前端架構變得前所未有的簡單。"
        :badges="[{ label: 'Architecture', color: 'primary' }, { label: 'Reusability', color: 'neutral' }]">

        <!-- Section 1: Concept -->
        <TutorialSection id="concept" title="核心概念" icon="heroicons:square-3-stack-3d" separator>
            <p class="text-slate-400 leading-relaxed mb-6">
                想像一下，您可以建立一個包含基礎 UI 元件、共用 Utils 和設定的 "Base App"，然後讓其他多個專案都繼承這個 Base App。
            </p>

            <div
                class="p-6 rounded-xl bg-slate-950 border border-slate-800/50 flex flex-col md:flex-row items-center gap-8 justify-center">
                <div class="text-center">
                    <div
                        class="w-24 h-20 bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center mx-auto mb-2 shadow-lg">
                        <span class="text-slate-400 font-mono text-xs">Base Layer</span>
                    </div>
                    <p class="text-xs text-slate-500">共用元件、設定</p>
                </div>

                <Icon name="heroicons:arrow-up" class="w-6 h-6 text-emerald-500 rotate-0 md:rotate-90" />

                <div class="text-center">
                    <div
                        class="w-24 h-20 bg-slate-900 rounded-lg border-2 border-emerald-500/50 flex items-center justify-center mx-auto mb-2 shadow-lg shadow-emerald-500/10">
                        <span class="text-white font-mono text-xs">Your App</span>
                    </div>
                    <p class="text-xs text-slate-500">繼承並覆寫</p>
                </div>
            </div>
        </TutorialSection>

        <!-- Section 2: Structure -->
        <TutorialSection id="structure" title="目錄結構" icon="heroicons:folder-open" separator>
            <p class="text-slate-400 mb-6">
                Layer 本質上就是一個標準的 Nuxt 專案。它可以包含 <code class="text-slate-300">nuxt.config.ts</code>、<code
                    class="text-slate-300">components/</code>、<code class="text-slate-300">composables/</code> 等所有目錄。
            </p>

            <AppCodeBlock language="bash" :code="`my-app/
├── nuxt.config.ts  # 繼承 base-layer
├── app/
│   └── pages/
│       └── index.vue
└── node_modules/
    └── my-base-layer/  # 安裝的 Layer
        ├── nuxt.config.ts
        └── app/
            └── components/
                └── AppButton.vue`" filename="Directory Structure" />
        </TutorialSection>

        <!-- Section 3: Config -->
        <TutorialSection id="config" title="設定與繼承" icon="heroicons:cog-6-tooth" separator>
            <p class="text-slate-400 mb-6">
                在 <code class="text-emerald-400">nuxt.config.ts</code> 中使用 <code class="text-emerald-400">extends</code>
                屬性來繼承 Layer。
            </p>

            <AppCodeBlock language="typescript" :code="`export default defineNuxtConfig({
  // 可以是本地路徑、npm 套件或 GitHub Repo
  extends: [
    '../base-layer',
    'github:username/repo-name'
  ],
  
  // 您可以在這裡覆寫 Layer 的設定
  app: {
    head: {
      title: 'My App (Overridden)'
    }
  }
})`" filename="nuxt.config.ts" />
        </TutorialSection>

        <!-- Section 4: Use Cases -->
        <TutorialSection id="use-cases" title="使用場景" icon="heroicons:light-bulb" separator>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
                    <h4 class="text-white font-medium mb-2 flex items-center gap-2">
                        <Icon name="heroicons:swatch" class="w-5 h-5 text-purple-400" />
                        UI Kit 分發
                    </h4>
                    <p class="text-sm text-slate-400">
                        將公司的 Design System 封裝成一個 Layer，所有專案只需繼承即可獲得統一的 UI 元件與 Tailwind 設定。
                    </p>
                </div>

                <div class="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
                    <h4 class="text-white font-medium mb-2 flex items-center gap-2">
                        <Icon name="heroicons:language" class="w-5 h-5 text-blue-400" />
                        多語系網站
                    </h4>
                    <p class="text-sm text-slate-400">
                        建立一個包含 i18n 設定與翻譯檔的 Base Layer，讓不同地區的網站繼承並只專注於內容。
                    </p>
                </div>
            </div>
        </TutorialSection>

    </TutorialPage>
</template>