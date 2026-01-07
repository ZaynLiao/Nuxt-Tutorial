<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'analyze', label: 'Bundle 分析' },
            { id: 'lazy-loading', label: '懶加載 (Lazy Loading)' },
            { id: 'build-cache', label: '建置快取' },
            { id: 'font-optimization', label: '字型優化' }
        ]
    })

    useHead({
        title: '效能優化 (Performance)',
        meta: [
            { name: 'description', content: 'Nuxt 4 效能優化指南：使用 Bundle Analyzer 分析套件大小，實作元件與路由的懶加載，以及利用建置快取加速部署。' }
        ]
    })
</script>

<template>
    <DocsPage title="效能優化 (Performance)" description="效能是使用者體驗的關鍵。Nuxt 4 內建了許多優化機制，但作為開發者，我們仍需掌握一些技巧來確保應用程式保持輕量與快速。"
        :badges="[{ label: 'Core Web Vitals', color: 'primary' }, { label: 'Optimization', color: 'neutral' }]">

        <!-- Section 1: Analyze -->
        <DocsSection id="analyze" title="Bundle 分析" icon="heroicons:chart-pie" separator>
            <p class="text-slate-400 mb-6">
                優化的第一步是「測量」。使用 <code class="text-emerald-400">nuxi analyze</code> 可以視覺化您的 Bundle 大小，找出肥大的依賴套件。
            </p>

            <UiCodeBlock language="bash" :code="`npx nuxi analyze`" filename="Terminal" />

            <p class="text-slate-400 my-4">
                這會啟動一個本地伺服器，展示 Treemap 圖表。常見的優化目標包括：
            </p>
            <ul class="list-disc list-inside text-slate-400 space-y-2 ml-4">
                <li>大型圖表庫 (e.g., ECharts, Chart.js)</li>
                <li>大型日期處理庫 (建議用 dayjs 取代 moment)</li>
                <li>未使用的 Lodash 函數</li>
            </ul>
        </DocsSection>

        <!-- Section 2: Lazy Loading -->
        <DocsSection id="lazy-loading" title="懶加載 (Lazy Loading)" icon="heroicons:clock" separator>
            <p class="text-slate-400 mb-6">
                Nuxt 支援元件與路由的懶加載，這意味著程式碼只有在「需要時」才會被下載。
            </p>

            <div class="space-y-6">
                <div class="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
                    <h4 class="text-white font-medium mb-2">Lazy Components</h4>
                    <p class="text-sm text-slate-400 mb-3">
                        只需在元件名稱前加上 <code class="text-emerald-400">Lazy</code> 前綴，Nuxt 就會自動將其拆分為獨立的 Chunk。
                    </p>
                    <UiCodeBlock language="vue" :code="`<template>
  <!-- 只有當 show 為 true 時，才會下載 Modal 的程式碼 -->
  <LazyModal v-if=&quot;show&quot; />
</template>`" filename="app.vue" />
                </div>

                <div class="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
                    <h4 class="text-white font-medium mb-2">Lazy Data Fetching</h4>
                    <p class="text-sm text-slate-400 mb-3">
                        使用 <code class="text-emerald-400">lazy: true</code> 可以讓頁面在資料尚未回來前先渲染，避免阻塞導航。
                    </p>
                    <UiCodeBlock language="typescript" :code="`const { data, status } = await useFetch('/api/posts', {
  lazy: true
})`" filename="script setup" />
                </div>
            </div>
        </DocsSection>

        <!-- Section 3: Build Cache -->
        <DocsSection id="build-cache" title="建置快取" icon="heroicons:archive-box" separator>
            <p class="text-slate-400 mb-6">
                在 CI/CD 流程中，啟用建置快取可以大幅縮短部署時間。Nuxt 4 支援 <code class="text-emerald-400">useBuildCache</code> (實驗性功能)。
            </p>

            <UiCodeBlock language="typescript" :code="`export default defineNuxtConfig({
  experimental: {
    buildCache: true
  }
})`" filename="nuxt.config.ts" />
        </DocsSection>

        <!-- Section 4: Font Optimization -->
        <DocsSection id="font-optimization" title="字型優化" icon="heroicons:language" separator>
            <p class="text-slate-400 mb-6">
                Web Fonts 往往是造成 CLS (Cumulative Layout Shift) 的元兇。使用 <code class="text-emerald-400">@nuxt/fonts</code>
                可以自動處理：
            </p>

            <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li class="flex items-center gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800/50">
                    <Icon name="heroicons:check" class="w-5 h-5 text-emerald-400" />
                    <span class="text-slate-300 text-sm">自動下載字型檔 (Self-hosting)</span>
                </li>
                <li class="flex items-center gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800/50">
                    <Icon name="heroicons:check" class="w-5 h-5 text-emerald-400" />
                    <span class="text-slate-300 text-sm">自動注入 preload 標籤</span>
                </li>
                <li class="flex items-center gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800/50">
                    <Icon name="heroicons:check" class="w-5 h-5 text-emerald-400" />
                    <span class="text-slate-300 text-sm">生成 fallback 字型以減少 CLS</span>
                </li>
            </ul>
        </DocsSection>

    </DocsPage>
</template>