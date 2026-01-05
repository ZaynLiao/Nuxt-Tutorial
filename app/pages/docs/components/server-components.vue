<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'concept', label: '核心概念' },
            { id: 'usage', label: '基本用法' },
            { id: 'benefits', label: '優勢與限制' }
        ]
    })

    useHead({
        title: '伺服器元件 (Server Components)',
        meta: [
            { name: 'description', content: 'Nuxt Server Components (Islands) 教學：如何建立 .server.vue 元件，在伺服器端渲染 HTML 並移除客戶端 JavaScript，大幅減少 Bundle Size。' }
        ]
    })
</script>

<template>
    <TutorialPage title="伺服器元件 (Server Components)"
        description="這是一個進階功能 (又稱為 Nuxt Islands)。它允許你在伺服器端渲染元件並將其 HTML 發送給客戶端，而不需要傳送對應的 JavaScript 程式碼。"
        :badges="[{ label: 'Zero JS', color: 'primary' }, { label: 'Performance', color: 'neutral' }]">

        <!-- 1. Concept -->
        <TutorialSection id="concept" title="核心概念" icon="heroicons:server-stack" separator>
            <p>
                傳統 SSR 會在客戶端進行 Hydration（注入 JS 事件）。
                Server Components 則是純靜態的 HTML 片段。
                這對於 Markdown 渲染、語法高亮等「不需要互動」但「邏輯複雜」的元件非常有用。
            </p>

            <div class="grid md:grid-cols-2 gap-6">
                <!-- Standard Component -->
                <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                    <div class="text-xs font-bold text-slate-500 uppercase mb-4">Standard Component</div>
                    <div class="space-y-4">
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-400">
                                <Icon name="heroicons:code-bracket" />
                            </div>
                            <div class="text-sm text-slate-300">HTML Structure</div>
                        </div>
                        <div class="flex items-center gap-2">
                            <div
                                class="w-8 h-8 rounded bg-yellow-500/20 flex items-center justify-center text-yellow-400">
                                <Icon name="logos:javascript" class="w-4 h-4" />
                            </div>
                            <div class="text-sm text-slate-300">JavaScript Logic (Hydration)</div>
                        </div>
                        <div class="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-500">
                            Bundle Size: <span class="text-red-400">Large (Lib + Logic)</span>
                        </div>
                    </div>
                </div>

                <!-- Server Component -->
                <div class="p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/20">
                    <div class="text-xs font-bold text-emerald-500 uppercase mb-4">Server Component</div>
                    <div class="space-y-4">
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-400">
                                <Icon name="heroicons:code-bracket" />
                            </div>
                            <div class="text-sm text-slate-300">HTML Structure</div>
                        </div>
                        <div class="flex items-center gap-2 opacity-25">
                            <div class="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-slate-600">
                                <Icon name="heroicons:x-mark" />
                            </div>
                            <div class="text-sm text-slate-500 line-through">JavaScript Logic</div>
                        </div>
                        <div class="mt-4 pt-4 border-t border-emerald-500/30 text-xs text-emerald-400">
                            Bundle Size: <span class="font-bold">Zero KB</span>
                        </div>
                    </div>
                </div>
            </div>
        </TutorialSection>

        <!-- 2. Usage -->
        <TutorialSection id="usage" title="基本用法" icon="heroicons:code-bracket" separator>
            <p>
                首先需要在 <code class="text-emerald-400">nuxt.config.ts</code> 啟用實驗性功能。
                接著建立 <code class="text-emerald-400">.server.vue</code> 結尾的元件。
            </p>

            <AppCodeBlock filename="nuxt.config.ts" icon="heroicons:cog-6-tooth" code="export default defineNuxtConfig({
  experimental: {
    componentIslands: true // 啟用 Islands 架構
  }
})" lang="typescript" />

            <div class="mt-6">
                <p class="mb-4 text-slate-400">
                    然後在 template 中使用 <code class="text-emerald-400">&lt;NuxtIsland&gt;</code> 或直接使用元件名稱（Nuxt 會自動偵測）。
                </p>
                <AppCodeBlock code="<template>
  <!-- 這裡會渲染 components/HeavyChart.server.vue -->
  <!-- 並且不會下載任何 Chart.js 的程式碼到瀏覽器！ -->
  <NuxtIsland name=&quot;HeavyChart&quot; :props=&quot;{ data: chartData }&quot; />
  
  <!-- 或者直接使用 (Nuxt 3.9+) -->
  <HeavyChart :data=&quot;chartData&quot; />
</template>" lang="vue" />
            </div>
        </TutorialSection>

        <!-- 3. Benefits & Limitations -->
        <TutorialSection id="benefits" title="優勢與限制" icon="heroicons:scale">
            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-4">
                    <h3 class="text-lg font-bold text-emerald-400 flex items-center gap-2">
                        <Icon name="heroicons:check-circle" />
                        優勢 (Pros)
                    </h3>
                    <ul class="space-y-2 text-slate-400 text-sm list-disc list-inside">
                        <li>顯著減少 JavaScript Bundle Size。</li>
                        <li>適合渲染靜態內容 (Markdown, Syntax Highlighting)。</li>
                        <li>後端邏輯不會洩漏給前端 (Security)。</li>
                    </ul>
                </div>

                <div class="space-y-4">
                    <h3 class="text-lg font-bold text-red-400 flex items-center gap-2">
                        <Icon name="heroicons:x-circle" />
                        限制 (Cons)
                    </h3>
                    <ul class="space-y-2 text-slate-400 text-sm list-disc list-inside">
                        <li>元件內部<strong>無法</strong>使用互動功能 (onClick, onMounted)。</li>
                        <li>無法存取瀏覽器 API (window, localStorage)。</li>
                        <li>Slot 支援有限制 (只能傳遞靜態內容)。</li>
                    </ul>
                </div>
            </div>
        </TutorialSection>

    </TutorialPage>
</template>
