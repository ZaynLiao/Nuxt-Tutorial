<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'fs-routing', label: '檔案系統路由' },
            { id: 'dynamic-routes', label: '動態路由' },
            { id: 'nested-routes', label: '巢狀路由' },
            { id: 'navigation', label: '導覽與連結' }
        ]
    })

    useHead({
        title: '路由系統 (Routing)',
        meta: [
            { name: 'description', content: '掌握 Nuxt 4 的檔案系統路由，包含動態參數、巢狀結構與導覽最佳實踐。' }
        ]
    })
</script>

<template>
    <DocsPage title="路由系統" description="Nuxt 摒棄了繁瑣的路由設定檔。你只需要在 pages/ 目錄下建立檔案，路由就會自動生成。"
        :badges="[{ label: 'Core', color: 'primary' }, { label: 'Routing', color: 'neutral' }]">

        <!-- 1. File System Routing -->
        <DocsSection id="fs-routing" title="檔案系統路由" icon="heroicons:map" separator>
            <p>
                Nuxt 會掃描 <code class="text-emerald-400">app/pages/</code> 目錄下的所有 Vue 檔案，並自動為它們建立路由配置。
            </p>

            <div class="grid lg:grid-cols-2 gap-8">
                <UiWindow title="File Structure" icon="heroicons:folder-open" class="h-full">
                    <div class="p-2">
                        <UiFileTree :files="[
                            {
                                name: 'pages/',
                                icon: 'heroicons:folder-open',
                                color: 'emerald',
                                children: [
                                    { name: 'index.vue', icon: 'logos:vue', badge: { text: '/', color: 'emerald' } },
                                    { name: 'about.vue', icon: 'logos:vue', badge: { text: '/about', color: 'emerald' } },
                                    { name: 'contact.vue', icon: 'logos:vue', badge: { text: '/contact', color: 'emerald' } }
                                ]
                            }
                        ]" />
                    </div>
                </UiWindow>

                <div class="flex flex-col justify-center gap-4">
                    <div class="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                        <h3 class="text-lg font-bold text-white mb-2 flex items-center gap-2">
                            <Icon name="heroicons:sparkles" class="text-amber-400" />
                            自動化優勢
                        </h3>
                        <p class="text-slate-400 text-sm leading-relaxed">
                            你不再需要維護冗長的 <code class="text-slate-300">router.js</code>。
                            新增檔案即新增頁面，刪除檔案即移除頁面。這讓專案結構與網址結構保持高度一致，極大降低了維護成本。
                        </p>
                    </div>
                    <div class="p-4 rounded-xl bg-emerald-950/10 border border-emerald-500/20 flex items-center gap-3">
                        <Icon name="heroicons:check-circle" class="w-6 h-6 text-emerald-400" />
                        <span class="text-sm text-emerald-200">支援熱模組替換 (HMR)，新增頁面無需重啟伺服器。</span>
                    </div>
                </div>
            </div>

            <!-- Interactive Matcher -->
            <div class="mt-8 pt-8 border-t border-slate-800/50">
                <div class="flex items-center gap-2 mb-4">
                    <Icon name="heroicons:adjustments-horizontal" class="w-5 h-5 text-amber-400" />
                    <h3 class="font-bold text-white">路由模擬器</h3>
                </div>
                <p class="text-sm text-slate-400 mb-6">
                    試著在網址列輸入不同的路徑 (例如 <code class="text-emerald-400">/users/123</code> 或 <code
                        class="text-emerald-400">/posts/hello-world</code>)，觀察 Nuxt 如何匹配檔案並提取參數。
                </p>
                <DemoRouteMatcher />
            </div>
        </DocsSection>

        <!-- 2. Dynamic Routes -->
        <DocsSection id="dynamic-routes" title="動態路由" icon="heroicons:variable" separator>
            <p>
                當你需要為不同的 ID 或 Slug 呈現相同的頁面版型時（例如產品頁、文章頁），可以使用方括號 <code class="text-emerald-400">[]</code> 來定義動態參數。
            </p>

            <div class="grid lg:grid-cols-2 gap-8">
                <div class="space-y-4">
                    <UiWindow title="Dynamic File" icon="heroicons:folder-open">
                        <div class="p-2">
                            <UiFileTree :files="[
                                {
                                    name: 'pages/',
                                    icon: 'heroicons:folder-open',
                                    color: 'emerald',
                                    children: [
                                        {
                                            name: 'users/',
                                            icon: 'heroicons:folder',
                                            color: 'slate',
                                            children: [
                                                { name: '[id].vue', icon: 'logos:vue', highlight: true, badge: { text: 'Matches /users/1', color: 'emerald' } }
                                            ]
                                        }
                                    ]
                                }
                            ]" />
                        </div>
                    </UiWindow>

                    <div class="p-4 rounded-xl bg-slate-900 border border-slate-800">
                        <h4 class="text-sm font-bold text-slate-300 mb-2">如何取得參數？</h4>
                        <p class="text-xs text-slate-400 mb-3">
                            在元件中，使用 <code class="text-emerald-400">useRoute()</code> Composable。
                        </p>
                        <UiCodeBlock code="<script setup>
const route = useRoute()
console.log(route.params.id)
</script>" lang="vue" filename="pages/users/[id].vue" />
                    </div>
                </div>

                <div class="space-y-4">
                    <h3 class="text-lg font-bold text-white">更多模式</h3>

                    <!-- Catch-all -->
                    <div
                        class="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-sky-500/30 transition-all">
                        <div class="flex items-center gap-3 mb-2">
                            <code class="text-sky-400 font-bold bg-sky-950/30 px-2 py-1 rounded">[...slug].vue</code>
                            <span class="text-xs text-sky-500 border border-sky-500/20 px-1.5 rounded">Catch-all</span>
                        </div>
                        <p class="text-sm text-slate-400">
                            匹配所有剩餘路徑。常用於 404 頁面或 CMS 內容頁。
                            <br>
                            <span class="text-xs text-slate-500">例如: /blog/2023/nuxt-4-release</span>
                        </p>
                    </div>

                    <!-- Optional -->
                    <div
                        class="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/30 transition-all">
                        <div class="flex items-center gap-3 mb-2">
                            <code class="text-amber-400 font-bold bg-amber-950/30 px-2 py-1 rounded">[[id]].vue</code>
                            <span
                                class="text-xs text-amber-500 border border-amber-500/20 px-1.5 rounded">Optional</span>
                        </div>
                        <p class="text-sm text-slate-400">
                            可選參數。可以匹配 <code class="text-xs">/users</code> (無參數) 或 <code class="text-xs">/users/1</code>
                            (有參數)。
                        </p>
                    </div>
                </div>
            </div>
        </DocsSection>

        <!-- 3. Nested Routes -->
        <DocsSection id="nested-routes" title="巢狀路由" icon="heroicons:square-3-stack-3d" separator>
            <p>
                Nuxt 支援巢狀路由 (Nested Routes)，這對於建立具有多層級導覽的應用程式（如後台管理系統）非常有用。
            </p>

            <div class="grid lg:grid-cols-2 gap-8 items-center">
                <UiWindow title="Nested Structure" icon="heroicons:folder-open">
                    <div class="p-2">
                        <UiFileTree :files="[
                            {
                                name: 'pages/',
                                icon: 'heroicons:folder-open',
                                color: 'emerald',
                                children: [
                                    { name: 'dashboard.vue', icon: 'logos:vue', color: 'sky', badge: { text: 'Parent Layout', color: 'sky' } },
                                    {
                                        name: 'dashboard/',
                                        icon: 'heroicons:folder-open',
                                        color: 'sky',
                                        children: [
                                            { name: 'index.vue', icon: 'logos:vue', badge: { text: 'Default Child', color: 'slate' } },
                                            { name: 'settings.vue', icon: 'logos:vue', badge: { text: '/dashboard/settings', color: 'slate' } }
                                        ]
                                    }
                                ]
                            }
                        ]" />
                    </div>
                </UiWindow>

                <div class="space-y-4">
                    <div class="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                        <h3 class="text-lg font-bold text-white mb-4">運作原理</h3>
                        <ol class="space-y-4 text-sm text-slate-400 list-decimal list-inside">
                            <li>
                                <strong class="text-sky-400">Parent Component</strong>:
                                <code class="text-xs bg-slate-800 px-1 rounded">dashboard.vue</code> 充當佈局容器。
                            </li>
                            <li>
                                <strong class="text-emerald-400">&lt;NuxtPage /&gt;</strong>:
                                你必須在 Parent 中加入此元件，子頁面才會顯示。
                            </li>
                            <li>
                                <strong class="text-slate-200">Child Routes</strong>:
                                <code class="text-xs bg-slate-800 px-1 rounded">dashboard/settings.vue</code> 的內容會被渲染到
                                Parent 的 <code class="text-xs">&lt;NuxtPage /&gt;</code> 位置。
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </DocsSection>

        <!-- 4. Navigation -->
        <DocsSection id="navigation" title="導覽與連結" icon="heroicons:link">
            <p>
                在 Nuxt 應用程式中切換頁面，請務必使用 <code class="text-emerald-400">&lt;NuxtLink&gt;</code> 元件，而不是標準的 <code
                    class="text-slate-400">&lt;a&gt;</code> 標籤。
            </p>

            <div class="grid md:grid-cols-2 gap-6">
                <!-- Do -->
                <div class="p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/20">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="p-2 rounded-full bg-emerald-500/20 text-emerald-400">
                            <Icon name="heroicons:check" class="w-5 h-5" />
                        </div>
                        <h3 class="font-bold text-emerald-400">使用 NuxtLink</h3>
                    </div>
                    <UiCodeBlock code='<NuxtLink to="/about">
  關於我們
</NuxtLink>' lang="vue" :show-filename="false" />
                    <ul class="mt-4 space-y-2 text-sm text-emerald-200/70">
                        <li class="flex items-center gap-2">
                            <Icon name="heroicons:bolt" class="w-4 h-4" />
                            <span>Client-side Navigation (無刷新跳轉)</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <Icon name="heroicons:arrow-path" class="w-4 h-4" />
                            <span>自動預取 (Prefetching) 下一頁資源</span>
                        </li>
                    </ul>
                </div>

                <!-- Don't -->
                <div class="p-6 rounded-2xl bg-red-950/10 border border-red-500/20">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="p-2 rounded-full bg-red-500/20 text-red-400">
                            <Icon name="heroicons:x-mark" class="w-5 h-5" />
                        </div>
                        <h3 class="font-bold text-red-400">避免使用 a 標籤</h3>
                    </div>
                    <UiCodeBlock code='<a href="/about">
  關於我們
</a>' lang="vue" :show-filename="false" />
                    <ul class="mt-4 space-y-2 text-sm text-red-200/70">
                        <li class="flex items-center gap-2">
                            <Icon name="heroicons:exclamation-triangle" class="w-4 h-4" />
                            <span>導致整頁重新整理 (Full Page Reload)</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <Icon name="heroicons:trash" class="w-4 h-4" />
                            <span>遺失 Vue 應用程式狀態 (State Loss)</span>
                        </li>
                    </ul>
                </div>
            </div>
        </DocsSection>

    </DocsPage>
</template>
