<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'intro', label: '什麼是 DevTools？' },
            { id: 'features', label: '核心功能' },
            { id: 'usage', label: '使用技巧' }
        ]
    })

    useHead({
        title: 'Nuxt DevTools',
        meta: [
            { name: 'description', content: 'Nuxt DevTools 官方開發工具教學：深入了解您的 Nuxt 應用程式，即時除錯、檢視元件樹、監控效能與網路請求。' }
        ]
    })
</script>

<template>
    <TutorialPage title="Nuxt DevTools"
        description="Nuxt DevTools 是開發者的超級瑞士刀。它直接整合在瀏覽器中，讓您能透視 Nuxt 應用程式的每一個細節，從元件結構到伺服器路由，無所遁形。"
        :badges="[{ label: 'DX Experience', color: 'primary' }, { label: 'Debugging', color: 'neutral' }]">

        <!-- Section 1: Intro -->
        <TutorialSection id="intro" title="什麼是 DevTools？" icon="heroicons:wrench-screwdriver" separator>
            <p class="text-slate-400 leading-relaxed mb-6">
                Nuxt DevTools 是一個預設啟用的開發工具列，通常位於視窗底部。它提供了對 Nuxt 內部運作的深度洞察，幫助您更快地理解與除錯應用程式。
            </p>

            <div class="p-6 rounded-xl bg-slate-950 border border-slate-800/50 relative overflow-hidden group">
                <div
                    class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                </div>
                <div class="flex items-center gap-4 mb-4">
                    <div
                        class="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800">
                        <Icon name="logos:nuxt-icon" class="w-6 h-6" />
                    </div>
                    <div>
                        <h3 class="text-white font-medium">Zero Config</h3>
                        <p class="text-sm text-slate-500">Nuxt 4 專案預設啟用，無需額外設定。</p>
                    </div>
                </div>
                <p class="text-slate-400 text-sm">
                    如果您沒有看到 DevTools，請檢查 <code class="text-emerald-400">nuxt.config.ts</code> 中是否啟用了 <code
                        class="text-emerald-400">devtools: { enabled: true }</code>。
                </p>
            </div>
        </TutorialSection>

        <!-- Section 2: Features -->
        <TutorialSection id="features" title="核心功能" icon="heroicons:cube-transparent" separator>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Feature 1 -->
                <div
                    class="p-5 rounded-xl bg-slate-900/50 border border-slate-800/50 hover:border-emerald-500/30 transition-colors">
                    <div class="flex items-center gap-3 mb-3">
                        <Icon name="heroicons:document-duplicate" class="w-6 h-6 text-emerald-400" />
                        <h3 class="text-white font-medium">Pages & Routing</h3>
                    </div>
                    <p class="text-sm text-slate-400">
                        視覺化檢視目前的路由表，查看每個頁面使用的 Layout 與 Middleware，甚至可以直接在 UI 上測試導航。
                    </p>
                </div>

                <!-- Feature 2 -->
                <div
                    class="p-5 rounded-xl bg-slate-900/50 border border-slate-800/50 hover:border-emerald-500/30 transition-colors">
                    <div class="flex items-center gap-3 mb-3">
                        <Icon name="heroicons:cube" class="w-6 h-6 text-blue-400" />
                        <h3 class="text-white font-medium">Components</h3>
                    </div>
                    <p class="text-sm text-slate-400">
                        檢視專案中的所有元件，包含自動引入的元件。可以直接查看元件的 Props 定義與原始碼位置。
                    </p>
                </div>

                <!-- Feature 3 -->
                <div
                    class="p-5 rounded-xl bg-slate-900/50 border border-slate-800/50 hover:border-emerald-500/30 transition-colors">
                    <div class="flex items-center gap-3 mb-3">
                        <Icon name="heroicons:bolt" class="w-6 h-6 text-yellow-400" />
                        <h3 class="text-white font-medium">Imports & Modules</h3>
                    </div>
                    <p class="text-sm text-slate-400">
                        查詢哪些函數是自動引入的 (Auto-imports)，以及專案安裝了哪些模組及其版本資訊。
                    </p>
                </div>

                <!-- Feature 4 -->
                <div
                    class="p-5 rounded-xl bg-slate-900/50 border border-slate-800/50 hover:border-emerald-500/30 transition-colors">
                    <div class="flex items-center gap-3 mb-3">
                        <Icon name="heroicons:server" class="w-6 h-6 text-purple-400" />
                        <h3 class="text-white font-medium">Server Routes</h3>
                    </div>
                    <p class="text-sm text-slate-400">
                        直接在 DevTools 中測試 API 端點 (Nitro Routes)，無需離開瀏覽器或使用 Postman。
                    </p>
                </div>
            </div>
        </TutorialSection>

        <!-- Section 3: Usage Tips -->
        <TutorialSection id="usage" title="使用技巧" icon="heroicons:light-bulb" separator>
            <p class="text-slate-400 mb-6">
                DevTools 不僅僅是檢視工具，它還能幫助您寫程式。
            </p>

            <div class="space-y-6">
                <div class="flex gap-4">
                    <div
                        class="flex-none w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/20">
                        1</div>
                    <div>
                        <h4 class="text-white font-medium mb-1">Open in Editor</h4>
                        <p class="text-slate-400 text-sm">
                            在 DevTools 中點擊任何元件或檔案路徑，可以直接在 VS Code 中開啟該檔案並跳轉到對應行數。
                        </p>
                    </div>
                </div>

                <div class="flex gap-4">
                    <div
                        class="flex-none w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/20">
                        2</div>
                    <div>
                        <h4 class="text-white font-medium mb-1">Split Screen</h4>
                        <p class="text-slate-400 text-sm">
                            您可以將 DevTools 彈出為獨立視窗，或是使用 Split Screen 模式，一邊看 App 一邊看 DevTools 資訊。
                        </p>
                    </div>
                </div>
            </div>
        </TutorialSection>

    </TutorialPage>
</template>