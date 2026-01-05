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
    <TutorialPage title="渲染模式 (Rendering Modes)"
        description="Nuxt 4 不僅僅是 SSR 框架。透過強大的 Nitro 引擎，您可以為應用程式中的「每一個路由」單獨設定渲染策略。"
        :badges="[{ label: 'Performance', color: 'primary' }, { label: 'Hybrid', color: 'primary' }]">

        <!-- Section 1: Universal Rendering -->
        <TutorialSection id="universal" title="通用渲染 (Universal Rendering)" icon="heroicons:globe-alt" separator>
            <p class="text-slate-400 mb-6">
                這是 Nuxt 的預設模式。頁面首先在伺服器端渲染 (SSR) 產生 HTML，傳送給瀏覽器以利 SEO 與首屏顯示，接著在客戶端進行「水合 (Hydration)」變為互動式應用。
            </p>

            <div class="p-6 rounded-3xl bg-slate-950 border border-slate-800/50">
                <h4 class="font-bold text-emerald-400 mb-2">優點</h4>
                <ul class="list-disc list-inside text-slate-400 space-y-1 text-sm">
                    <li>最佳的 SEO 表現。</li>
                    <li>首屏載入速度快 (FCP)。</li>
                    <li>保留完整的互動性。</li>
                </ul>
            </div>
        </TutorialSection>

        <!-- Section 2: Client-Side Rendering -->
        <TutorialSection id="client-side" title="客戶端渲染 (CSR)" icon="heroicons:computer-desktop" separator>
            <p class="text-slate-400 mb-6">
                就像傳統的 Vue SPA。伺服器只回傳一個空的 HTML shell，所有的內容都由 JavaScript 在瀏覽器中渲染。
                適用於不需要 SEO 的後台管理系統或高度互動的儀表板。
            </p>

            <AppCodeBlock language="typescript" :code="`export default defineNuxtConfig({
  // 全域關閉 SSR
  ssr: false
})`" filename="nuxt.config.ts" />

            <p class="text-slate-400 my-4 text-sm">或者針對特定頁面：</p>

            <AppCodeBlock language="typescript" :code="`definePageMeta({
  ssr: false
})`" filename="app/pages/admin.vue" />
        </TutorialSection>

        <!-- Section 3: Hybrid Rendering -->
        <TutorialSection id="hybrid" title="混合渲染 (Hybrid Rendering)" icon="heroicons:beaker" separator>
            <p class="text-slate-400 mb-6">
                這是 Nuxt 4 最強大的功能。您可以結合 SSR、CSR、SSG、SWR 於同一個專案中。
                例如：首頁使用 SSR (SEO)，後台使用 CSR (互動)，部落格文章使用 ISR (快取)。
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-6 rounded-3xl bg-slate-950 border border-slate-800/50">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="px-2 py-1 rounded text-xs font-bold bg-blue-500/10 text-blue-400">SWR</span>
                        <h4 class="font-bold text-slate-200">Stale-While-Revalidate</h4>
                    </div>
                    <p class="text-slate-400 text-sm">
                        伺服器快取回應。當快取過期時，先回傳舊資料，同時在背景更新快取。
                    </p>
                </div>

                <div class="p-6 rounded-3xl bg-slate-950 border border-slate-800/50">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="px-2 py-1 rounded text-xs font-bold bg-purple-500/10 text-purple-400">ISR</span>
                        <h4 class="font-bold text-slate-200">Incremental Static Regeneration</h4>
                    </div>
                    <p class="text-slate-400 text-sm">
                        類似 SSG，但可以在部署後按需重新生成靜態頁面，無需重新建置整個網站。
                    </p>
                </div>
            </div>
        </TutorialSection>

        <!-- Section 4: Route Rules -->
        <TutorialSection id="route-rules" title="路由規則設定" icon="heroicons:adjustments-vertical" separator>
            <p class="text-slate-400 mb-6">
                透過 <code class="text-emerald-400">routeRules</code>，您可以精細控制每個路徑的渲染行為。
            </p>

            <AppCodeBlock language="typescript" :code="`export default defineNuxtConfig({
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
        </TutorialSection>

    </TutorialPage>
</template>