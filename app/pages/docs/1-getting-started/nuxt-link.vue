<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'concept', label: '核心概念' },
            { id: 'internal', label: '內部導航' },
            { id: 'external', label: '外部連結' },
            { id: 'styling', label: '樣式與狀態' },
            { id: 'prefetching', label: '預取機制' }
        ]
    })

    useHead({
        title: 'NuxtLink 導航',
        meta: [
            { name: 'description', content: 'NuxtLink 元件教學：智慧型導航、預取機制 (Prefetching)、外部連結處理與 Active 狀態樣式設定。' }
        ]
    })
</script>

<template>
    <DocsPage title="NuxtLink 導航"
        description="NuxtLink 是 Nuxt 中用於頁面導航的核心元件，它取代了標準的 <a> 標籤，提供了 SPA 般的無刷新切換體驗與智慧型預取 (Prefetching) 功能。"
        :badges="[{ label: 'Routing', color: 'primary' }, { label: 'Performance', color: 'neutral' }]">

        <!-- 1. Concept: Smart Link -->
        <DocsSection id="concept" title="核心概念" icon="heroicons:link" separator>
            <p>
                <code class="text-emerald-400">&lt;NuxtLink&gt;</code> 是一個智慧型元件。它會根據 <code class="text-white">to</code>
                屬性的內容，自動決定最佳的渲染方式。
            </p>

            <UiWindow title="Smart Decision Logic" icon="heroicons:cpu-chip" class="w-full">
                <div class="p-8 bg-slate-950 flex flex-col items-center gap-6">
                    <div
                        class="px-6 py-3 rounded-full bg-slate-800 border border-slate-700 text-white font-bold font-mono">
                        &lt;NuxtLink to="..."&gt;
                    </div>
                    <Icon name="heroicons:arrow-down" class="text-slate-600" />

                    <div class="grid grid-cols-2 gap-16 w-full max-w-2xl">
                        <!-- Internal -->
                        <div class="flex flex-col items-center gap-4">
                            <div class="text-xs text-slate-500">Starts with /</div>
                            <Icon name="heroicons:arrow-down" class="text-emerald-500/50" />
                            <div
                                class="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 w-full text-center">
                                <div class="font-bold text-emerald-400 mb-1">Vue Router</div>
                                <div class="text-xs text-emerald-200/70">SPA Navigation (No Refresh)</div>
                            </div>
                        </div>

                        <!-- External -->
                        <div class="flex flex-col items-center gap-4">
                            <div class="text-xs text-slate-500">Starts with http</div>
                            <Icon name="heroicons:arrow-down" class="text-sky-500/50" />
                            <div class="p-4 rounded-xl bg-sky-950/20 border border-sky-500/30 w-full text-center">
                                <div class="font-bold text-sky-400 mb-1">&lt;a href&gt;</div>
                                <div class="text-xs text-sky-200/70">Standard Navigation</div>
                            </div>
                        </div>
                    </div>
                </div>
            </UiWindow>
        </DocsSection>

        <!-- 2. Internal Navigation -->
        <DocsSection id="internal" title="內部導航" icon="heroicons:arrow-right-circle" separator>
            <p>
                對於內部連結，Nuxt 會攔截點擊事件，透過 JavaScript 更新 URL 並渲染新頁面，而不會重新載入整頁。
                這提供了如原生 App 般的流暢體驗。
            </p>

            <UiCodeBlock code="<template>
  <nav>
    <!-- 字串語法 -->
    <NuxtLink to=&quot;/&quot;>首頁</NuxtLink>
    
    <!-- 物件語法 (推薦) -->
    <NuxtLink :to=&quot;{ name: 'users-id', params: { id: 123 } }&quot;>
      使用者 123
    </NuxtLink>
    
    <!-- 帶查詢參數 -->
    <NuxtLink :to=&quot;{ path: '/search', query: { q: 'nuxt' } }&quot;>
      搜尋 Nuxt
    </NuxtLink>
  </nav>
</template>" lang="vue" />
        </DocsSection>

        <!-- 3. External Navigation -->
        <DocsSection id="external" title="外部連結" icon="heroicons:globe-alt" separator>
            <p>
                當偵測到外部連結時，它會自動退化為標準的 <code class="text-white">&lt;a&gt;</code> 標籤，
                並自動加上 <code class="text-emerald-400">rel="noopener noreferrer"</code> 以確保安全性（當使用 <code
                    class="text-white">target="_blank"</code> 時）。
            </p>

            <UiCodeBlock code="<template>
  <!-- 自動處理為 <a href=... target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;> -->
  <NuxtLink to=&quot;https://nuxt.com&quot; target=&quot;_blank&quot;>
    Nuxt 官網
  </NuxtLink>
</template>" lang="vue" />
        </DocsSection>

        <!-- 4. Styling -->
        <DocsSection id="styling" title="樣式與狀態" icon="heroicons:paint-brush" separator>
            <p>
                NuxtLink 會自動為當前活躍的連結加上 CSS class。
            </p>

            <div class="grid md:grid-cols-2 gap-6">
                <div class="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                    <div class="flex items-center gap-2 mb-2">
                        <code
                            class="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">router-link-active</code>
                    </div>
                    <p class="text-sm text-slate-400 mb-4">
                        當路由<strong>包含</strong>連結路徑時觸發 (模糊比對)。
                        <br><span class="text-xs opacity-50">例如：在 /docs/intro 時，/docs 也會亮起。</span>
                    </p>
                </div>

                <div class="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                    <div class="flex items-center gap-2 mb-2">
                        <code
                            class="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">router-link-exact-active</code>
                    </div>
                    <p class="text-sm text-slate-400 mb-4">
                        當路由<strong>完全等於</strong>連結路徑時觸發 (精確比對)。
                    </p>
                </div>
            </div>

            <div class="mt-4">
                <UiCodeBlock code="<style scoped>
.router-link-active {
  color: #10b981; /* emerald-500 */
  font-weight: bold;
}
</style>" lang="css" />
            </div>
        </DocsSection>

        <!-- 5. Prefetching -->
        <DocsSection id="prefetching" title="預取機制" icon="heroicons:bolt">
            <p>
                為了極致的效能，NuxtLink 預設會在連結<strong>進入視口 (Viewport)</strong> 時，
                自動在背景預先下載目標頁面的 JavaScript 程式碼 (Payload)。
                這使得點擊後的頁面切換幾乎是瞬間完成的。
            </p>

            <div class="p-4 rounded-xl bg-amber-950/10 border border-amber-500/20 flex items-start gap-3">
                <Icon name="heroicons:light-bulb" class="w-6 h-6 text-amber-400 shrink-0" />
                <div>
                    <strong class="text-amber-400 block mb-1">如何關閉？</strong>
                    <p class="text-sm text-amber-200/70">
                        如果你有大量的連結（例如列表頁），可能會產生過多的請求。
                        你可以設定 <code class="text-xs bg-amber-900/50 px-1 rounded">prefetch="false"</code> 來關閉此功能。
                    </p>
                </div>
            </div>

            <UiCodeBlock code="<template>
  <NuxtLink to=&quot;/heavy-page&quot; :prefetch=&quot;false&quot;>
    不預取的連結
  </NuxtLink>
</template>" lang="vue" class="mt-4" />
        </DocsSection>

    </DocsPage>
</template>
