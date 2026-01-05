<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'concept', label: '核心概念' },
            { id: 'execution', label: '執行模式' },
            { id: 'provide', label: '注入 Helper' },
            { id: 'vue-plugins', label: '整合 Vue 插件' }
        ]
    })

    useHead({
        title: '插件系統 (Plugins)',
        meta: [
            { name: 'description', content: 'Nuxt 4 插件系統教學：在應用程式初始化時執行邏輯，整合第三方套件，以及注入全域 Helper。' }
        ]
    })

    const providePluginCode = `export default defineNuxtPlugin(() => {
  return {
    provide: {
      hello: (msg: string) => \`Hello \${msg}!\`
    }
  }
})`

    const provideUsageCode = `<script setup>
// 在 script 中使用
const { $hello } = useNuxtApp()
console.log($hello('World'))
<\/script>

<template>
  <!-- 在 template 中直接使用 -->
  <div>{{ $hello('Nuxt') }}</div>
</template>`

    const vuePluginCode = `import { createI18n } from 'vue-i18n'

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    locale: 'en',
    messages: {
      en: { welcome: 'Welcome!' },
      zh: { welcome: '歡迎！' }
    }
  })

  // 註冊 Vue 插件
  nuxtApp.vueApp.use(i18n)
})`
</script>

<template>
    <TutorialPage title="插件系統"
        description="Nuxt 的插件系統允許你在 Vue 應用程式初始化時執行自定義邏輯。這是整合第三方套件（如 Google Analytics、i18n）或注入全域 Helper 的最佳場所。"
        :badges="[{ label: 'Initialization', color: 'primary' }, { label: 'Integration', color: 'neutral' }]">

        <!-- 1. Concept: Lifecycle -->
        <TutorialSection id="concept" title="核心概念" icon="heroicons:puzzle-piece" separator>
            <p>
                Nuxt 會自動讀取 <code class="text-emerald-400">plugins/</code> 目錄下的檔案，並在應用程式建立時執行它們。
                插件是連接 Nuxt 核心與外部邏輯的橋樑。
            </p>

            <AppWindow title="Initialization Lifecycle" icon="heroicons:clock" class="w-full">
                <div class="flex flex-col md:flex-row items-center justify-between gap-6 p-10 relative bg-slate-950/50">
                    <!-- Step 1: App Created -->
                    <div class="flex flex-col items-center gap-4 z-10 relative group">
                        <div
                            class="w-24 h-24 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-lg group-hover:border-slate-500 transition-colors">
                            <Icon name="logos:nuxt-icon" class="w-10 h-10" />
                        </div>
                        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">App Created</span>
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

                    <!-- Step 2: Plugins Run -->
                    <div class="flex flex-col items-center gap-4 z-10 relative group">
                        <div
                            class="absolute -inset-4 bg-emerald-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity">
                        </div>
                        <div
                            class="w-24 h-24 rounded-2xl bg-emerald-950/30 border-2 border-emerald-500/50 flex flex-col items-center justify-center shadow-lg shadow-emerald-500/10 relative overflow-hidden">
                            <!-- Label -->
                            <div
                                class="absolute top-0 inset-x-0 bg-emerald-500/10 py-1 flex justify-center border-b border-emerald-500/20">
                                <span
                                    class="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Run</span>
                            </div>
                            <Icon name="heroicons:puzzle-piece" class="w-10 h-10 text-emerald-400 mt-5" />
                        </div>
                        <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Plugins</span>
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

                    <!-- Step 3: App Mounted -->
                    <div class="flex flex-col items-center gap-4 z-10 relative group">
                        <div
                            class="w-24 h-24 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-lg group-hover:border-slate-500 transition-colors">
                            <Icon name="heroicons:computer-desktop" class="w-10 h-10 text-slate-400" />
                        </div>
                        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Mounted</span>
                    </div>
                </div>
            </AppWindow>
        </TutorialSection>

        <!-- 2. Execution Mode -->
        <TutorialSection id="execution" title="執行模式" icon="heroicons:cpu-chip" separator>
            <p>
                你可以透過檔案名稱後綴來控制插件的執行環境。
            </p>

            <div class="grid lg:grid-cols-2 gap-8">
                <!-- Visual: File Structure -->
                <AppWindow title="Plugins Directory" icon="heroicons:folder-open" class="h-full">
                    <div class="p-4">
                        <AppFileTree :files="[
                            {
                                name: 'plugins/',
                                icon: 'heroicons:folder-open',
                                color: 'emerald',
                                children: [
                                    { name: 'setup.ts', icon: 'logos:typescript-icon', badge: { text: 'Universal', color: 'emerald' } },
                                    { name: 'analytics.client.ts', icon: 'logos:typescript-icon', badge: { text: 'Client', color: 'sky' } },
                                    { name: 'db.server.ts', icon: 'logos:typescript-icon', badge: { text: 'Server', color: 'amber' } }
                                ]
                            }
                        ]" />
                    </div>
                </AppWindow>

                <!-- Explanations -->
                <div class="flex flex-col gap-4 justify-center">
                    <!-- Universal -->
                    <div
                        class="p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all group">
                        <h3 class="font-bold text-white mb-2 flex items-center gap-2">
                            <span
                                class="w-2 h-2 rounded-full bg-emerald-500 group-hover:shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-shadow"></span>
                            Universal (預設)
                        </h3>
                        <p class="text-sm text-slate-400 pl-4 leading-relaxed">
                            在伺服器端與客戶端都會執行。適用於大多數場景，如註冊全域 Helper 或設定共用狀態。
                        </p>
                    </div>
                    <!-- Client Only -->
                    <div
                        class="p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-sky-500/30 transition-all group">
                        <h3 class="font-bold text-white mb-2 flex items-center gap-2">
                            <span
                                class="w-2 h-2 rounded-full bg-sky-500 group-hover:shadow-[0_0_8px_rgba(14,165,233,0.5)] transition-shadow"></span>
                            Client Only
                        </h3>
                        <p class="text-sm text-slate-400 pl-4 leading-relaxed">
                            只在瀏覽器端執行。適用於存取 <code class="text-xs text-sky-400">window</code>、<code
                                class="text-xs text-sky-400">document</code> 或整合純前端套件。
                        </p>
                    </div>
                    <!-- Server Only -->
                    <div
                        class="p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/30 transition-all group">
                        <h3 class="font-bold text-white mb-2 flex items-center gap-2">
                            <span
                                class="w-2 h-2 rounded-full bg-amber-500 group-hover:shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-shadow"></span>
                            Server Only
                        </h3>
                        <p class="text-sm text-slate-400 pl-4 leading-relaxed">
                            只在伺服器端執行。適用於初始化資料庫連線、讀取敏感檔案或處理 Secret Keys。
                        </p>
                    </div>
                </div>
            </div>
        </TutorialSection>

        <!-- 3. Provide Helpers -->
        <TutorialSection id="provide" title="注入 Helper" icon="heroicons:sparkles" separator>
            <p>
                你可以透過回傳 <code class="text-emerald-400">provide</code> 物件，將 Helper 函式注入到整個應用程式中。
                Nuxt 會自動為其加上 <code class="text-white">$</code> 前綴。
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
                            <h4 class="text-lg font-bold text-white">定義插件</h4>
                        </div>
                        <AppCodeBlock :code="providePluginCode" lang="ts" filename="plugins/hello.ts" />
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
                            <h4 class="text-lg font-bold text-white">在元件中使用</h4>
                        </div>
                        <AppCodeBlock :code="provideUsageCode" lang="vue" filename="app.vue" />
                    </div>
                </div>
            </div>

            <!-- Live Demo -->
            <div class="mt-8 pt-8 border-t border-slate-800/50">
                <div class="flex items-center gap-2 mb-4">
                    <Icon name="heroicons:beaker" class="w-5 h-5 text-amber-400" />
                    <h3 class="font-bold text-white">實驗室：Toast Plugin</h3>
                </div>
                <p class="text-sm text-slate-400 mb-6">
                    這個範例模擬了一個 <code class="text-emerald-400">$toast</code> 插件。
                    點擊按鈕，觀察插件如何被呼叫並在介面上顯示通知。
                </p>
                <PluginsDemo />
            </div>
        </TutorialSection>

        <!-- 4. Vue Plugins -->
        <TutorialSection id="vue-plugins" title="整合 Vue 插件" icon="logos:vue">
            <p>
                如果你需要使用傳統的 Vue 插件（如 i18n, Vuetify, Element Plus），可以在 Nuxt 插件中存取 <code
                    class="text-emerald-400">vueApp</code> 實例。
            </p>

            <div class="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                <AppCodeBlock :code="vuePluginCode" lang="ts" filename="plugins/i18n.ts" />
                <div
                    class="mt-4 flex items-start gap-3 text-sm text-slate-400 bg-slate-950/50 p-4 rounded-lg border border-slate-800/50">
                    <Icon name="heroicons:information-circle" class="w-5 h-5 text-emerald-400 shrink-0" />
                    <p>
                        Nuxt 插件的參數 <code class="text-emerald-300">nuxtApp</code> 包含了 <code
                            class="text-emerald-300">vueApp</code> 屬性，這就是標準的 Vue Application Instance。
                    </p>
                </div>
            </div>
        </TutorialSection>

    </TutorialPage>
</template>
