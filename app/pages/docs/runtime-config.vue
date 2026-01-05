<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'concept', label: '核心概念' },
            { id: 'setup', label: '設定變數' },
            { id: 'usage', label: '讀取變數' },
            { id: 'env', label: '環境變數覆寫' },
            { id: 'comparison', label: 'Runtime vs App Config' }
        ]
    })

    useHead({
        title: '環境變數 (Runtime Config)',
        meta: [
            { name: 'description', content: 'Nuxt 4 Runtime Config 教學：安全管理 API Keys，區分 Public 與 Private 變數，以及如何使用環境變數覆寫設定。' }
        ]
    })
</script>

<template>
    <TutorialPage title="環境變數"
        description="在開發應用程式時，我們經常需要管理 API 金鑰、資料庫連線字串等敏感資訊。Nuxt 提供了 Runtime Config 來安全地管理這些環境變數，並支援在不同環境（開發/生產）中自動切換。"
        :badges="[{ label: 'Security', color: 'primary' }, { label: 'DevOps', color: 'neutral' }]">

        <!-- 1. Concept: The Security Wall -->
        <TutorialSection id="concept" title="核心概念" icon="heroicons:shield-check" separator>
            <p>
                Runtime Config 的核心目的是<strong>區分私有 (Private) 與公開 (Public) 資訊</strong>。
                私有變數只能在伺服器端存取，永遠不會洩漏給瀏覽器。
            </p>

            <AppWindow title="Security Boundary" icon="heroicons:lock-closed" class="w-full">
                <div class="grid md:grid-cols-2 h-64 relative bg-slate-950">
                    <!-- Server Side (Safe) -->
                    <div class="relative p-6 border-r border-slate-800/50 bg-slate-900/20">
                        <div class="absolute top-4 left-4 flex items-center gap-2">
                            <Icon name="heroicons:server" class="w-5 h-5 text-emerald-500" />
                            <span class="text-xs font-bold text-emerald-500 uppercase tracking-wider">Server Side</span>
                        </div>

                        <div class="mt-10 space-y-3">
                            <div
                                class="flex items-center gap-3 p-3 rounded-lg bg-slate-800 border border-slate-700 shadow-lg">
                                <Icon name="heroicons:key" class="w-5 h-5 text-red-400" />
                                <div>
                                    <div class="text-xs text-slate-400">apiSecret</div>
                                    <div class="text-sm font-mono text-white">sk_live_...</div>
                                </div>
                                <div class="ml-auto text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
                                    Private</div>
                            </div>
                            <div
                                class="flex items-center gap-3 p-3 rounded-lg bg-slate-800 border border-slate-700 shadow-lg opacity-50">
                                <Icon name="heroicons:globe-alt" class="w-5 h-5 text-sky-400" />
                                <div>
                                    <div class="text-xs text-slate-400">public.apiBase</div>
                                    <div class="text-sm font-mono text-white">/api/v1</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Client Side (Public) -->
                    <div class="relative p-6">
                        <div class="absolute top-4 right-4 flex items-center gap-2">
                            <span class="text-xs font-bold text-sky-500 uppercase tracking-wider">Client Side</span>
                            <Icon name="heroicons:computer-desktop" class="w-5 h-5 text-sky-500" />
                        </div>

                        <div class="mt-10 space-y-3">
                            <!-- Blocked Item -->
                            <div
                                class="flex items-center gap-3 p-3 rounded-lg border border-dashed border-slate-800 opacity-30 grayscale">
                                <Icon name="heroicons:key" class="w-5 h-5" />
                                <div>
                                    <div class="text-xs text-slate-400">apiSecret</div>
                                    <div class="text-sm font-mono">undefined</div>
                                </div>
                                <Icon name="heroicons:no-symbol" class="ml-auto w-5 h-5 text-red-500" />
                            </div>

                            <!-- Allowed Item -->
                            <div
                                class="flex items-center gap-3 p-3 rounded-lg bg-slate-800 border border-slate-700 shadow-lg">
                                <Icon name="heroicons:globe-alt" class="w-5 h-5 text-sky-400" />
                                <div>
                                    <div class="text-xs text-slate-400">public.apiBase</div>
                                    <div class="text-sm font-mono text-white">/api/v1</div>
                                </div>
                                <div class="ml-auto text-xs bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded-full">
                                    Public</div>
                            </div>
                        </div>
                    </div>

                    <!-- The Wall -->
                    <div
                        class="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent">
                    </div>
                    <div
                        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 border border-emerald-500/50 text-emerald-400 text-xs px-2 py-1 rounded-full shadow-lg shadow-emerald-500/30 z-10">
                        Hydration Boundary
                    </div>
                </div>
            </AppWindow>
        </TutorialSection>

        <!-- 2. Setup -->
        <TutorialSection id="setup" title="設定變數" icon="heroicons:adjustments-horizontal" separator>
            <p>
                在 <code class="text-emerald-400">nuxt.config.ts</code> 中定義。
                根層級的屬性為<strong>私有</strong>，<code class="text-white">public</code> 物件內的屬性為<strong>公開</strong>。
            </p>

            <AppCodeBlock code="export default defineNuxtConfig({
  runtimeConfig: {
    // [Private] 僅 Server 可見
    // 這裡的值可以設為空字串，等待環境變數覆寫
    apiSecret: '', 
    
    // [Public] Client & Server 皆可見
    public: {
      apiBase: '/api',
      siteName: 'My Nuxt App'
    }
  }
})" lang="ts" filename="nuxt.config.ts" />
        </TutorialSection>

        <!-- 3. Usage -->
        <TutorialSection id="usage" title="讀取變數" icon="heroicons:code-bracket" separator>
            <p>
                使用 <code class="text-emerald-400">useRuntimeConfig()</code> Composable 來存取設定。
                Nuxt 會自動為這些變數提供型別支援。
            </p>

            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                    <div class="flex items-center justify-between px-2">
                        <span class="text-xs font-bold text-emerald-500 uppercase">server/api/test.ts</span>
                    </div>
                    <AppCodeBlock code="export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  
  // Server 端可以存取所有變數
  console.log(config.apiSecret) 
  console.log(config.public.apiBase)
})" lang="ts" />
                </div>

                <div class="space-y-2">
                    <div class="flex items-center justify-between px-2">
                        <span class="text-xs font-bold text-sky-500 uppercase">app.vue</span>
                    </div>
                    <AppCodeBlock code="<script setup>
const config = useRuntimeConfig()

// Client 端只能存取 public 內的變數
console.log(config.public.apiBase)

// ❌ 嘗試存取私有變數會得到 undefined
console.log(config.apiSecret) 
</script>" lang="vue" />
                </div>
            </div>
        </TutorialSection>

        <!-- 4. Env Override -->
        <TutorialSection id="env" title="環境變數覆寫" icon="heroicons:arrow-path-rounded-square" separator>
            <p>
                在生產環境中，你不需要修改程式碼。Nuxt 會自動讀取符合 <code class="text-emerald-400">NUXT_</code> 命名規則的環境變數來覆寫設定。
                這對於 CI/CD 部署非常重要。
            </p>

            <div class="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                <div class="flex flex-col gap-4">
                    <!-- Mapping 1 -->
                    <div class="flex items-center justify-between group">
                        <div class="font-mono text-sm text-slate-400 group-hover:text-white transition-colors">
                            runtimeConfig.<span class="text-emerald-400">apiSecret</span>
                        </div>
                        <Icon name="heroicons:arrow-long-right"
                            class="text-slate-600 group-hover:text-emerald-500 transition-colors" />
                        <div class="font-mono text-sm text-slate-500 group-hover:text-emerald-400 transition-colors">
                            NUXT_API_SECRET
                        </div>
                    </div>

                    <!-- Mapping 2 -->
                    <div class="flex items-center justify-between group">
                        <div class="font-mono text-sm text-slate-400 group-hover:text-white transition-colors">
                            runtimeConfig.public.<span class="text-sky-400">apiBase</span>
                        </div>
                        <Icon name="heroicons:arrow-long-right"
                            class="text-slate-600 group-hover:text-sky-500 transition-colors" />
                        <div class="font-mono text-sm text-slate-500 group-hover:text-sky-400 transition-colors">
                            NUXT_PUBLIC_API_BASE
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-4">
                <AppCodeBlock filename=".env" code="NUXT_API_SECRET=sk_prod_123456789
NUXT_PUBLIC_API_BASE=https://api.production.com" lang="bash" />
            </div>

            <!-- Live Demo -->
            <div class="mt-8 pt-8 border-t border-slate-800/50">
                <div class="flex items-center gap-2 mb-4">
                    <Icon name="heroicons:adjustments-vertical" class="w-5 h-5 text-amber-400" />
                    <h3 class="font-bold text-white">實驗室：環境變數覆寫</h3>
                </div>
                <p class="text-sm text-slate-400 mb-6">
                    試著修改左側的環境變數，觀察右側的 Runtime Config 如何即時更新。
                    注意 <code class="text-red-400">apiSecret</code> 在 Client Context 中始終為 <code
                        class="text-slate-500">undefined</code>。
                </p>
                <RuntimeConfigDemo />
            </div>
        </TutorialSection>

        <!-- 5. Comparison -->
        <TutorialSection id="comparison" title="Runtime vs App Config" icon="heroicons:scale">
            <p>
                Nuxt 還有另一個設定檔 <code class="text-white">app.config.ts</code>。它們有什麼不同？
            </p>

            <div class="grid md:grid-cols-2 gap-6">
                <!-- Runtime Config -->
                <div class="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                            <Icon name="heroicons:cog-6-tooth" class="w-6 h-6" />
                        </div>
                        <h3 class="font-bold text-white">Runtime Config</h3>
                    </div>
                    <ul class="space-y-2 text-sm text-slate-400">
                        <li class="flex items-start gap-2">
                            <Icon name="heroicons:check" class="w-4 h-4 text-emerald-500 mt-0.5" />
                            <span>私有/敏感資訊 (API Keys)</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <Icon name="heroicons:check" class="w-4 h-4 text-emerald-500 mt-0.5" />
                            <span>需要環境變數覆寫 (Build vs Runtime)</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <Icon name="heroicons:check" class="w-4 h-4 text-emerald-500 mt-0.5" />
                            <span>在 Build 之後仍可改變</span>
                        </li>
                    </ul>
                </div>

                <!-- App Config -->
                <div class="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                            <Icon name="heroicons:paint-brush" class="w-6 h-6" />
                        </div>
                        <h3 class="font-bold text-white">App Config</h3>
                    </div>
                    <ul class="space-y-2 text-sm text-slate-400">
                        <li class="flex items-start gap-2">
                            <Icon name="heroicons:check" class="w-4 h-4 text-purple-500 mt-0.5" />
                            <span>公開資訊 (UI Theme, Title)</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <Icon name="heroicons:check" class="w-4 h-4 text-purple-500 mt-0.5" />
                            <span>不需要環境變數覆寫</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <Icon name="heroicons:check" class="w-4 h-4 text-purple-500 mt-0.5" />
                            <span>在 Build 時就決定了 (Bundled)</span>
                        </li>
                    </ul>
                </div>
            </div>
        </TutorialSection>

    </TutorialPage>
</template>
