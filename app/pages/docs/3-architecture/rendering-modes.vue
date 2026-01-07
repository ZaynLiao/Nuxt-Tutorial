<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'universal', label: '通用渲染 (Universal)' },
            { id: 'client-side', label: '客戶端渲染 (CSR)' },
            { id: 'hybrid', label: '混合渲染 (Hybrid)' },
            { id: 'route-rules', label: '路由規則設定' }
        ]
    })

    useHead({
        title: '渲染模式 (Rendering Modes)',
        meta: [
            { name: 'description', content: 'Nuxt 4 渲染模式全解析：從 SSR、CSR 到最先進的 Hybrid Rendering (SWR/ISR)，針對不同頁面制定最佳渲染策略。' }
        ]
    })
</script>

<template>
    <DocsPage title="渲染模式 (Rendering Modes)" description="Nuxt 4 不僅僅是 SSR 框架。透過強大的 Nitro 引擎，您可以為應用程式中的「每一個路由」單獨設定渲染策略。"
        :badges="[{ label: 'Performance', color: 'primary' }, { label: 'Hybrid', color: 'primary' }]">

        <!-- Section 1: Universal Rendering -->
        <DocsSection id="universal" title="通用渲染 (Universal Rendering)" icon="heroicons:globe-alt" separator>
            <p class="text-slate-400 mb-6">
                這是 Nuxt 的預設模式。頁面首先在伺服器端渲染 (SSR) 產生 HTML，傳送給瀏覽器以利 SEO 與首屏顯示，接著在客戶端進行「水合 (Hydration)」變為互動式應用。
            </p>

            <UiWindow title="Request Flow: SSR" icon="heroicons:arrow-path" class="mb-6">
                <div class="p-8 bg-slate-950/50 flex flex-col md:flex-row items-center justify-between gap-4">
                    <!-- Step 1 -->
                    <div class="flex flex-col items-center gap-2">
                        <div class="w-16 h-16 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300">
                            <Icon name="heroicons:computer-desktop" class="w-8 h-8" />
                        </div>
                        <span class="text-xs font-bold text-slate-500">Browser</span>
                    </div>

                    <!-- Arrow -->
                    <div class="flex-1 h-px bg-slate-700 relative w-full md:w-auto">
                        <div class="absolute inset-0 flex items-center justify-center -top-3">
                            <span class="text-xs bg-slate-900 px-2 text-slate-400">Request</span>
                        </div>
                        <Icon name="heroicons:chevron-right"
                            class="absolute right-0 top-1/2 -translate-y-1/2 text-slate-700 w-4 h-4" />
                    </div>

                    <!-- Step 2 -->
                    <div class="flex flex-col items-center gap-2">
                        <div
                            class="w-16 h-16 rounded-xl bg-emerald-500/10 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20">
                            <Icon name="heroicons:server" class="w-8 h-8" />
                        </div>
                        <span class="text-xs font-bold text-emerald-500">Nuxt Server</span>
                    </div>

                    <!-- Arrow -->
                    <div class="flex-1 h-px bg-slate-700 relative w-full md:w-auto">
                        <div class="absolute inset-0 flex items-center justify-center -top-3">
                            <span class="text-xs bg-slate-900 px-2 text-slate-400">Full HTML</span>
                        </div>
                        <Icon name="heroicons:chevron-left"
                            class="absolute left-0 top-1/2 -translate-y-1/2 text-slate-700 w-4 h-4 md:hidden" />
                        <Icon name="heroicons:chevron-right"
                            class="absolute right-0 top-1/2 -translate-y-1/2 text-slate-700 w-4 h-4 hidden md:block" />
                    </div>

                    <!-- Step 3 -->
                    <div class="flex flex-col items-center gap-2">
                        <div
                            class="w-16 h-16 rounded-xl bg-blue-500/10 border border-blue-500/50 flex items-center justify-center text-blue-400">
                            <Icon name="heroicons:sparkles" class="w-8 h-8" />
                        </div>
                        <span class="text-xs font-bold text-blue-500">Hydration</span>
                    </div>
                </div>
            </UiWindow>

            <div class="p-6 rounded-3xl bg-slate-950 border border-slate-800/50">
                <h4 class="font-bold text-emerald-400 mb-2">優點</h4>
                <ul class="list-disc list-inside text-slate-400 space-y-1 text-sm">
                    <li>最佳的 SEO 表現 (搜尋引擎能讀到完整 HTML)。</li>
                    <li>首屏載入速度快 (FCP)，使用者無需等待 JS 下載即可看到內容。</li>
                    <li>保留完整的互動性 (Vue 的功能在水合後完全可用)。</li>
                </ul>
            </div>
        </DocsSection>

        <!-- Section 2: Client-Side Rendering -->
        <DocsSection id="client-side" title="客戶端渲染 (CSR)" icon="heroicons:computer-desktop" separator>
            <p class="text-slate-400 mb-6">
                就像傳統的 Vue SPA。伺服器只回傳一個空的 HTML shell，所有的內容都由 JavaScript 在瀏覽器中渲染。
                適用於不需要 SEO 的後台管理系統或高度互動的儀表板。
            </p>

            <UiWindow title="Request Flow: CSR" icon="heroicons:code-bracket" class="mb-6">
                <div class="p-8 bg-slate-950/50 flex flex-col md:flex-row items-center justify-between gap-4">
                    <!-- Step 1 -->
                    <div class="flex flex-col items-center gap-2">
                        <div class="w-16 h-16 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300">
                            <Icon name="heroicons:computer-desktop" class="w-8 h-8" />
                        </div>
                        <span class="text-xs font-bold text-slate-500">Browser</span>
                    </div>

                    <!-- Arrow -->
                    <div class="flex-1 h-px bg-slate-700 relative w-full md:w-auto">
                        <div class="absolute inset-0 flex items-center justify-center -top-3">
                            <span class="text-xs bg-slate-900 px-2 text-slate-400">Request</span>
                        </div>
                        <Icon name="heroicons:chevron-right"
                            class="absolute right-0 top-1/2 -translate-y-1/2 text-slate-700 w-4 h-4" />
                    </div>

                    <!-- Step 2 -->
                    <div class="flex flex-col items-center gap-2">
                        <div
                            class="w-16 h-16 rounded-xl bg-slate-800 border-2 border-dashed border-slate-600 flex items-center justify-center text-slate-500">
                            <span class="text-xs font-mono">&lt;div id="app"&gt;</span>
                        </div>
                        <span class="text-xs font-bold text-slate-500">Empty Shell</span>
                    </div>

                    <!-- Arrow -->
                    <div
                        class="flex-1 h-px bg-slate-700 relative w-full md:w-auto border-t border-dashed border-slate-600">
                        <div class="absolute inset-0 flex items-center justify-center -top-5">
                            <span class="text-xs text-slate-500">Download JS...</span>
                        </div>
                        <Icon name="heroicons:chevron-right"
                            class="absolute right-0 top-1/2 -translate-y-1/2 text-slate-700 w-4 h-4" />
                    </div>

                    <!-- Step 3 -->
                    <div class="flex flex-col items-center gap-2">
                        <div
                            class="w-16 h-16 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white">
                            <Icon name="logos:vue" class="w-8 h-8" />
                        </div>
                        <span class="text-xs font-bold text-white">Render</span>
                    </div>
                </div>
            </UiWindow>

            <UiCodeBlock language="typescript" :code="`export default defineNuxtConfig({
  // 全域關閉 SSR
  ssr: false
})`" filename="nuxt.config.ts" />

            <p class="text-slate-400 my-4 text-sm">或者針對特定頁面：</p>

            <UiCodeBlock language="typescript" :code="`definePageMeta({
  ssr: false
})`" filename="app/pages/admin.vue" />
        </DocsSection>

        <!-- Section 3: Hybrid Rendering -->
        <DocsSection id="hybrid" title="混合渲染 (Hybrid Rendering)" icon="heroicons:beaker" separator>
            <p class="text-slate-400 mb-6">
                這是 Nuxt 4 最強大的功能。您可以結合 SSR、CSR、SSG、SWR 於同一個專案中。
                例如：首頁使用 SSR (SEO)，後台使用 CSR (互動)，部落格文章使用 ISR (快取)。
            </p>

            <UiWindow title="Strategy: SWR (Stale-While-Revalidate)" icon="heroicons:clock" class="mb-6">
                <div class="p-8 bg-slate-950/50 relative overflow-hidden">
                    <!-- Background Animation -->
                    <div class="absolute inset-0">
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        <!-- Request 1 -->
                        <div class="flex flex-col gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
                            <div class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">1. First Request
                            </div>
                            <div class="flex items-center gap-2 text-sm text-slate-300">
                                <Icon name="heroicons:server" class="text-emerald-500" />
                                <span>Generate</span>
                            </div>
                            <div class="flex items-center gap-2 text-sm text-slate-300">
                                <Icon name="heroicons:archive-box-arrow-down" class="text-blue-500" />
                                <span>Cache it</span>
                            </div>
                        </div>

                        <!-- Request 2 (Fast) -->
                        <div class="flex flex-col gap-3 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                            <div class="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">2. Second
                                Request</div>
                            <div class="flex items-center gap-2 text-sm text-emerald-200">
                                <Icon name="heroicons:bolt" class="text-yellow-400" />
                                <span>Return Cached (Fast)</span>
                            </div>
                            <div class="flex items-center gap-2 text-xs text-emerald-500/70">
                                <Icon name="heroicons:clock" />
                                <span>Even if expired (Stale)</span>
                            </div>
                        </div>

                        <!-- Background Update -->
                        <div
                            class="flex flex-col gap-3 p-4 rounded-xl bg-slate-900 border border-dashed border-slate-700 opacity-70">
                            <div class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">3. Background
                            </div>
                            <div class="flex items-center gap-2 text-sm text-slate-400">
                                <Icon name="heroicons:arrow-path" class="animate-spin" />
                                <span>Revalidate</span>
                            </div>
                            <div class="flex items-center gap-2 text-sm text-slate-400">
                                <Icon name="heroicons:arrow-path-rounded-square" />
                                <span>Update Cache</span>
                            </div>
                        </div>
                    </div>
                </div>
            </UiWindow>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                    class="p-6 rounded-3xl bg-slate-950 border border-slate-800/50 transition-colors hover:border-blue-500/30">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="px-2 py-1 rounded text-xs font-bold bg-blue-500/10 text-blue-400">SWR</span>
                        <h4 class="font-bold text-slate-200">Stale-While-Revalidate</h4>
                    </div>
                    <p class="text-slate-400 text-sm leading-relaxed">
                        伺服器快取回應。當快取過期時，先回傳「舊 (Stale)」資料給使用者看，同時在背景「重新驗證 (Revalidate)」並更新快取。適合對即時性要求不高的內容 (e.g. 熱門文章列表)。
                    </p>
                </div>

                <div
                    class="p-6 rounded-3xl bg-slate-950 border border-slate-800/50 transition-colors hover:border-purple-500/30">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="px-2 py-1 rounded text-xs font-bold bg-purple-500/10 text-purple-400">ISR</span>
                        <h4 class="font-bold text-slate-200">Incremental Static Regeneration</h4>
                    </div>
                    <p class="text-slate-400 text-sm leading-relaxed">
                        類似 SSG (靜態生成)，但可以在部署後按需重新生成靜態頁面，無需重新建置整個網站。適合大型電商或部落格。
                    </p>
                </div>
            </div>
        </DocsSection>

        <!-- Section 4: Route Rules -->
        <DocsSection id="route-rules" title="路由規則設定" icon="heroicons:adjustments-vertical" separator>
            <p class="text-slate-400 mb-6">
                透過 <code class="text-emerald-400">routeRules</code>，您可以精細控制每個路徑的渲染行為。
            </p>

            <UiCodeBlock language="typescript" :code="`export default defineNuxtConfig({
  routeRules: {
    // 首頁：在建置時預渲染 (SSG)
    '/': { prerender: true },
    
    // 產品頁：SWR 快取 1 小時
    '/products/**': { swr: 3600 },
    
    // Admin 後台：僅客戶端渲染 (CSR)
    '/admin/**': { ssr: false },
    
    // API：啟用 CORS
    '/api/**': { cors: true },
    
    // 舊網址：重新導向
    '/old-page': { redirect: '/new-page' }
  }
})`" filename="nuxt.config.ts" />
        </DocsSection>

    </DocsPage>
</template>