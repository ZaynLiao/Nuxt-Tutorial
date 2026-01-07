<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'concept', label: '核心概念' },
            { id: 'problem', label: 'Hydration Mismatch' },
            { id: 'solution', label: '使用 ClientOnly' },
            { id: 'fallback', label: 'Fallback 內容' }
        ]
    })

    useHead({
        title: 'ClientOnly 元件',
        meta: [
            { name: 'description', content: 'ClientOnly 元件教學：解決 Hydration Mismatch，隔離瀏覽器端專屬邏輯 (window/localStorage)，並提供優雅的 Fallback 體驗。' }
        ]
    })
</script>

<template>
    <DocsPage title="ClientOnly 元件"
        description="在 SSR 應用中，某些內容只能在瀏覽器端渲染（例如存取 localStorage、window 物件）。ClientOnly 幫助你隔離這些邏輯，避免水合錯誤 (Hydration Mismatch)。"
        :badges="[{ label: 'SSR Safety', color: 'primary' }, { label: 'Hydration', color: 'neutral' }]">

        <!-- 1. Concept: Hydration -->
        <DocsSection id="concept" title="核心概念" icon="heroicons:arrow-path" separator>
            <p>
                <strong>Hydration (水合)</strong> 是指 Vue 在瀏覽器端接管由伺服器渲染的靜態 HTML，並使其變為可互動的過程。
                如果伺服器給的 HTML 與瀏覽器第一次渲染的結果不同，就會發生衝突。
            </p>

            <UiWindow title="Hydration Process" icon="heroicons:clock" class="w-full">
                <div class="p-8 bg-slate-950 flex flex-col md:flex-row items-center justify-between gap-4">
                    <!-- Server -->
                    <div class="flex flex-col items-center gap-2">
                        <div
                            class="w-24 h-32 bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs font-mono text-slate-500 overflow-hidden">
                            &lt;div&gt;Hello&lt;/div&gt;
                        </div>
                        <div class="text-xs font-bold text-slate-500 uppercase">Server HTML</div>
                    </div>

                    <!-- Arrow -->
                    <div class="flex-1 flex items-center justify-center relative">
                        <div class="h-0.5 w-full bg-slate-800 absolute"></div>
                        <div
                            class="w-8 h-8 bg-emerald-900 rounded-full border border-emerald-500 flex items-center justify-center z-10 animate-pulse">
                            <Icon name="heroicons:arrow-path" class="w-4 h-4 text-emerald-400" />
                        </div>
                    </div>

                    <!-- Client -->
                    <div class="flex flex-col items-center gap-2">
                        <div
                            class="w-24 h-32 bg-slate-800 border border-emerald-500/50 rounded-lg p-2 text-xs font-mono text-emerald-400 overflow-hidden shadow-lg shadow-emerald-500/10">
                            vnode('div', 'Hello')
                        </div>
                        <div class="text-xs font-bold text-emerald-500 uppercase">Client DOM</div>
                    </div>
                </div>
            </UiWindow>
        </DocsSection>

        <!-- 2. The Problem -->
        <DocsSection id="problem" title="Hydration Mismatch" icon="heroicons:exclamation-triangle" separator>
            <p>
                當你在 template 中直接使用 <code class="text-red-400">window</code> 或 <code
                    class="text-red-400">localStorage</code> 時，
                伺服器端會因為找不到這些物件而報錯，或者渲染出與客戶端不同的內容。
            </p>

            <div class="grid md:grid-cols-2 gap-6">
                <div class="p-6 rounded-2xl bg-red-950/10 border border-red-500/20">
                    <h4 class="font-bold text-red-400 mb-4 flex items-center gap-2">
                        <Icon name="heroicons:x-circle" />
                        Bad Code
                    </h4>
                    <UiCodeBlock code="<template>
  <!-- Server: Crash (window is undefined) -->
  <!-- Client: 1920 -->
  <div>Width: {{ window.innerWidth }}</div>
</template>" lang="vue" />
                </div>

                <div class="p-6 rounded-2xl bg-red-950/10 border border-red-500/20">
                    <h4 class="font-bold text-red-400 mb-4 flex items-center gap-2">
                        <Icon name="heroicons:x-circle" />
                        Bad Code
                    </h4>
                    <UiCodeBlock code="<template>
  <!-- Server: Generate UUID A -->
  <!-- Client: Generate UUID B -->
  <!-- Result: Hydration Mismatch Error -->
  <div>ID: {{ Math.random() }}</div>
</template>" lang="vue" />
                </div>
            </div>
        </DocsSection>

        <!-- 3. The Solution -->
        <DocsSection id="solution" title="使用 ClientOnly" icon="heroicons:shield-check" separator>
            <p>
                <code class="text-emerald-400">&lt;ClientOnly&gt;</code> 告訴 Nuxt：「這段內容不要在伺服器端渲染，等到了瀏覽器再處理。」
            </p>

            <UiCodeBlock code="<template>
  <ClientOnly>
    <!-- 安全：只在瀏覽器執行 -->
    <div>Width: {{ window.innerWidth }}</div>
    <Comments />
  </ClientOnly>
</template>" lang="vue" />
        </DocsSection>

        <!-- 4. Fallback -->
        <DocsSection id="fallback" title="Fallback 內容" icon="heroicons:arrow-path-rounded-square">
            <p>
                為了避免內容突然跳出來 (Layout Shift)，你可以使用 <code class="text-emerald-400">#fallback</code> slot
                來指定在客戶端載入完成前要顯示的佔位內容（例如 Skeleton Loading）。
            </p>

            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                    <div class="text-xs font-bold text-slate-500 uppercase">Server Rendered (Initial)</div>
                    <div
                        class="h-32 bg-slate-900 rounded-xl border border-slate-800 p-4 flex items-center justify-center">
                        <div class="animate-pulse flex space-x-4 w-full">
                            <div class="rounded-full bg-slate-700 h-10 w-10"></div>
                            <div class="flex-1 space-y-3 py-1">
                                <div class="h-2 bg-slate-700 rounded"></div>
                                <div class="space-y-2">
                                    <div class="grid grid-cols-3 gap-4">
                                        <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                                        <div class="h-2 bg-slate-700 rounded col-span-1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="space-y-2">
                    <div class="text-xs font-bold text-emerald-500 uppercase">Client Rendered (Final)</div>
                    <div class="h-32 bg-slate-900 rounded-xl border border-emerald-500/30 p-4 flex items-center gap-4">
                        <div
                            class="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-emerald-950 font-bold">
                            Z</div>
                        <div>
                            <div class="text-white font-bold">Zayn</div>
                            <div class="text-xs text-slate-400">Full Stack Developer</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-6">
                <UiCodeBlock code="<template>
  <ClientOnly>
    <UserProfile />
    
    <template #fallback>
      <!-- 伺服器端渲染這個 Skeleton -->
      <div class=&quot;animate-pulse ...&quot;>Loading...</div>
    </template>
  </ClientOnly>
</template>" lang="vue" />
            </div>
        </DocsSection>

    </DocsPage>
</template>
