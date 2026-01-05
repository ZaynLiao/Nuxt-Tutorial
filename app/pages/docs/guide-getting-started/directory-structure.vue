<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'explorer', label: '結構探索 (Explorer)' },
            { id: 'aliases', label: '路徑別名 (Aliases)' }
        ]
    })

    useHead({
        title: '目錄結構 (Directory Structure)',
        meta: [
            { name: 'description', content: '深入了解 Nuxt 4 的目錄架構，透過互動式導覽掌握 app/ 與 server/ 的職責分離。' }
        ]
    })

    // --- Interactive Tree Logic ---
    type DirInfo = {
        id: string
        name: string
        icon: string
        color: 'emerald' | 'sky' | 'amber' | 'slate' | 'rose'
        description: string
        details: string
        tags: string[]
        children?: DirInfo[]
    }

    const directories: DirInfo[] = [
        {
            id: 'root',
            name: 'Project Root',
            icon: 'heroicons:folder-open',
            color: 'slate',
            description: '專案根目錄，存放設定檔與環境變數。',
            details: '這是專案的起點。Nuxt 4 採用極簡的根目錄結構，將大部分邏輯移至 app/ 與 server/ 中，保持根目錄整潔。',
            tags: ['Config', 'Env'],
            children: [
                {
                    id: 'nuxt-config',
                    name: 'nuxt.config.ts',
                    icon: 'logos:nuxt-icon',
                    color: 'slate',
                    description: 'Nuxt 的核心設定檔。',
                    details: '用於設定模組 (Modules)、執行環境 (Runtime Config)、CSS、Plugins 等。這是控制 Nuxt 行為的中樞。',
                    tags: ['Configuration']
                },
                {
                    id: 'app',
                    name: 'app/',
                    icon: 'heroicons:computer-desktop',
                    color: 'emerald',
                    description: '前端應用程式邏輯 (Vue App)。',
                    details: '這是開發者最常工作的地方。Nuxt 會自動掃描此目錄下的檔案，並處理路由、元件引入與狀態管理。',
                    tags: ['Frontend', 'Vue', 'Auto-import'],
                    children: [
                        {
                            id: 'pages',
                            name: 'pages/',
                            icon: 'heroicons:document-duplicate',
                            color: 'emerald',
                            description: '檔案系統路由 (File-based Routing)。',
                            details: '這裡的每個 .vue 檔案都會自動變成一個路由。例如 pages/about.vue 會變成 /about 頁面。',
                            tags: ['Routing', 'Views']
                        },
                        {
                            id: 'components',
                            name: 'components/',
                            icon: 'heroicons:cube',
                            color: 'emerald',
                            description: 'Vue 元件庫。',
                            details: '這裡的元件會被自動引入 (Auto-imported)。你可以在任何頁面直接使用 <Button /> 而不需要 import Button from ...',
                            tags: ['UI', 'Reusability']
                        },
                        {
                            id: 'layouts',
                            name: 'layouts/',
                            icon: 'heroicons:view-columns',
                            color: 'emerald',
                            description: '頁面佈局模板。',
                            details: '用於定義多個頁面共用的結構，例如導覽列 (Navbar) 或頁尾 (Footer)。透過 <NuxtLayout> 使用。',
                            tags: ['Structure']
                        },
                        {
                            id: 'composables',
                            name: 'composables/',
                            icon: 'heroicons:code-bracket',
                            color: 'emerald',
                            description: '組合式函數 (Composables)。',
                            details: '存放可重用的商業邏輯。這裡的函數也會被自動引入，例如 useUser() 或 useCart()。',
                            tags: ['Logic', 'State']
                        },
                        {
                            id: 'assets',
                            name: 'assets/',
                            icon: 'heroicons:photo',
                            color: 'emerald',
                            description: '靜態資源 (需編譯)。',
                            details: '存放需要透過 Vite 建置工具處理的資源，如 SCSS、Less 檔案或需要優化的圖片。',
                            tags: ['Styles', 'Images']
                        },
                        {
                            id: 'middleware-app',
                            name: 'middleware/',
                            icon: 'heroicons:shield-check',
                            color: 'emerald',
                            description: '路由中間件 (Route Middleware)。',
                            details: '在頁面導航「之前」執行的邏輯。常用於權限驗證 (Auth Guard) 或重新導向。',
                            tags: ['Guards', 'Navigation']
                        }
                    ]
                },
                {
                    id: 'server',
                    name: 'server/',
                    icon: 'heroicons:server-stack',
                    color: 'sky',
                    description: '後端伺服器邏輯 (Nitro Engine)。',
                    details: '由 Nitro 驅動的伺服器端程式碼。這裡的程式碼只會在伺服器端執行，不會洩漏給客戶端。',
                    tags: ['Backend', 'API', 'Nitro'],
                    children: [
                        {
                            id: 'api',
                            name: 'api/',
                            icon: 'heroicons:bolt',
                            color: 'sky',
                            description: 'API 端點 (API Routes)。',
                            details: '定義後端 API。例如 server/api/users.ts 會自動產生 /api/users 的 RESTful 接口。',
                            tags: ['Endpoints', 'JSON']
                        },
                        {
                            id: 'routes',
                            name: 'routes/',
                            icon: 'heroicons:map',
                            color: 'sky',
                            description: '伺服器路由 (Server Routes)。',
                            details: '處理非 API 的請求，例如動態產生 sitemap.xml、RSS Feed 或伺服器端渲染的 HTML。',
                            tags: ['Sitemap', 'RSS']
                        },
                        {
                            id: 'middleware-server',
                            name: 'middleware/',
                            icon: 'heroicons:shield-check',
                            color: 'sky',
                            description: '伺服器中間件 (Server Middleware)。',
                            details: '在每個請求到達 API 或頁面之前執行。適合處理 CORS、Logging 或請求轉換。',
                            tags: ['Interceptors']
                        }
                    ]
                },
                {
                    id: 'public',
                    name: 'public/',
                    icon: 'heroicons:folder',
                    color: 'amber',
                    description: '公開靜態資源 (Static)。',
                    details: '這裡的檔案不會被編譯，直接映射到網站根目錄。適合 robots.txt, favicon.ico 或不需要處理的圖片。',
                    tags: ['Static', 'Assets']
                }
            ]
        }
    ]

    const activeId = ref('app')
    const activeItem = computed<DirInfo>(() => {
        const findItem = (items: DirInfo[]): DirInfo | undefined => {
            for (const item of items) {
                if (item.id === activeId.value) return item
                if (item.children) {
                    const found = findItem(item.children)
                    if (found) return found
                }
            }
        }
        return findItem(directories) || directories[0]!
    })

    // Helper to get color classes
    const getColorClasses = (color: string, isBg = false) => {
        const map: Record<string, string> = {
            emerald: isBg ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'text-emerald-400',
            sky: isBg ? 'bg-sky-500/10 border-sky-500/20 text-sky-400' : 'text-sky-400',
            amber: isBg ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'text-amber-400',
            slate: isBg ? 'bg-slate-800/50 border-slate-700 text-slate-300' : 'text-slate-400',
            rose: isBg ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'text-rose-400',
        }
        return map[color] || map.slate
    }
</script>

<template>
    <TutorialPage title="目錄結構" description="Nuxt 4 採用了全新的目錄架構，將應用程式邏輯集中於 app/，實現了更清晰的關注點分離 (Separation of Concerns)。"
        :badges="[{ label: 'Core', color: 'primary' }, { label: 'Architecture', color: 'neutral' }]">

        <!-- Interactive Explorer -->
        <TutorialSection id="explorer" title="結構探索" icon="heroicons:map" separator>
            <p class="mb-6">
                點擊下方的目錄樹，查看每個資料夾的詳細職責與使用規範。
            </p>

            <div class="grid lg:grid-cols-12 gap-6 h-[600px]">
                <!-- Left: Tree View -->
                <div class="lg:col-span-5 h-full">
                    <AppWindow title="Project Explorer" icon="heroicons:folder-open" class="h-full flex flex-col">
                        <div class="flex-1 overflow-y-auto p-2 custom-scrollbar">
                            <AppFileTree :files="directories" v-model="activeId" interactive />
                        </div>
                    </AppWindow>
                </div>

                <!-- Right: Detail View -->
                <div class="lg:col-span-7 h-full">
                    <div
                        class="h-full rounded-xl border border-slate-800 bg-slate-900/30 backdrop-blur-sm p-1 relative overflow-hidden group">
                        <!-- Background Glow -->
                        <div class="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20 transition-colors duration-500 pointer-events-none"
                            :class="activeItem.color === 'emerald' ? 'bg-emerald-500' : activeItem.color === 'sky' ? 'bg-sky-500' : activeItem.color === 'amber' ? 'bg-amber-500' : 'bg-slate-500'">
                        </div>

                        <div class="relative h-full flex flex-col p-6 md:p-8">
                            <!-- Header -->
                            <div class="flex items-start justify-between mb-6">
                                <div class="flex items-center gap-4">
                                    <div class="p-3 rounded-xl border transition-colors duration-300"
                                        :class="getColorClasses(activeItem.color, true)">
                                        <Icon :name="activeItem.icon" class="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 class="text-2xl font-bold text-white tracking-tight">{{ activeItem.name }}
                                        </h3>
                                        <p class="text-slate-400 text-sm mt-1">{{ activeItem.description }}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Tags -->
                            <div class="flex flex-wrap gap-2 mb-8">
                                <span v-for="tag in activeItem.tags" :key="tag"
                                    class="px-2.5 py-1 rounded-md text-xs font-medium border transition-colors duration-300"
                                    :class="activeItem.color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' :
                                        activeItem.color === 'sky' ? 'bg-sky-500/10 border-sky-500/20 text-sky-300' :
                                            activeItem.color === 'amber' ? 'bg-amber-500/10 border-amber-500/20 text-amber-300' :
                                                'bg-slate-700/30 border-slate-600 text-slate-300'">
                                    #{{ tag }}
                                </span>
                            </div>

                            <!-- Content -->
                            <div class="prose prose-invert prose-sm max-w-none flex-1">
                                <h4 class="text-slate-200 font-semibold mb-3 flex items-center gap-2">
                                    <Icon name="heroicons:information-circle" class="w-5 h-5 text-slate-400" />
                                    詳細說明
                                </h4>
                                <p class="text-slate-300 leading-relaxed text-base">
                                    {{ activeItem.details }}
                                </p>

                                <!-- Contextual Tips based on selection -->
                                <div v-if="activeItem.id === 'pages'"
                                    class="mt-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                                    <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Naming
                                        Convention</div>
                                    <ul class="space-y-2 text-sm text-slate-300">
                                        <li class="flex items-center gap-2">
                                            <Icon name="heroicons:check-circle" class="w-4 h-4 text-emerald-400" />
                                            <span>index.vue = /</span>
                                        </li>
                                        <li class="flex items-center gap-2">
                                            <Icon name="heroicons:check-circle" class="w-4 h-4 text-emerald-400" />
                                            <span>[id].vue = 動態路由 (e.g., /users/1)</span>
                                        </li>
                                    </ul>
                                </div>

                                <div v-if="activeItem.id === 'components'"
                                    class="mt-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                                    <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Best
                                        Practice</div>
                                    <p class="text-sm text-slate-300">
                                        使用 PascalCase 命名元件，例如 <code class="text-emerald-300">UserProfile.vue</code>。
                                        Nuxt 會自動將其註冊為 <code class="text-emerald-300">&lt;UserProfile /&gt;</code>。
                                    </p>
                                </div>

                                <div v-if="activeItem.id === 'server'"
                                    class="mt-6 p-4 rounded-lg bg-sky-900/20 border border-sky-700/30">
                                    <div class="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">Security
                                        Note</div>
                                    <p class="text-sm text-sky-200/80">
                                        這裡的程式碼擁有伺服器端權限。請務必驗證所有輸入資料，並小心處理資料庫連線字串等敏感資訊。
                                    </p>
                                </div>

                            </div>

                            <!-- Footer Hint -->
                            <div
                                class="mt-auto pt-6 border-t border-slate-800/50 flex items-center justify-between text-xs text-slate-500">
                                <span>ID: {{ activeItem.id }}</span>
                                <span class="flex items-center gap-1">
                                    <Icon name="heroicons:cursor-arrow-rays" class="w-3 h-3" />
                                    Select to view details
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TutorialSection>

        <!-- Aliases Section -->
        <TutorialSection id="aliases" title="路徑別名 (Aliases)" icon="heroicons:at-symbol">
            <p>
                為了避免使用冗長的相對路徑 (如 <code class="text-slate-500">../../components/Button.vue</code>)，Nuxt 提供了預設別名。
            </p>

            <div class="grid md:grid-cols-2 gap-6">
                <div
                    class="flex items-start gap-4 p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all group">
                    <div
                        class="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-xl group-hover:scale-110 transition-transform">
                        ~</div>
                    <div>
                        <div class="text-slate-200 font-bold text-lg mb-1">指向 app/ 目錄</div>
                        <p class="text-sm text-slate-400 mb-3">
                            用於引入 Vue 元件、Composables 或 Assets。
                        </p>
                        <div
                            class="text-xs font-mono bg-slate-950 px-2 py-1.5 rounded text-emerald-400 border border-slate-800">
                            ~/components/Header.vue
                        </div>
                    </div>
                </div>

                <div
                    class="flex items-start gap-4 p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-sky-500/30 transition-all group">
                    <div
                        class="w-12 h-12 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 font-bold text-xl group-hover:scale-110 transition-transform">
                        @</div>
                    <div>
                        <div class="text-slate-200 font-bold text-lg mb-1">指向 專案根目錄</div>
                        <p class="text-sm text-slate-400 mb-3">
                            用於引入設定檔或根目錄下的資源。
                        </p>
                        <div
                            class="text-xs font-mono bg-slate-950 px-2 py-1.5 rounded text-sky-400 border border-slate-800">
                            @/nuxt.config.ts
                        </div>
                    </div>
                </div>
            </div>
        </TutorialSection>

    </TutorialPage>
</template>

<style scoped>
    .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
    }

    .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #334155;
        border-radius: 2px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #475569;
    }
</style>
