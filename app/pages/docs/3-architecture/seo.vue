<script setup lang="ts">
    definePageMeta({
        layout: 'docs',
        toc: [
            { id: 'use-seo-meta', label: '基礎: useSeoMeta' },
            { id: 'og-explained', label: 'Open Graph (OG) 詳解' },
            { id: 'dynamic-seo', label: '動態 SEO' },
            { id: 'advanced-head', label: '進階: useHead' }
        ]
    })

    useHead({
        title: 'SEO 設定 (Meta Tags)',
        meta: [
            { name: 'description', content: '掌握 Nuxt 4 的 SEO 工具：useSeoMeta 與 useHead。輕鬆設定 Open Graph、Twitter Cards 與動態 Meta 標籤。' }
        ]
    })
</script>

<template>
    <TutorialPage title="SEO 設定"
        description="Nuxt 天生對 SEO 友善。透過 SSR，搜尋引擎可以完美讀取你的內容。而 useSeoMeta 則讓管理 Meta Tags 變得前所未有的簡單。"
        :badges="[{ label: 'Core', color: 'primary' }, { label: 'Marketing', color: 'neutral' }]">

        <!-- 1. useSeoMeta -->
        <TutorialSection id="use-seo-meta" title="基礎: useSeoMeta" icon="heroicons:magnifying-glass" separator>
            <p class="mb-6">
                這是 Nuxt 推薦的設定方式。它提供了<strong>型別安全 (Type-safe)</strong> 的介面，讓你不需要記憶繁瑣的 HTML meta 標籤名稱。
                Nuxt 會自動將這些 JavaScript 物件轉換為標準的 HTML <code
                    class="bg-slate-800 px-1 py-0.5 rounded text-slate-300">&lt;meta&gt;</code> 標籤。
            </p>

            <AppCodeBlock code="<script setup>
useSeoMeta({
  title: '我的 Nuxt 應用',
  ogTitle: '我的 Nuxt 應用 - 社群版標題',
  description: '這是一個超級棒的網站，快來看看！',
  ogDescription: '這是一個超級棒的網站，快來看看！',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>" lang="vue" filename="app.vue" />

            <div class="mt-8 p-1 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-slate-800 to-slate-900">
                <div class="rounded-xl bg-slate-950/80 backdrop-blur p-6 sm:p-8">
                    <div class="flex items-center gap-2 mb-6 text-emerald-400">
                        <Icon name="heroicons:sparkles" class="w-5 h-5" />
                        <span class="font-bold text-sm tracking-wider uppercase">Interactive Playground</span>
                    </div>
                    <SeoPreview />
                    <p class="mt-4 text-center text-slate-500 text-sm">
                        👆 試著修改左側內容，觀察右側 Open Graph 預覽卡的變化
                    </p>
                </div>
            </div>
        </TutorialSection>

        <!-- 2. OG Explained -->
        <TutorialSection id="og-explained" title="Open Graph (OG) 詳解" icon="heroicons:share" separator>
            <p class="mb-6">
                <strong>Open Graph (OG)</strong> 是一種網路協定，決定了當你的網頁被分享到 Facebook、LINE、Discord 或 Slack 時，會顯示什麼樣的「卡片」。
                <span class="text-emerald-400">如果沒有設定 OG，你的連結在社群軟體中可能只會顯示一串冷冰冰的網址。</span>
            </p>

            <div class="grid md:grid-cols-3 gap-6">
                <div class="md:col-span-2 space-y-4">
                    <div
                        class="flex gap-4 items-start p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-indigo-500/50 transition-colors group">
                        <div
                            class="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                            <Icon name="heroicons:photo" class="w-6 h-6" />
                        </div>
                        <div>
                            <h4 class="font-bold text-slate-200 mb-1">og:image (關鍵!)</h4>
                            <p class="text-sm text-slate-400">這是卡片的靈魂。建議尺寸 <strong>1200x630 px</strong>。一張好的圖片能顯著提升點擊率
                                (CTR)。</p>
                        </div>
                    </div>

                    <div
                        class="flex gap-4 items-start p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-sky-500/50 transition-colors group">
                        <div
                            class="p-2 rounded-lg bg-sky-500/20 text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                            <Icon name="heroicons:home-modern" class="w-6 h-6" />
                        </div>
                        <div>
                            <h4 class="font-bold text-slate-200 mb-1">og:title</h4>
                            <p class="text-sm text-slate-400">通常與網頁 Title 相同，但可以更具吸引力 (Clickbait)。這是使用者第一眼看到的文字。</p>
                        </div>
                    </div>

                    <div
                        class="flex gap-4 items-start p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-emerald-500/50 transition-colors group">
                        <div
                            class="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                            <Icon name="heroicons:bars-3-bottom-left" class="w-6 h-6" />
                        </div>
                        <div>
                            <h4 class="font-bold text-slate-200 mb-1">og:description</h4>
                            <p class="text-sm text-slate-400">1-2 句話的簡短摘要。補充標題沒說完的故事。</p>
                        </div>
                    </div>
                </div>

                <!-- Visual Representation -->
                <div class="relative group">
                    <div
                        class="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all">
                    </div>
                    <div
                        class="relative h-full rounded-xl bg-slate-900 border border-slate-700 overflow-hidden flex flex-col shadow-2xl">
                        <!-- Simulated OG Card -->
                        <div
                            class="h-32 bg-slate-800 flex items-center justify-center border-b border-slate-700 relative overflow-hidden">
                            <div class="absolute inset-0 bg-grid-white/[0.05]"></div>
                            <span class="text-slate-500 font-mono text-xs z-10">og:image (1200x630)</span>
                            <div
                                class="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/50 text-[10px] text-white backdrop-blur">
                                1.91:1
                            </div>
                        </div>
                        <div class="p-4 flex-1 bg-slate-900">
                            <div class="h-2 w-20 bg-slate-700 rounded mb-2"></div> <!-- Site name -->
                            <div class="h-4 w-3/4 bg-slate-200 rounded mb-2 font-bold opacity-80"></div>
                            <!-- og:title -->
                            <div class="space-y-1.5 opacity-40">
                                <div class="h-2 w-full bg-slate-400 rounded"></div> <!-- og:desc -->
                                <div class="h-2 w-5/6 bg-slate-400 rounded"></div>
                            </div>
                        </div>
                        <div
                            class="bg-indigo-500/10 p-2 text-center text-xs text-indigo-300 font-medium border-t border-indigo-500/20">
                            社群分享預覽卡片
                        </div>
                    </div>
                </div>
            </div>
        </TutorialSection>

        <!-- 3. Dynamic SEO -->
        <TutorialSection id="dynamic-seo" title="動態 SEO" icon="heroicons:variable" separator>
            <p class="mb-6">
                在實際專案中，SEO 資訊通常來自 API (例如文章標題、產品名稱)。
                不管是 <code class="text-emerald-400">useSeoMeta</code> 還是 <code class="text-emerald-400">useHead</code>
                都支援響應式資料。
            </p>

            <div class="grid lg:grid-cols-2 gap-8">
                <AppCodeBlock code="<script setup>
// 1. 從 API 取得資料
const { data: article } = await useFetch('/api/article/1')

// 2. 傳入 Getter Function (推薦)
useSeoMeta({
  title: () => article.value?.title,
  description: () => article.value?.summary,
  ogImage: () => article.value?.coverImage
})
</script>" lang="vue" filename="pages/articles/[id].vue" />

                <div class="space-y-4">
                    <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
                        <Icon name="heroicons:light-bulb" class="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <div class="text-sm text-amber-200/80">
                            <strong class="block mb-1 text-amber-400">為什麼要用箭頭函式 (Arrow Function)？</strong>
                            <p class="mb-2">
                                <code class="font-mono text-amber-300">() => value</code>
                            </p>
                            <p>
                                因為 <code class="font-mono">useFetch</code> 是非同步的。當頁面剛建立時，<code
                                    class="font-mono">article.value</code> 可能是 <code class="font-mono">null</code>。
                                透過函式傳遞，Nuxt 可以在資料載入完成後，<strong>自動重新計算 (Re-evaluate)</strong> 並更新 Meta Tags。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </TutorialSection>

        <!-- 4. Advanced Head (Restructured) -->
        <TutorialSection id="advanced-head" title="進階: useHead" icon="heroicons:code-bracket-square">
            <AppWindow title="useSeoMeta vs useHead" class="mb-8">
                <ul class="divide-y divide-slate-800 text-sm">
                    <li class="p-4 flex gap-4 hover:bg-slate-800/50 transition-colors">
                        <div class="w-32 shrink-0 font-bold text-emerald-400">useSeoMeta</div>
                        <div class="text-slate-400">
                            專注於 <strong class="text-slate-200">內容 (Content)</strong>。包含 Title, Description, Open Graph,
                            Twitter Cards。
                            <span class="block mt-1 text-xs text-slate-500">✅ 90% 的情況下你只需要這個。</span>
                        </div>
                    </li>
                    <li class="p-4 flex gap-4 hover:bg-slate-800/50 transition-colors">
                        <div class="w-32 shrink-0 font-bold text-blue-400">useHead</div>
                        <div class="text-slate-400">
                            專注於 <strong class="text-slate-200">結構與資源 (Structure & Assets)</strong>。
                            包含載入外部 Script (GA, GTM)、CSS 樣式、JSON-LD 結構化資料、Body 屬性 (class, attrs)。
                        </div>
                    </li>
                </ul>
            </AppWindow>

            <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Icon name="heroicons:beaker" class="w-5 h-5 text-blue-400" />
                常見應用情境
            </h3>

            <!-- Use Case 1: Scripts -->
            <div class="space-y-6">
                <div>
                    <h4 class="text-sm font-bold text-slate-300 mb-2">1. 載入外部腳本 (Script) 與樣式 (Link)</h4>
                    <p class="text-sm text-slate-400 mb-3">例如：載入 Google Analytics、字型檔、或 Canonical URL。</p>
                    <AppCodeBlock code="useHead({
  // 設定 HTML 屬性 (如語言)
  htmlAttrs: { lang: 'zh-TW' },
  // 載入外部 Script
  script: [
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXX',
      async: true, // 非同步載入，不阻塞渲染
      tagPosition: 'bodyClose' // 控制標籤位置 (head | bodyOpen | bodyClose)
    }
  ],
  // 載入 CSS 或設定 Canonical
  link: [
    { rel: 'canonical', href: 'https://example.com/current-page' },
    { rel: 'icon', type: 'image/png', href: '/favicon.png' }
  ]
})" lang="ts" />
                </div>

                <!-- Use Case 2: JSON-LD -->
                <div>
                    <h4 class="text-sm font-bold text-slate-300 mb-2">2. 結構化資料 (JSON-LD)</h4>
                    <p class="text-sm text-slate-400 mb-3">這對 Google 搜尋結果的 Rich Snippets 非常重要。</p>
                    <AppCodeBlock code="useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.value?.title,
        datePublished: article.value?.publishedAt,
        author: [{ '@type': 'Person', name: 'Nuxt Expert' }]
      })
    }
  ]
})" lang="ts" />
                </div>
            </div>
        </TutorialSection>

    </TutorialPage>
</template>
