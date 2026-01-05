<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'concept', label: 'Nitro 引擎' },
            { id: 'create-api', label: '建立 API' },
            { id: 'utilities', label: '請求處理工具' },
            { id: 'type-safety', label: '型別安全' }
        ]
    })

    useHead({
        title: '伺服器路由 (Server Routes)',
        meta: [
            { name: 'description', content: 'Nuxt 4 伺服器路由教學：使用 Nitro 引擎建立後端 API，處理請求參數，並享受全端型別安全。' }
        ]
    })
</script>

<template>
    <TutorialPage title="伺服器路由"
        description="Nuxt 不僅僅是前端框架，它內建了強大的伺服器引擎 (Nitro)。你可以在 server/ 目錄下直接撰寫後端 API，無需額外架設 Express 或 Koa 伺服器。"
        :badges="[{ label: 'Nitro Engine', color: 'primary' }, { label: 'Full Stack', color: 'neutral' }]">

        <!-- 1. Concept: Nitro Engine -->
        <TutorialSection id="concept" title="Nitro 引擎" icon="heroicons:cpu-chip" separator>
            <p>
                Nuxt 的後端由 <a href="https://nitro.unjs.io/" target="_blank"
                    class="text-emerald-400 hover:underline">Nitro</a> 驅動。
                它是一個極速、輕量且可移植的伺服器引擎。
            </p>

            <AppWindow title="Nitro Architecture" icon="heroicons:server-stack" class="w-full">
                <div class="p-8 bg-slate-950 flex flex-col items-center gap-8">
                    <!-- Top: Client -->
                    <div class="flex items-center gap-4">
                        <div class="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-sm">
                            Browser</div>
                        <div class="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-sm">
                            Mobile App</div>
                    </div>

                    <!-- Middle: Nitro -->
                    <div
                        class="relative w-full max-w-lg p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
                        <div
                            class="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-emerald-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            Nitro Server Engine
                        </div>

                        <div class="grid grid-cols-3 gap-4 mt-4">
                            <div class="col-span-3 p-3 rounded bg-slate-800/50 border border-slate-700/50 text-center">
                                <div class="text-xs text-slate-500 mb-1">Universal Router</div>
                                <div class="text-emerald-400 font-mono text-sm">/api/*</div>
                            </div>
                            <div
                                class="p-2 rounded bg-slate-800/30 border border-slate-700/30 text-center text-xs text-slate-400">
                                HMR
                            </div>
                            <div
                                class="p-2 rounded bg-slate-800/30 border border-slate-700/30 text-center text-xs text-slate-400">
                                Storage
                            </div>
                            <div
                                class="p-2 rounded bg-slate-800/30 border border-slate-700/30 text-center text-xs text-slate-400">
                                Assets
                            </div>
                        </div>
                    </div>

                    <!-- Bottom: Deploy Targets -->
                    <div class="flex flex-wrap justify-center gap-3">
                        <span
                            class="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-500">Node.js</span>
                        <span
                            class="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-500">Vercel</span>
                        <span
                            class="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-500">Netlify</span>
                        <span
                            class="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-500">Cloudflare
                            Workers</span>
                        <span
                            class="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-500">Docker</span>
                    </div>
                </div>
            </AppWindow>
        </TutorialSection>

        <!-- 2. Create API -->
        <TutorialSection id="create-api" title="建立 API" icon="heroicons:plus-circle" separator>
            <p>
                在 <code class="text-emerald-400">server/api/</code> 目錄下的檔案會自動映射為 API 端點。
                使用 <code class="text-white">defineEventHandler</code> 來定義處理邏輯。
            </p>

            <div class="grid md:grid-cols-2 gap-6">
                <AppWindow title="File Structure" type="code" class="h-full">
                    <div class="p-2">
                        <AppFileTree :files="[
                            {
                                name: 'server/',
                                icon: 'heroicons:folder-open',
                                color: 'slate',
                                children: [
                                    {
                                        name: 'api/',
                                        icon: 'heroicons:folder-open',
                                        color: 'emerald',
                                        children: [
                                            { name: 'hello.ts', icon: 'logos:typescript-icon', badge: { text: '-> /api/hello', color: 'slate' } },
                                            {
                                                name: 'users/',
                                                icon: 'heroicons:folder',
                                                color: 'slate',
                                                children: [
                                                    { name: '[id].ts', icon: 'logos:typescript-icon', badge: { text: '-> /api/users/:id', color: 'slate' } }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]" />
                    </div>
                </AppWindow>

                <div class="space-y-2">
                    <div class="flex items-center justify-between px-2">
                        <span class="text-xs font-bold text-emerald-500 uppercase">server/api/hello.ts</span>
                    </div>
                    <AppCodeBlock code="export default defineEventHandler((event) => {
  return {
    message: 'Hello Nitro!',
    timestamp: new Date()
  }
})" lang="ts" />
                </div>
            </div>

            <!-- Live Playground -->
            <div class="mt-8 pt-8 border-t border-slate-800/50">
                <div class="flex items-center gap-2 mb-4">
                    <Icon name="heroicons:rocket-launch" class="w-5 h-5 text-amber-400" />
                    <h3 class="font-bold text-white">API 實驗室</h3>
                </div>
                <p class="text-sm text-slate-400 mb-6">
                    我們已經在後端建立了一個 <code class="text-emerald-400">/api/demo</code> 端點。
                    試著發送 GET 或 POST 請求，觀察伺服器的回應。
                </p>
                <ApiPlayground />
            </div>
        </TutorialSection>

        <!-- 3. Utilities -->
        <TutorialSection id="utilities" title="請求處理工具" icon="heroicons:wrench-screwdriver" separator>
            <p>
                Nuxt (透過 H3) 提供了一系列工具函式來處理請求內容。
                這些函式可以直接從 <code class="text-emerald-400">h3</code> 自動引入。
            </p>

            <div class="grid sm:grid-cols-2 gap-4">
                <!-- readBody -->
                <div
                    class="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all">
                    <div class="flex items-center gap-2 mb-2">
                        <code
                            class="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">readBody(event)</code>
                        <span class="text-xs text-slate-500 ml-auto">POST/PUT</span>
                    </div>
                    <p class="text-sm text-slate-400">
                        讀取請求主體 (JSON)。
                    </p>
                </div>

                <!-- getQuery -->
                <div
                    class="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all">
                    <div class="flex items-center gap-2 mb-2">
                        <code
                            class="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">getQuery(event)</code>
                        <span class="text-xs text-slate-500 ml-auto">GET</span>
                    </div>
                    <p class="text-sm text-slate-400">
                        讀取 URL 查詢參數 (e.g., ?page=1)。
                    </p>
                </div>

                <!-- getRouterParam -->
                <div
                    class="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all">
                    <div class="flex items-center gap-2 mb-2">
                        <code
                            class="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">getRouterParam(event, 'id')</code>
                        <span class="text-xs text-slate-500 ml-auto">Dynamic</span>
                    </div>
                    <p class="text-sm text-slate-400">
                        讀取動態路由參數 (e.g., /users/123)。
                    </p>
                </div>

                <!-- setCookie -->
                <div
                    class="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all">
                    <div class="flex items-center gap-2 mb-2">
                        <code
                            class="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">setCookie(event, name, val)</code>
                        <span class="text-xs text-slate-500 ml-auto">Cookie</span>
                    </div>
                    <p class="text-sm text-slate-400">
                        設定 HTTP Cookie。
                    </p>
                </div>
            </div>

            <div class="mt-6">
                <AppCodeBlock code="export default defineEventHandler(async (event) => {
  // 1. 讀取 Body
  const body = await readBody(event)
  
  // 2. 讀取 Query
  const { type } = getQuery(event)
  
  // 3. 處理邏輯...
  
  return { success: true }
})" lang="ts" filename="server/api/submit.post.ts" />
            </div>
        </TutorialSection>

        <!-- 4. Type Safety -->
        <TutorialSection id="type-safety" title="型別安全" icon="heroicons:shield-check">
            <p>
                這是 Nuxt 最強大的功能之一。當你在 Vue 頁面中使用 <code class="text-emerald-400">useFetch</code> 呼叫內部 API 時，
                Nuxt 會自動推斷回傳值的型別，無需手動定義介面。
            </p>

            <div class="relative group">
                <div
                    class="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-sky-500/20 rounded-xl blur opacity-50 group-hover:opacity-100 transition-opacity">
                </div>
                <div class="relative p-6 rounded-xl bg-slate-900 border border-slate-800">
                    <div class="flex flex-col md:flex-row gap-8">
                        <!-- Server Code -->
                        <div class="flex-1">
                            <div class="text-xs font-bold text-slate-500 mb-2 uppercase">Server</div>
                            <AppCodeBlock code="// server/api/user.ts
export default defineEventHandler(() => {
  return { 
    name: 'Zayn', 
    role: 'admin' 
  }
})" lang="ts" />
                        </div>

                        <!-- Arrow -->
                        <div class="hidden md:flex items-center justify-center">
                            <Icon name="heroicons:arrow-right" class="w-6 h-6 text-slate-600" />
                        </div>

                        <!-- Client Code -->
                        <div class="flex-1">
                            <div class="text-xs font-bold text-slate-500 mb-2 uppercase">Client</div>
                            <AppCodeBlock code="// app.vue
const { data } = await useFetch('/api/user')

// TypeScript 自動知道 data.value 是:
// { name: string; role: string; }
console.log(data.value?.name)" lang="ts" />
                        </div>
                    </div>
                </div>
            </div>
        </TutorialSection>

    </TutorialPage>
</template>
