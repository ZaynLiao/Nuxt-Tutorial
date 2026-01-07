<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'overview', label: '生命週期概覽' },
            { id: 'app-hooks', label: 'App Hooks' },
            { id: 'component-hooks', label: 'Component Hooks' },
            { id: 'nitro-hooks', label: 'Nitro Hooks' }
        ]
    })

    useHead({
        title: '生命週期 (Lifecycle)',
        meta: [
            { name: 'description', content: 'Nuxt 4 生命週期全解析：從 Nitro Server 啟動、Nuxt App 初始化，到 Vue 元件的掛載與更新，掌握每一個關鍵時刻。' }
        ]
    })
</script>

<template>
    <DocsPage title="生命週期 (Lifecycle)"
        description="Nuxt 應用程式的生命週期橫跨了伺服器端 (Server) 與客戶端 (Client)。理解這些階段對於資料獲取、插件執行順序以及效能優化至關重要。"
        :badges="[{ label: 'Core Concept', color: 'primary' }, { label: 'Advanced', color: 'neutral' }]">

        <!-- Section 1: Overview -->
        <DocsSection id="overview" title="生命週期概覽" icon="heroicons:clock" separator>
            <p class="text-slate-400 leading-relaxed mb-6">
                Nuxt 的生命週期可以分為三個主要階段：
            </p>

            <div class="space-y-4">
                <div class="p-4 rounded-xl bg-slate-950 border border-slate-800/50 flex items-start gap-4">
                    <div class="mt-1 p-2 rounded-lg bg-purple-500/10 text-purple-400">
                        <Icon name="heroicons:server" class="w-5 h-5" />
                    </div>
                    <div>
                        <h3 class="text-white font-medium mb-1">1. Server Phase (Nitro)</h3>
                        <p class="text-sm text-slate-400">
                            當請求到達伺服器時，Nitro 引擎會先處理。這包括執行 Server Middleware、解析路由，並啟動 Nuxt App 進行 SSR 渲染。
                        </p>
                    </div>
                </div>

                <div class="p-4 rounded-xl bg-slate-950 border border-slate-800/50 flex items-start gap-4">
                    <div class="mt-1 p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                        <Icon name="heroicons:play" class="w-5 h-5" />
                    </div>
                    <div>
                        <h3 class="text-white font-medium mb-1">2. Nuxt App Initialization</h3>
                        <p class="text-sm text-slate-400">
                            無論是在伺服器端還是客戶端，Nuxt App 都會進行初始化。這時會依序執行 Plugins、建立 Pinia Store、執行 Middleware。
                        </p>
                    </div>
                </div>

                <div class="p-4 rounded-xl bg-slate-950 border border-slate-800/50 flex items-start gap-4">
                    <div class="mt-1 p-2 rounded-lg bg-blue-500/10 text-blue-400">
                        <Icon name="heroicons:cube" class="w-5 h-5" />
                    </div>
                    <div>
                        <h3 class="text-white font-medium mb-1">3. Vue Component Lifecycle</h3>
                        <p class="text-sm text-slate-400">
                            最後進入 Vue 的元件生命週期。注意 <code class="text-slate-300">onMounted</code> 僅在客戶端執行，而 <code
                                class="text-slate-300">setup()</code> 會在兩端執行。
                        </p>
                    </div>
                </div>
            </div>
        </DocsSection>

        <!-- Section 2: App Hooks -->
        <DocsSection id="app-hooks" title="App Hooks (Runtime)" icon="heroicons:cog-6-tooth" separator>
            <p class="text-slate-400 mb-6">
                您可以在 <code class="text-emerald-400">plugins/</code> 或 <code class="text-emerald-400">app.vue</code> 中使用
                <code class="text-emerald-400">useNuxtApp().hook()</code> 來監聽這些事件。
            </p>

            <UiCodeBlock language="typescript" :code="`export default defineNuxtPlugin((nuxtApp) => {
  // 當 Nuxt App 實例建立完成時
  nuxtApp.hook('app:created', (vueApp) => {
    console.log('App created!')
  })

  // 當 Vue 應用程式掛載到 DOM 後 (僅 Client)
  nuxtApp.hook('app:mounted', (vueApp) => {
    console.log('App mounted!')
  })

  // 當發生錯誤時
  nuxtApp.hook('app:error', (err) => {
    console.error('Global error:', err)
  })
})`" filename="plugins/lifecycle.ts" />
        </DocsSection>

        <!-- Section 3: Component Hooks -->
        <DocsSection id="component-hooks" title="Component Hooks" icon="heroicons:cube" separator>
            <p class="text-slate-400 mb-6">
                在 Vue 元件中，理解 SSR 與 CSR 的差異至關重要。
            </p>

            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm text-slate-400">
                    <thead class="bg-slate-900/50 text-slate-200 font-medium">
                        <tr>
                            <th class="p-3 rounded-tl-lg">Hook</th>
                            <th class="p-3">Server Side</th>
                            <th class="p-3 rounded-tr-lg">Client Side</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-800/50">
                        <tr>
                            <td class="p-3 font-mono text-emerald-400">setup()</td>
                            <td class="p-3 text-emerald-400">✅ Yes</td>
                            <td class="p-3 text-emerald-400">✅ Yes</td>
                        </tr>
                        <tr>
                            <td class="p-3 font-mono text-blue-400">onBeforeMount</td>
                            <td class="p-3 text-slate-600">❌ No</td>
                            <td class="p-3 text-emerald-400">✅ Yes</td>
                        </tr>
                        <tr>
                            <td class="p-3 font-mono text-blue-400">onMounted</td>
                            <td class="p-3 text-slate-600">❌ No</td>
                            <td class="p-3 text-emerald-400">✅ Yes</td>
                        </tr>
                        <tr>
                            <td class="p-3 font-mono text-purple-400">useAsyncData</td>
                            <td class="p-3 text-emerald-400">✅ Yes (Prefetch)</td>
                            <td class="p-3 text-yellow-400">⚠️ Hydration Only</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div class="flex items-start gap-3">
                    <Icon name="heroicons:exclamation-triangle" class="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                        <h4 class="text-yellow-400 font-medium text-sm">避免 Hydration Mismatch</h4>
                        <p class="text-slate-400 text-xs mt-1">
                            不要在 <code class="text-slate-300">setup()</code> 中使用 <code
                                class="text-slate-300">window</code> 或 <code
                                class="text-slate-300">document</code>，因為它們在伺服器端不存在。請將這些邏輯移至 <code
                                class="text-slate-300">onMounted</code>。
                        </p>
                    </div>
                </div>
            </div>
        </DocsSection>

        <!-- Section 4: Nitro Hooks -->
        <DocsSection id="nitro-hooks" title="Nitro Hooks" icon="heroicons:server-stack">
            <p class="text-slate-400 mb-6">
                Nitro 也有自己的生命週期 Hooks (位於 Server 端)，主要用於擴充伺服器功能或攔截請求。
            </p>

            <UiCodeBlock language="typescript" :code="`// server/plugins/nitro.ts
export default defineNitroPlugin((nitroApp) => {
  // 攔截所有請求
  nitroApp.hooks.hook('request', (event) => {
    console.log('Incoming request:', event.path)
  })

  // 在回應發送前
  nitroApp.hooks.hook('beforeResponse', (event) => {
    // 可以添加自定義 Headers
  })
})`" filename="server/plugins/nitro.ts" />
        </DocsSection>

    </DocsPage>
</template>