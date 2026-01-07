<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'concept', label: '核心概念' },
            { id: 'types', label: '中間件類型' },
            { id: 'auth-example', label: '實戰：權限驗證' },
            { id: 'return-values', label: '控制導航行為' }
        ]
    })

    useHead({
        title: '路由中間件 (Middleware)',
        meta: [
            { name: 'description', content: '學習如何使用 Nuxt 4 中間件來攔截路由、驗證權限與處理重導向。' }
        ]
    })

    const authMiddlewareCode = `// app/middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUser() // 假設你有這個 Composable

  // 如果未登入，重導向到登入頁
  if (!user.value.isLoggedIn) {
    return navigateTo('/login')
  }
})`

    const pageUsageCode = `<script setup>
definePageMeta({
  middleware: ['auth']
})
<\/script>

<template>
  <h1>Dashboard (Protected)</h1>
</template>`
</script>

<template>
    <DocsPage title="路由中間件" description="中間件就像是大樓的警衛。在使用者真正進入某個頁面之前，中間件會先攔截請求，檢查是否有「通行證」，或者將其引導至正確的方向。"
        :badges="[{ label: 'Core', color: 'primary' }, { label: 'Logic', color: 'neutral' }]">

        <!-- 1. Concept Flow -->
        <DocsSection id="concept" title="核心概念" icon="heroicons:arrows-right-left" separator>
            <p>
                中間件在<strong>路由切換 (Route Change)</strong> 時觸發。它可以在客戶端 (Client-side Navigation) 或伺服器端 (SSR) 執行。
            </p>

            <UiWindow title="Navigation Flow" icon="heroicons:map" class="w-full">
                <div class="flex flex-col md:flex-row items-center justify-between gap-6 p-10 relative bg-slate-950/50">
                    <!-- Step 1: User -->
                    <div class="flex flex-col items-center gap-4 z-10 relative group">
                        <div
                            class="w-24 h-24 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-lg group-hover:border-slate-500 transition-colors">
                            <Icon name="heroicons:user" class="w-10 h-10 text-slate-400" />
                        </div>
                        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">User</span>
                    </div>

                    <!-- Arrow 1 -->
                    <div class="hidden md:flex flex-1 items-center justify-center px-4 relative">
                        <div class="absolute inset-x-0 h-px bg-slate-800"></div>
                        <div
                            class="relative bg-slate-950 p-1.5 rounded-full border border-slate-800 text-slate-500 flex items-center justify-center">
                            <Icon name="heroicons:arrow-right" class="w-4 h-4" />
                        </div>
                    </div>
                    <Icon name="heroicons:arrow-down" class="md:hidden w-8 h-8 text-slate-700 my-4" />

                    <!-- Step 2: Middleware -->
                    <div class="flex flex-col items-center gap-4 z-10 relative group">
                        <div
                            class="absolute -inset-4 bg-emerald-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity">
                        </div>
                        <div
                            class="w-24 h-24 rounded-2xl bg-emerald-950/30 border-2 border-emerald-500/50 flex flex-col items-center justify-center shadow-lg shadow-emerald-500/10 relative overflow-hidden">
                            <!-- Guard Label -->
                            <div
                                class="absolute top-0 inset-x-0 bg-emerald-500/10 py-1 flex justify-center border-b border-emerald-500/20">
                                <span class="text-xs font-bold text-emerald-400 uppercase tracking-widest">Guard</span>
                            </div>
                            <Icon name="heroicons:shield-check" class="w-10 h-10 text-emerald-400 mt-5" />
                        </div>
                        <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Middleware</span>
                    </div>

                    <!-- Arrow 2 -->
                    <div class="hidden md:flex flex-1 items-center justify-center px-4 relative">
                        <div class="absolute inset-x-0 h-px bg-slate-800"></div>
                        <div
                            class="relative bg-slate-950 p-1.5 rounded-full border border-slate-800 text-slate-500 flex items-center justify-center">
                            <Icon name="heroicons:arrow-right" class="w-4 h-4" />
                        </div>
                    </div>
                    <Icon name="heroicons:arrow-down" class="md:hidden w-8 h-8 text-slate-700 my-4" />

                    <!-- Step 3: Page -->
                    <div class="flex flex-col items-center gap-4 z-10 relative group">
                        <div
                            class="w-24 h-24 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-lg group-hover:border-slate-500 transition-colors">
                            <Icon name="heroicons:document-text" class="w-10 h-10 text-slate-400" />
                        </div>
                        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Page</span>
                    </div>
                </div>
            </UiWindow>
        </DocsSection>

        <!-- 2. Types -->
        <DocsSection id="types" title="中間件類型" icon="heroicons:swatch" separator>
            <div class="grid lg:grid-cols-2 gap-8">
                <!-- Visual: File Structure -->
                <UiWindow title="Middleware Structure" icon="heroicons:folder-open" class="h-full">
                    <div class="p-4">
                        <UiFileTree :files="[
                            {
                                name: 'middleware/',
                                icon: 'heroicons:folder-open',
                                color: 'emerald',
                                children: [
                                    { name: 'auth.ts', icon: 'logos:typescript-icon', badge: { text: 'Named', color: 'emerald' } },
                                    { name: 'analytics.global.ts', icon: 'logos:typescript-icon', badge: { text: 'Global', color: 'sky' } }
                                ]
                            },
                            {
                                name: 'pages/',
                                icon: 'heroicons:folder',
                                color: 'slate',
                                children: [
                                    { name: 'dashboard.vue', icon: 'logos:vue', badge: { text: 'Inline', color: 'amber' } }
                                ]
                            }
                        ]" />
                    </div>
                </UiWindow>

                <!-- Explanations -->
                <div class="flex flex-col gap-4 justify-center">
                    <!-- Named Card -->
                    <div
                        class="p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all group">
                        <h3 class="font-bold text-white mb-2 flex items-center gap-2">
                            <span
                                class="w-2 h-2 rounded-full bg-emerald-500 group-hover:shadow-lg group-hover:shadow-emerald-500/50 transition-shadow"></span>
                            具名中間件 (Named)
                        </h3>
                        <p class="text-sm text-slate-400 pl-4 leading-relaxed">
                            最常用的類型。定義在 <code
                                class="text-xs bg-slate-950 px-1 py-0.5 rounded border border-slate-800">middleware/</code>
                            目錄中，透過 <code class="text-xs text-emerald-400">definePageMeta</code> 在特定頁面引用。
                        </p>
                    </div>
                    <!-- Global Card -->
                    <div
                        class="p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-sky-500/30 transition-all group">
                        <h3 class="font-bold text-white mb-2 flex items-center gap-2">
                            <span
                                class="w-2 h-2 rounded-full bg-sky-500 group-hover:shadow-lg group-hover:shadow-sky-500/50 transition-shadow"></span>
                            全域中間件 (Global)
                        </h3>
                        <p class="text-sm text-slate-400 pl-4 leading-relaxed">
                            檔名加上 <code class="text-xs text-sky-400">.global</code> 後綴。會自動應用於<strong>每一個</strong>路由切換，適合
                            Analytics 或全站權限檢查。
                        </p>
                    </div>
                    <!-- Inline Card -->
                    <div
                        class="p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/30 transition-all group">
                        <h3 class="font-bold text-white mb-2 flex items-center gap-2">
                            <span
                                class="w-2 h-2 rounded-full bg-amber-500 group-hover:shadow-lg group-hover:shadow-amber-500/50 transition-shadow"></span>
                            內聯中間件 (Inline)
                        </h3>
                        <p class="text-sm text-slate-400 pl-4 leading-relaxed">
                            直接寫在頁面內。適用於只在該頁面使用的簡單邏輯，不建議用於複雜業務。
                        </p>
                    </div>
                </div>
            </div>
        </DocsSection>

        <!-- 3. Auth Example -->
        <DocsSection id="auth-example" title="實戰：權限驗證" icon="heroicons:lock-closed" separator>
            <p>
                這是最常見的使用場景。我們建立一個 <code class="text-emerald-400">auth</code> 中間件來保護後台頁面。
            </p>

            <div class="space-y-8">
                <!-- Step 1 -->
                <div class="relative group">
                    <div
                        class="absolute -left-3 top-0 bottom-0 w-1 bg-slate-800 group-hover:bg-emerald-500/50 transition-colors rounded-full">
                    </div>
                    <div class="pl-8">
                        <div class="flex items-center gap-3 mb-4">
                            <div
                                class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-white border border-slate-700 group-hover:border-emerald-500/50 group-hover:text-emerald-400 transition-colors">
                                1</div>
                            <h4 class="text-lg font-bold text-white">建立中間件檔案</h4>
                        </div>
                        <UiCodeBlock :code="authMiddlewareCode" lang="ts" filename="app/middleware/auth.ts" />
                    </div>
                </div>

                <!-- Step 2 -->
                <div class="relative group">
                    <div
                        class="absolute -left-3 top-0 bottom-0 w-1 bg-slate-800 group-hover:bg-emerald-500/50 transition-colors rounded-full">
                    </div>
                    <div class="pl-8">
                        <div class="flex items-center gap-3 mb-4">
                            <div
                                class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-white border border-slate-700 group-hover:border-emerald-500/50 group-hover:text-emerald-400 transition-colors">
                                2</div>
                            <h4 class="text-lg font-bold text-white">在頁面中使用</h4>
                        </div>
                        <UiCodeBlock :code="pageUsageCode" lang="vue" filename="app/pages/dashboard.vue" />
                    </div>
                </div>
            </div>

            <!-- Live Demo -->
            <div class="mt-8 pt-8 border-t border-slate-800/50">
                <div class="flex items-center gap-2 mb-4">
                    <Icon name="heroicons:play" class="w-5 h-5 text-amber-400" />
                    <h3 class="font-bold text-white">實戰演練：權限攔截</h3>
                </div>
                <p class="text-sm text-slate-400 mb-6">
                    試著切換下方的「登入狀態」，並嘗試訪問受保護的 Dashboard 頁面。觀察中間件如何攔截並重導向。
                </p>
                <DemoMiddlewarePlayground />
            </div>
        </DocsSection>

        <!-- 4. Return Values -->
        <DocsSection id="return-values" title="控制導航行為" icon="heroicons:traffic-light">
            <p>
                中間件的回傳值決定了使用者的去向。
            </p>

            <div class="grid sm:grid-cols-2 gap-6">
                <div
                    class="p-6 rounded-xl bg-emerald-950/10 border border-emerald-500/20 flex flex-col gap-3 hover:bg-emerald-950/20 transition-colors">
                    <div class="flex items-center gap-3">
                        <Icon name="heroicons:arrow-right-circle" class="w-6 h-6 text-emerald-400" />
                        <strong class="text-emerald-400 text-lg">navigateTo(path)</strong>
                    </div>
                    <p class="text-sm text-emerald-200/70 leading-relaxed">
                        重導向到指定路徑。這是最常用的回傳值。
                        <br><span class="text-xs opacity-50 mt-2 block">例如：未登入轉跳登入頁。</span>
                    </p>
                </div>

                <div
                    class="p-6 rounded-xl bg-red-950/10 border border-red-500/20 flex flex-col gap-3 hover:bg-red-950/20 transition-colors">
                    <div class="flex items-center gap-3">
                        <Icon name="heroicons:no-symbol" class="w-6 h-6 text-red-400" />
                        <strong class="text-red-400 text-lg">abortNavigation()</strong>
                    </div>
                    <p class="text-sm text-red-200/70 leading-relaxed">
                        終止導航，通常會顯示 404 或錯誤頁面。
                        <br><span class="text-xs opacity-50 mt-2 block">例如：權限不足或資源不存在。</span>
                    </p>
                </div>

                <div
                    class="p-6 rounded-xl bg-slate-900/50 border border-slate-800 flex flex-col gap-3 sm:col-span-2 hover:border-slate-700 transition-colors">
                    <div class="flex items-center gap-3">
                        <Icon name="heroicons:check-circle" class="w-6 h-6 text-slate-400" />
                        <strong class="text-slate-200 text-lg">return (void)</strong>
                    </div>
                    <p class="text-sm text-slate-400 leading-relaxed">
                        如果不回傳任何值（或回傳 undefined），則表示「通過檢查」，繼續前往目標頁面。
                    </p>
                </div>
            </div>
        </DocsSection>

    </DocsPage>
</template>
