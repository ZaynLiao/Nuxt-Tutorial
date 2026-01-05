<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'what-is-module', label: '什麼是模組？' },
            { id: 'installation', label: '安裝與使用' },
            { id: 'popular-modules', label: '常用模組推薦' },
            { id: 'configuration', label: '模組設定' }
        ]
    })

    useHead({
        title: 'Nuxt 模組 (Modules)',
        meta: [
            { name: 'description', content: 'Nuxt 4 模組教學：探索 Nuxt 強大的模組生態系，學習如何安裝與設定第三方套件。' }
        ]
    })
</script>

<template>
    <TutorialPage title="Nuxt 模組 (Modules)" description="Nuxt 擁有強大的模組生態系，讓您能像組裝積木一樣快速擴充專案功能。"
        :badges="[{ label: 'Ecosystem', color: 'primary' }, { label: 'Extensibility', color: 'primary' }]">

        <!-- Section 1: 什麼是模組 -->
        <TutorialSection id="what-is-module" title="什麼是模組？" icon="heroicons:question-mark-circle" separator>
            <p class="text-slate-400 leading-relaxed">
                Nuxt 模組 (Modules) 是 Nuxt 框架的核心擴充機制。不同於一般的 Vue Plugin，Nuxt 模組可以在應用程式的生命週期中介入，自動設定路由、註冊元件、注入中間件，甚至修改
                Webpack/Vite 設定。
            </p>
            <div class="p-6 rounded-3xl bg-slate-950 border border-slate-800/50">
                <p class="text-slate-300">
                    <span class="text-emerald-400 font-bold">簡單來說：</span>
                    如果您發現自己在重複做某些設定（例如設定 Tailwind、設定 PWA、設定 Google Analytics），那麼很可能已經有一個 Nuxt 模組幫您做好了。
                </p>
            </div>
        </TutorialSection>

        <!-- Section 2: 安裝與使用 -->
        <TutorialSection id="installation" title="安裝與使用" icon="heroicons:arrow-down-tray" separator>
            <p class="text-slate-400">
                在 Nuxt 4 中，安裝模組非常簡單。我們推薦使用 <code class="text-emerald-400">nuxi</code> CLI 工具來安裝，它會自動更新您的 <code
                    class="text-slate-300">package.json</code> 和 <code class="text-slate-300">nuxt.config.ts</code>。
            </p>

            <AppCodeBlock language="bash" code="npx nuxi@latest module add image" filename="Terminal" />

            <p class="text-slate-400 mt-6">
                上述指令會安裝 <code class="text-emerald-400">@nuxt/image</code> 並自動將其加入設定檔。如果您偏好手動安裝：
            </p>

            <AppCodeBlock language="typescript" :code="`export default defineNuxtConfig({
  modules: [
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxt/ui'
  ]
})`" filename="nuxt.config.ts" />
        </TutorialSection>

        <!-- Section 3: 常用模組 -->
        <TutorialSection id="popular-modules" title="常用模組推薦" icon="heroicons:star" separator>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                    class="p-8 rounded-3xl bg-slate-950 border border-slate-800/50 hover:border-emerald-500/30 transition-colors group">
                    <div class="flex items-center gap-3 mb-3">
                        <UIcon name="logos:tailwindcss-icon" class="w-8 h-8" />
                        <h3 class="text-lg font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
                            Tailwind CSS</h3>
                    </div>
                    <p class="text-slate-400 text-sm mb-4">
                        官方支援的 Tailwind 整合。支援 HMR、自動設定與優化。
                    </p>
                    <code class="text-xs bg-slate-900 px-2 py-1 rounded text-emerald-400">@nuxtjs/tailwindcss</code>
                </div>

                <div
                    class="p-8 rounded-3xl bg-slate-950 border border-slate-800/50 hover:border-emerald-500/30 transition-colors group">
                    <div class="flex items-center gap-3 mb-3">
                        <UIcon name="logos:pinia" class="w-8 h-8" />
                        <h3 class="text-lg font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
                            Pinia</h3>
                    </div>
                    <p class="text-slate-400 text-sm mb-4">
                        Vue 的官方狀態管理庫。模組版本提供了更好的 SSR 支援與自動引入。
                    </p>
                    <code class="text-xs bg-slate-900 px-2 py-1 rounded text-emerald-400">@pinia/nuxt</code>
                </div>

                <div
                    class="p-8 rounded-3xl bg-slate-950 border border-slate-800/50 hover:border-emerald-500/30 transition-colors group">
                    <div class="flex items-center gap-3 mb-3">
                        <UIcon name="heroicons:photo" class="w-8 h-8 text-blue-400" />
                        <h3 class="text-lg font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">Nuxt
                            Image</h3>
                    </div>
                    <p class="text-slate-400 text-sm mb-4">
                        自動圖片優化、格式轉換 (WebP/Avif) 與響應式圖片生成。
                    </p>
                    <code class="text-xs bg-slate-900 px-2 py-1 rounded text-emerald-400">@nuxt/image</code>
                </div>

                <div
                    class="p-8 rounded-3xl bg-slate-950 border border-slate-800/50 hover:border-emerald-500/30 transition-colors group">
                    <div class="flex items-center gap-3 mb-3">
                        <UIcon name="heroicons:globe-alt" class="w-8 h-8 text-green-400" />
                        <h3 class="text-lg font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">Nuxt
                            SEO</h3>
                    </div>
                    <p class="text-slate-400 text-sm mb-4">
                        全方位的 SEO 解決方案，包含 Sitemap、Robots.txt、Schema.org 等。
                    </p>
                    <code class="text-xs bg-slate-900 px-2 py-1 rounded text-emerald-400">@nuxtjs/seo</code>
                </div>
            </div>
        </TutorialSection>

        <!-- Section 4: 模組設定 -->
        <TutorialSection id="configuration" title="模組設定" icon="heroicons:cog-6-tooth" separator>
            <p class="text-slate-400">
                大多數模組都可以在 <code class="text-slate-300">nuxt.config.ts</code> 中進行設定。通常模組會使用其名稱作為設定鍵值。
            </p>

            <AppCodeBlock language="typescript" :code="`export default defineNuxtConfig({
  modules: ['@nuxt/image'],

  // Image 模組的設定
  image: {
    dir: 'assets/images',
    format: ['webp', 'avif']
  }
})`" filename="nuxt.config.ts" />
        </TutorialSection>

        <div class="mt-12 p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800">
            <h3 class="text-xl font-bold text-white mb-2">探索更多模組</h3>
            <p class="text-slate-400 mb-4">
                Nuxt 官方維護了一個模組列表網站，您可以在上面找到各種類型的模組。
            </p>
            <NuxtLink to="https://nuxt.com/modules" target="_blank"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors">
                <span>瀏覽 Nuxt Modules</span>
                <UIcon name="heroicons:arrow-top-right-on-square" />
            </NuxtLink>
        </div>

    </TutorialPage>
</template>