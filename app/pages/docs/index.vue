<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'start', label: '起步走' },
            { id: 'core', label: '核心概念' },
            { id: 'architecture', label: '架構設計' },
            { id: 'features', label: '進階功能' },
            { id: 'components', label: '內建元件' }
        ]
    })

    useHead({
        title: '文件導覽',
        meta: [
            { name: 'description', content: 'Nuxt 4 繁體中文教學導覽：從安裝、目錄結構到進階的伺服器路由與 SEO 設定，循序漸進掌握 Nuxt 開發技巧。' }
        ]
    })

    const sections = [
        {
            id: 'start',
            title: '起步走',
            icon: 'heroicons:rocket-launch',
            items: [
                { title: '安裝與啟動', path: '/docs/installation', icon: 'heroicons:command-line', desc: '建立專案、執行開發模式、理解常用指令。' },
                { title: '目錄結構', path: '/docs/directory-structure', icon: 'heroicons:folder', desc: '認識 app/、server/、public/ 等目錄的角色。' },
                { title: '路由系統', path: '/docs/routing', icon: 'heroicons:map', desc: '檔案即路由 (File-based Routing) 的運作機制。' },
            ]
        },
        {
            id: 'core',
            title: '核心概念',
            icon: 'heroicons:cpu-chip',
            items: [
                { title: '資料獲取', path: '/docs/data-fetching', icon: 'heroicons:cloud-arrow-down', desc: 'useAsyncData 與 useFetch 的最佳實踐。' },
                { title: '狀態管理', path: '/docs/state-management', icon: 'heroicons:circle-stack', desc: 'useState 與 Pinia 的使用時機。' },
                { title: '錯誤處理', path: '/docs/error-handling', icon: 'heroicons:exclamation-triangle', desc: '如何優雅地處理 404 與 500 錯誤。' },
            ]
        },
        {
            id: 'architecture',
            title: '架構設計',
            icon: 'heroicons:building-library',
            items: [
                { title: 'Middleware', path: '/docs/route-middleware', icon: 'heroicons:shield-check', desc: '路由守衛與請求攔截。' },
                { title: 'Layouts', path: '/docs/layouts', icon: 'heroicons:rectangle-group', desc: '共用版型與巢狀佈局。' },
                { title: 'Plugins', path: '/docs/plugins', icon: 'heroicons:puzzle-piece', desc: '擴充 Nuxt 功能與整合第三方套件。' },
                { title: 'Runtime Config', path: '/docs/runtime-config', icon: 'heroicons:cog-6-tooth', desc: '環境變數與機密資料管理。' },
            ]
        },
        {
            id: 'features',
            title: '進階功能',
            icon: 'heroicons:sparkles',
            items: [
                { title: 'SEO 設定', path: '/docs/seo', icon: 'heroicons:magnifying-glass', desc: 'Meta Tags 與 Open Graph 設定。' },
                { title: '靜態資源', path: '/docs/assets', icon: 'heroicons:photo', desc: '圖片、字型與樣式處理。' },
                { title: '伺服器路由', path: '/docs/server-routes', icon: 'heroicons:server', desc: '建立 API Endpoints 與後端邏輯。' },
            ]
        },
        {
            id: 'components',
            title: '內建元件',
            icon: 'heroicons:cube',
            items: [
                { title: 'NuxtLink', path: '/docs/components/nuxt-link', icon: 'heroicons:link', desc: '智慧導航連結。' },
                { title: 'NuxtImg', path: '/docs/components/nuxt-img', icon: 'heroicons:photo', desc: '圖片最佳化。' },
                { title: 'ClientOnly', path: '/docs/components/client-only', icon: 'heroicons:computer-desktop', desc: '僅在客戶端渲染。' },
                { title: '更多元件...', path: '/docs/components/auto-imports', icon: 'heroicons:squares-plus', desc: '查看完整元件列表。' },
            ]
        }
    ]
</script>

<template>
    <TutorialPage title="Nuxt 文件導覽" description="這是一個參考 Nuxt 官方文件版面所製作的繁體中文教學站，重點是清楚的資訊層級與好讀的暗色介面。"
        :badges="[{ label: 'Nuxt 4', color: 'primary' }, { label: 'Tutorial', color: 'neutral' }]">

        <div v-for="section in sections" :key="section.id" :id="section.id" class="mb-16 scroll-mt-24">
            <div class="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                <div class="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Icon :name="section.icon" class="w-6 h-6" />
                </div>
                <h2 class="text-2xl font-bold text-white">{{ section.title }}</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <NuxtLink v-for="item in section.items" :key="item.path" :to="item.path"
                    class="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-5 hover:border-emerald-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">

                    <div class="flex items-start justify-between mb-3">
                        <div
                            class="p-2 rounded-lg bg-slate-800 text-slate-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
                            <Icon :name="item.icon" class="w-5 h-5" />
                        </div>
                        <Icon name="heroicons:arrow-right"
                            class="w-4 h-4 text-slate-600 group-hover:text-emerald-500 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                    </div>

                    <h3 class="text-base font-bold text-slate-200 group-hover:text-white mb-2 transition-colors">
                        {{ item.title }}
                    </h3>
                    <p class="text-sm text-slate-500 group-hover:text-slate-400 transition-colors line-clamp-2">
                        {{ item.desc }}
                    </p>
                </NuxtLink>
            </div>
        </div>

    </TutorialPage>
</template>
